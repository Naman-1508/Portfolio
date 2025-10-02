import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Certifications = () => {
  const certifications = [
    {
      title: "Data Structures and Algorithms",
      issuer: "Infosys Springboard",
      description: "Comprehensive course covering fundamental and advanced DSA concepts",
      status: "Completed"
    },
    {
      title: "Introduction to MongoDB",
      issuer: "MongoDB, Inc. (MongoDB University)",
      description: "Foundational knowledge in NoSQL database management and MongoDB",
      status: "Completed"
    },
    {
      title: "Google Cloud Batch Program - Beginner Generative AI",
      issuer: "Google Cloud Platform",
      description: "Learning cutting-edge Generative AI technologies and applications",
      status: "Ongoing"
    }
  ];

  return (
    <section id="certifications" className="py-20 px-4 bg-background/50">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Certifications</h2>
            <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Continuous learning and professional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="gradient-card rounded-xl p-6 border border-border hover:border-primary transition-all hover:scale-105 duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs ${
                      cert.status === "Ongoing" 
                        ? "bg-secondary/10 text-secondary" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                    <p className="text-sm text-primary mb-2">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <div className="gradient-card rounded-xl p-8 border border-border max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Notable Achievement</h3>
              <div className="flex items-start gap-4 text-left">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">Smart Elevator Project</h4>
                  <p className="text-muted-foreground">
                    Arduino-based smart elevator prototype selected for presentation at the 
                    <span className="text-primary font-semibold"> National Children Science Congress (NCSC)</span>. 
                    Led the technical presentation and explained design decisions during the evaluation process.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary">Arduino</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary">C++</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary">Team Project</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary">National Level</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
