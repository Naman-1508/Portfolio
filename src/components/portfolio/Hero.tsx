import { ArrowDown, Github, Linkedin, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE5MSwgMjE5LCAyNTQsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              Hi, I'm <span className="gradient-text">Naman Jain</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Computer Science Student | Full-Stack Developer | Cyber Security Enthusiast
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building innovative solutions with modern technologies. Passionate about problem-solving and creating impactful applications.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button size="lg" className="gradient-primary border-0 hover:opacity-90 transition-opacity">
              <a href="#projects" className="flex items-center gap-2">
                View Projects
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <a 
              href="https://github.com/Naman-1508" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary transition-colors hover:bg-primary/10"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/naman-jain-123681317/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary transition-colors hover:bg-primary/10"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://leetcode.com/u/ZWCMA2Saw6/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary transition-colors hover:bg-primary/10"
            >
              <Code2 className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
