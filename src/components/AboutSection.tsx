import cvQRCode from "@/assets/cv-qr-code.png";

const designSkills = [
  "UI/UX Design",
  "Prototyping",
  "User Research",
  "Journey Mapping",
  "Usability Testing",
  "Design Systems",
  "Responsive Design",
  "Accessibility & Inclusive Design",
  "Figma",
  "Adobe Creative Suite",
  "Affinity Suite",
];

const tools = [
  "AI Agents",
  "RAG Systems",
  "LLM Orchestration",
  "Docker",
  "HTML/CSS",
  "JavaScript",
  "Python",
];

const lemonFacts = [
  "I play Pokémon on my Switch; my childhood love for the series is still strong.",
  "Improv theater is a weekly habit that helps me relax, reset, and stay creative.",
  "I am a big Marvel fan and never miss a new movie.",
];

export const AboutSection = () => {
  return (
    <section className="py-20 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-heading text-center mb-12">
          <span className="highlight-heading">About Me</span>
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Left: Opening Snapshot */}
            <div>
              <p className="text-lg text-foreground leading-relaxed">
                I’m Aggelos, a <span className="highlight-text font-semibold text-heading">Computer Engineer</span> and 
                <span className="highlight-text font-semibold text-heading">UX Specialist</span> building the next generation of AI products. 
                I don't just design interfaces. I develop the intelligent systems behind them. My goal is to 
                <span className="highlight-text font-semibold text-heading">bridge the gap</span> between complex engineering 
                and seamless user experiences.  <span className="highlight-text font-semibold text-heading">
                  <a href="https://aggelemon-designs.lovable.app/about" target="_blank">
                    Learn more about my background and experience here.
                  </a>
                </span>
              </p>
            </div>

            {/* Top Right: QR Code */}
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-card border border-border">
              <img src={cvQRCode} alt="CV QR Code" className="w-48 h-48 mb-3" />
              <p className="text-sm text-muted-foreground text-center">
                Scan QR for my CV
              </p>
              <p className="text-sm text-muted-foreground text-center">
                or you can{" "}
                <span className="highlight-text font-semibold text-heading">
                  <a href="https://linkly.link/2KW66" target="_blank">
                    click here!
                  </a>
                </span>
              </p>
            </div>

            {/* Bottom Left: Skills & Tools as Chips */}
            <div>
              <h3 className="text-2xl font-bold text-heading mb-4">Skills & Tools</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {designSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-full bg-muted text-foreground border border-border font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-sm rounded-full bg-card text-foreground border border-border font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Right: Lemon Facts */}
            <div>
              <h3 className="text-2xl font-bold text-heading mb-4">
                🍋 <span className="highlight-heading">Lemon</span> Facts
              </h3>
              <div className="space-y-4">
                {lemonFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
                  >
                    <span className="text-2xl">🍋</span>
                    <p className="text-foreground leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
