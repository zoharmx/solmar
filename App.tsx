import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationsSection from './components/ReservationsSection';
import Footer from './components/Footer';
import WelcomeOverlay from './components/WelcomeOverlay';
import AIChat from './components/AIChat';
import ActionFabs from './components/ActionFabs';
import EventPlannerModal from './components/EventPlannerModal';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showEventPlanner, setShowEventPlanner] = useState(false);

  useEffect(() => {
    // Show welcome overlay after a short delay
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartAI = () => {
    setShowWelcome(false);
    setAiEnabled(true);
    setShowChat(true);
  };
  
  const handleSkipAI = () => {
    setShowWelcome(false);
    setAiEnabled(false);
  };
  
  const handleDisableAI = () => {
    setAiEnabled(false);
    setShowChat(false);
  };

  return (
    <>
      {showWelcome && (
        <WelcomeOverlay onStart={handleStartAI} onSkip={handleSkipAI} />
      )}
      <Header onAssistantClick={() => {
        if (!aiEnabled) {
          setAiEnabled(true);
        }
        setShowChat(true);
      }} />
      <main className="relative z-10">
        <Hero />
        <MenuSection />
        <ReservationsSection onPlanEvent={() => setShowEventPlanner(true)} />
      </main>
      <Footer />
      <ActionFabs />
      {aiEnabled && (
        <AIChat
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          onDisable={handleDisableAI}
        />
      )}
      {showEventPlanner && (
        <EventPlannerModal onClose={() => setShowEventPlanner(false)} />
      )}
    </>
  );
};

export default App;
