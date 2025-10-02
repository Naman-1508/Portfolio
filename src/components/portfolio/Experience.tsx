import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      role: "Software Development Intern",
      company: "MS Ramaiah Institute of Technology",
      location: "Bangalore, India",
      period: "August 2024",
      type: "On-site",
      responsibilities: [
        "Built a Flutter-based Travel Booking App UI with clean and responsive layouts",
        "Designed intuitive interfaces for browsing destinations, selecting dates, and viewing trip details",
        "Focused on frontend development with emphasis on user experience and modern design patterns",
        "Collaborated with team members to deliver high-quality mobile application designs"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-background/50">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Experience</h2>
            <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="gradient-card rounded-xl p-8 border border-border hover:border-primary transition-all"
              >
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{exp.role}</h3>
                      <p className="text-xl text-foreground mt-1">{exp.company}</p>
                      <p className="text-muted-foreground">{exp.location}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                      <span className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary ml-2">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-6">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start gap-3">
                        <Briefcase className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
