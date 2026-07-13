import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BentoGrid from "@/components/portfolio/BentoGrid";
import WelcomeScreen from "@/components/portfolio/WelcomeScreen";

const Index = () => {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <WelcomeScreen key="welcome" onEnter={() => setHasEntered(true)} />
        ) : (
          <div key="portfolio" className="relative z-10 min-h-screen animate-fade-in">
            {/* Background Layer (only loads after entering) */}
            <div className="bg-aurora" />
            <BentoGrid />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
