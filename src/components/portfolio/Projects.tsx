import { Github, ExternalLink, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "RoadIntel",
      description: "RoadIntel is a smart traffic and accident reporting platform that allows users to register, report accidents with details, and track incidents in real-time. It ensures safety awareness by providing a secure, user-friendly interface with backend-powered data management.",
      tags: ["React","TypeScript","TailwindCSS","Node.js","Express.js","MongoDB","JWT"],
      github: "https://github.com/Naman-1508/RoadIntel",
      status: "In Development"
    },
    {
      title: "GuardianQuest",
      description: "Guardian Quest is a platform that uses generative AI to help children in hospitals and orphanages create stories and games, offering emotional support, creative expression, and moments of joy during challenging times",
      tags: ["React","TypeScript","TailwindCSS","Node.js","Express.js","JWT","MongoDB"],
      github: "https://github.com/Naman-1508/GuardianQuest",
      status: "In Development"
    },
    {
      title: "Jarvis",
      description: "Jarvis is a customizable AI virtual assistant built in Python that automates tasks using speech recognition and text-to-speech.",
      tags: ["Python","APIs"],
      github: "https://github.com/Naman-1508/Jarvis",
      status: "In Development"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Featured Projects</h2>
            <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Innovative solutions currently under active development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="gradient-card rounded-xl border border-border hover:border-primary transition-all duration-300 overflow-hidden group hover:scale-105"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      {project.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed min-h-[120px]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-primary/50 hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      className="gradient-primary border-0 hover:opacity-90"
                      disabled
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 hover:bg-primary/10"
              asChild
            >
              <a href="https://github.com/Naman-1508" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
