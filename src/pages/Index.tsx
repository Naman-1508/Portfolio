import { useEffect } from "react";
import BentoGrid from "@/components/portfolio/BentoGrid";

const Index = () => {
  return (
    <>
      {/* Background Layer */}
      <div className="bg-aurora" />
      
      {/* Main Content Layer */}
      <div className="relative z-10 min-h-screen">
        <BentoGrid />
      </div>
    </>
  );
};

export default Index;
