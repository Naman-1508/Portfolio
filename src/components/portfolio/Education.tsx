import { GraduationCap, Award } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "B.E. Computer Science and Engineering (Cyber Security)",
      institution: "MS Ramaiah Institute of Technology",
      location: "Bangalore, India",
      cgpa: "9.02 / 10.0",
      status: "Current"
    },
    {
      degree: "Class 12th - PCM Stream",
      institution: "St. Anthony's Sr. Secondary School",
      location: "Udaipur, India",
      percentage: "87%",
      status: "Completed"
    },
    {
      degree: "Class 10th",
      institution: "St. Anthony's Sr. Secondary School",
      location: "Udaipur, India",
      percentage: "94%",
      status: "Completed"
    }
  ];

  return (
    <section id="education" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Education</h2>
            <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="gradient-card rounded-xl p-8 border border-border hover:border-primary transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                        <p className="text-lg text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 rounded-md text-sm text-primary w-fit">
                        {edu.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-lg font-semibold text-primary">
                        {edu.cgpa || edu.percentage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
