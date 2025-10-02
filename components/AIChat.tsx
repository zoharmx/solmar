import React, { useState, useEffect, useRef } from 'react';
// FIX: The `GoogleGenerativeAI` import is deprecated. Use `GoogleGenAI` from `@google/genai` instead.
import { GoogleGenAI } from '@google/genai';

// NOTE: In a real application, this should be handled securely on a backend.
// FIX: The API key should be sourced exclusively from `process.env.API_KEY` as per guidelines.

// Mock data
const aiKnowledgeContext = `Mariscos Sol Mar es un restaurante de mariscos especializado en cocina del Pacífico Mexicano, ubicado en California. Ofrecemos una amplia variedad de platillos frescos incluyendo aguachiles, ceviches, camarones al mojo de ajo, pulpo, molcajetes de mariscos, tacos de pescado estilo Baja, y mucho más. Nuestro restaurante está conocido por su ambiente familiar y sus sabores auténticos del mar. Contamos con desayunos, mariscos frescos, carnes, y opciones para eventos especiales.`;
const menuData = { "Desayunos": [{ id: "1", name: "Chilaquiles de Birria", desc: "Deliciosos chilaquiles bañados en salsa roja o verde, acompañados de birria", price: 12 }], "Mariscos": [{ id: "3", name: "Aguachile Verde", desc: "Camarones frescos marinados en limón con chile serrano y pepino", price: 15 }] };
const translations = { es: { 'ai-welcome': 'Bienvenido a Mariscos Sol Mar. Soy tu Chef Assistant para recomendaciones de platillos y precios. Para pedidos usa los botones de contacto en la parte inferior izquierda. Que platillo te interesa hoy?' }, en: { 'ai-welcome': 'Welcome to Mariscos Sol Mar. I am your Chef Assistant for dish recommendations and prices. For orders use the contact buttons at the bottom left. Which dish interests you today?' }};

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onDisable: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onDisable }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ sender: 'ai', text: translations.es['ai-welcome'] }]);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  const markdownToHtml = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<ul class="list-disc list-inside"><li>$1</li></ul>')
      .replace(/(\r\n|\n|\r)/gm, '<br>');
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userInput = input;
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    setInput('');
    setIsTyping(true);

    try {
        // FIX: Refactored to use the recommended `GoogleGenAI` client and `generateContent` method.
        const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

        // FIX: The model `gemini-1.5-flash` is deprecated. Using `gemini-2.5-flash`.
        // The chat history from the component's state is passed to the `contents` property.
        const history = messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' as const : 'model' as const,
            parts: [{ text: msg.text }]
        }));

        const systemPrompt = `Eres "Chef Asisstant" del restaurante "Mariscos Sol Mar". Responde en Español. CONOCIMIENTOS: ${aiKnowledgeContext}. MENÚ: ${JSON.stringify(menuData)}. INSTRUCCIONES: Respuestas CORTAS, máximo 3 oraciones. SIN emojis, asteriscos, o markdown. Si preguntan por precios, pedidos o contacto, OBLIGATORIAMENTE responde: "Para precios, pedidos o reservaciones usa los botones de contacto en la parte inferior izquierda de tu pantalla."`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [...history, { role: 'user', parts: [{ text: userInput }] }],
          config: {
            systemInstruction: systemPrompt,
          },
        });
        
        // FIX: The new API returns the text directly on the `text` property, not a `text()` function.
        setMessages(prev => [...prev, { sender: 'ai', text: response.text }]);
    } catch (error) {
        console.error("Gemini API Error:", error);
        setMessages(prev => [...prev, { sender: 'ai', text: 'Disculpa, estoy teniendo problemas técnicos.' }]);
    } finally {
        setIsTyping(false);
    }
  };

  const handleMicClick = () => {
    // FIX: Cast window to `any` to access non-standard SpeechRecognition APIs and resolve TypeScript errors.
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
        recognitionRef.current.stop();
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
    };
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setTimeout(handleSend, 500);
    };
    recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        recognitionRef.current = null;
    };

    recognition.start();
  };

  const handleTTS = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div id="ai-chat-window" className={`flex flex-col bg-gradient-to-br from-[#001a29] to-[#003d5c] rounded-2xl shadow-2xl border border-sand-gold/20 w-80 md:w-96 h-[500px] ${isOpen ? 'opacity-100 scale-100' : 'hidden opacity-0 scale-95'}`}>
        <div className="flex-shrink-0 flex items-center justify-between p-4 bg-black/20 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <i className="fas fa-robot text-sand-gold text-xl"></i>
            <h3 className="font-bold text-white">Asistente Gourmet</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onDisable} className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded" title="Desactivar IA"><i className="fas fa-power-off"></i></button>
            <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fas fa-times"></i></button>
          </div>
        </div>
        <div id="chat-messages" className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`w-full flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`chat-message w-fit rounded-xl p-3 ${msg.sender}`}>
                {msg.sender === 'ai' ? (
                  <>
                    <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.text) }} />
                    <button className="tts-button mt-2" onClick={(e) => handleTTS(msg.text, e)}><i className="fas fa-volume-up"></i></button>
                  </>
                ) : msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message ai rounded-xl p-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-sand-gold rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-sand-gold rounded-full animate-pulse [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-sand-gold rounded-full animate-pulse [animation-delay:0.4s]"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex-shrink-0 p-4 bg-black/20 rounded-b-2xl">
          <div className="flex items-center gap-2 bg-black/30 border-2 border-sand-gold/30 rounded-xl pr-2">
            <input type="text" id="chat-input" placeholder="Pregúntame algo..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} className="w-full bg-transparent text-white p-3 focus:outline-none" />
            <button id="mic-btn" onClick={handleMicClick} className={`mic-button text-xl p-2 relative ${isListening ? 'is-listening' : ''}`}>
              <i className="fas fa-microphone"></i>
            </button>
            <button id="send-chat-btn" onClick={handleSend} className="btn-ocean text-white font-bold p-2 rounded-lg aspect-square flex items-center justify-center"><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
      <button onClick={() => isOpen ? onClose() : onDisable()} id="ai-chat-fab" className="btn-ocean text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
        <i id="fab-icon" className={`fas fa-robot text-2xl transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}></i>
      </button>
    </div>
  );
};

export default AIChat;