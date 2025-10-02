import { Code2, Database, Smartphone, Brain, Wrench } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Languages",
      skills: ["Java", "C", "C++", "Python", "JavaScript", "Dart"]
    },
    {
      icon: Code2,
      title: "Web Development",
      skills: ["HTML", "CSS", "React.js", "Node.js"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: ["Flutter", "Android Studio"]
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["SQL", "MongoDB", "Neo4j", "CQL", "Hive"]
    },
    {
      icon: Wrench,
      title: "Tools & Platforms",
      skills: ["VS Code", "Git", "GitHub", "MongoDB Compass"]
    },
    {
      icon: Brain,
      title: "AI/ML",
      skills: ["Generative AI", "Google Cloud Platform"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Skills & Technologies</h2>
            <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A diverse toolkit for building modern, scalable applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                className="gradient-card rounded-xl p-6 border border-border hover:border-primary transition-all hover:scale-105 duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-background/50 rounded-full text-sm border border-border hover:border-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
