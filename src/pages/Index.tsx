import { useEffect } from "react";
import BentoGrid from "@/components/portfolio/BentoGrid";

const Index = () => {
  // Global cursor setup (if needed)
  useEffect(() => {
    // Mouse tracking for premium cards handled internally in components
    // and bg-aurora handled in index.css
  }, []);

  return (
    <div className="bg-aurora min-h-screen">
      <BentoGrid />
    </div>
  );
};

export default Index;
