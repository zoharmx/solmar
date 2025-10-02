import React, { useState } from 'react';
// FIX: The `GoogleGenerativeAI` import is deprecated. Use `GoogleGenAI` from `@google/genai` instead.
import { GoogleGenAI } from '@google/genai';

// Mock data for menu items to be used by AI
const menuData = { "Desayunos": [{ id: "1", name: "Chilaquiles de Birria", desc: "Deliciosos chilaquiles bañados en salsa roja o verde, acompañados de birria", price: 12 }], "Mariscos": [{ id: "3", name: "Aguachile Verde", desc: "Camarones frescos marinados en limón con chile serrano y pepino", price: 15 }] };
// FIX: The API key should be sourced exclusively from `process.env.API_KEY` as per guidelines.

const EventPlannerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');

    const markdownToHtml = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gm, '<ul class="list-disc list-inside"><li>$1</li></ul>')
            .replace(/(\r\n|\n|\r)/gm, '<br>');
    };

    const getEventPlan = async () => {
        if (!userInput) return;
        setIsLoading(true);
        setResult('');

        try {
            // FIX: Refactored to use the recommended `GoogleGenAI` client and `generateContent` method.
            // The API now uses a named parameter for the API key.
            const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

            // FIX: The model `gemini-1.5-flash` is deprecated. Using `gemini-2.5-flash`.
            // The system prompt has been improved to not include the user input directly,
            // which is now passed in the `contents` field.
            const systemPrompt = `Eres un planificador de eventos para el restaurante Mariscos Sol Mar. Tu objetivo es crear un plan de evento detallado basado en la petición del usuario. Utiliza la siguiente información del menú para hacer sugerencias y estimar costos: ${JSON.stringify(menuData)}.`;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: userInput,
                config: {
                    systemInstruction: systemPrompt,
                    maxOutputTokens: 1000,
                },
            });

            // FIX: The new API returns the text directly on the `text` property, not a `text()` function.
            setResult(response.text);
        } catch (error) {
            console.error("Error generating event plan:", error);
            setResult("Lo siento, no pude generar un plan en este momento. Por favor, intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
            <div className="modal-content rounded-3xl shadow-2xl w-full max-w-lg relative p-8">
                <button onClick={onClose} className="close-modal-btn absolute top-4 right-4 text-gray-400 hover:text-sand-gold z-10">
                    <i className="fas fa-times text-2xl"></i>
                </button>
                <h3 data-translate="event-planner-title" className="font-display text-2xl font-bold text-amber-400 mb-4">Planificador de Eventos con IA</h3>
                
                {!isLoading && !result && (
                    <div id="event-planner-content">
                        <p data-translate="event-planner-prompt" className="text-gray-300 mb-2">Describe tu evento ideal</p>
                        <textarea 
                            id="event-planner-input" 
                            rows={4} 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full bg-black/30 border-2 border-sand-gold/30 text-white rounded-xl p-4 focus:ring-2 focus:ring-sand-gold outline-none transition" 
                            data-translate-placeholder="event-planner-placeholder"
                            placeholder="Ej: una fiesta de cumpleaños para 10 personas, ambiente familiar..."
                        ></textarea>
                        <button onClick={getEventPlan} className="mt-4 w-full btn-sunset text-white font-bold py-2 px-4 rounded-xl">
                            <span data-translate="event-planner-cta">Generar Plan de Evento</span>
                        </button>
                    </div>
                )}

                {isLoading && (
                    <div id="event-planner-loading" className="text-center py-8">
                        <div className="loading-wave mx-auto"></div>
                        <p data-translate="event-planner-loading" className="mt-4 text-gray-300">Creando un plan perfecto...</p>
                    </div>
                )}

                {result && (
                    <div id="event-planner-result" className="mt-6">
                         <h4 data-translate="event-planner-result-title" className="font-bold text-lg text-white mb-4">Plan sugerido para tu evento:</h4>
                         <div 
                            id="event-planner-result-text" 
                            className="bg-deep-teal/20 p-4 rounded-lg text-gray-300 max-h-64 overflow-y-auto prose prose-sm text-white"
                            dangerouslySetInnerHTML={{ __html: markdownToHtml(result) }}
                         ></div>
                         <button onClick={() => { setResult(''); setUserInput(''); }} className="mt-4 w-full btn-ocean text-white font-bold py-2 px-4 rounded-xl">
                            Planear otro
                         </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventPlannerModal;