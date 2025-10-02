const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">About Me</h2>
            <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
          </div>
          
          <div className="gradient-card rounded-2xl p-8 border border-border space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm an aspiring software developer and Computer Science (Cyber Security) undergraduate from 
              MS Ramaiah Institute of Technology with a strong CGPA of 9.02/10.0. My passion lies in 
              creating innovative solutions through code.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              With <span className="text-primary font-semibold">100+ problems solved</span> on LeetCode and active 
              participation in coding contests, I continuously sharpen my problem-solving skills. I'm exploring 
              full-stack development with React.js and Node.js, mobile development with Flutter, and diving deep 
              into Generative AI through the Google Cloud Beginner Program.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My technical toolkit spans across multiple domains - from frontend frameworks to databases, 
              from mobile apps to AI/ML. I believe in learning by doing, and my projects reflect my commitment 
              to building practical, user-centric applications.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">LeetCode Problems</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-primary">9.02</div>
                <div className="text-sm text-muted-foreground">CGPA</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-primary">3+</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
