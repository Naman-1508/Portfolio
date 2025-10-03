import { Mail, Phone, Github, Linkedin, Code2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Get In Touch</h2>
            <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <div className="gradient-card rounded-2xl p-8 md:p-12 border border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <a 
                  href="mailto:namanjain01508@gmail.com"
                  className="flex items-center gap-4 group hover:text-primary transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">namanjain01508@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+919509472256"
                  className="flex items-center gap-4 group hover:text-primary transition-colors"
                >
                </a>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Bangalore, India</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full justify-start gradient-primary border-0 hover:opacity-90"
                    size="lg"
                    asChild
                  >
                    <a href="https://github.com/Naman-1508" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-3" />
                      GitHub Profile
                    </a>
                  </Button>

                  <Button 
                    className="w-full justify-start border-primary/50 hover:bg-primary/10"
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/naman-jain-123681317/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5 mr-3" />
                      LinkedIn Profile
                    </a>
                  </Button>

                  <Button 
                    className="w-full justify-start border-primary/50 hover:bg-primary/10"
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <a href="https://leetcode.com/u/ZWCMA2Saw6/-" target="_blank" rel="noopener noreferrer">
                      <Code2 className="w-5 h-5 mr-3" />
                      LeetCode Profile
                    </a>
                  </Button>
                </div>

                <div className="pt-6">
                  <p className="text-sm text-muted-foreground text-center">
                    Open to internship and full-time opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-border">
            <p className="text-muted-foreground">
              © 2025 Naman Jain. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
