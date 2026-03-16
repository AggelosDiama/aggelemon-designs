import { Separator } from "@/components/ui/separator";
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
  "Cross-functional Collaboration",
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
  "I listen to rock and metal and always hit shuffle instead of making playlists.",
  "I am a big Marvel fan and never miss a new movie.",
  "When I start making puns, it means I'm comfortable with you.",
];

export const AboutPageContent = () => {
  return (
    <section className="py-20 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-heading text-center mb-12">
          <span className="highlight-heading">About Me</span>
        </h2>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Opening Snapshot */}
          <div>
            <p className="text-lg text-foreground leading-relaxed">
              <span className="text-2xl mr-2">👋</span>
              <span className="text-2xl font-bold text-heading">Hello!</span>
            </p>
            <p className="text-lg text-foreground leading-relaxed mt-4">
              I see design as a way to <span className="highlight-text font-semibold text-heading">solve real problems</span>, not just to create and impress. My style <span className="highlight-text font-semibold text-heading">leans toward minimalism</span>, but every project starts with <span className="highlight-text font-semibold text-heading">questions, research, and curiosity</span>. I treat each challenge as a chance to <span className="highlight-text font-semibold text-heading">think differently</span>, even when it means stepping outside my comfort zone.
            </p>
          </div>

          <Separator className="my-12" />

          {/* Professional Story with QR Code */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-heading mb-4">Professional Story</h3>
              <p className="text-foreground leading-relaxed">
                I was always the <span className="highlight-text font-semibold text-heading">"tech guy"</span> in my circles, so studying computer engineering felt like the obvious path. During university, I joined <span className="highlight-text font-semibold text-heading">EESTEC</span>, a European organization for Electrical and Computer Engineers, and discovered their Graphic Design team. That's where <span className="highlight-text font-semibold text-heading">design first clicked</span> for me. I moved from small visual tasks to <span className="highlight-text font-semibold text-heading">leading the team</span>, designing the annual magazine, and mentoring new designers. Freelance projects followed, giving me space to explore creativity through real challenges. To connect my technical background with that creative drive, I began focusing on <span className="highlight-text font-semibold text-heading">UI/UX design</span>, taking on projects and specialized courses to refine my skills.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-card border border-border">
              <img src={cvQRCode} alt="CV QR Code" className="w-48 h-48 mb-3" />
              <p className="text-sm text-muted-foreground text-center">Scan QR for my CV</p>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Design Philosophy */}
          <div>
            <h3 className="text-2xl font-bold text-heading mb-4">Design Philosophy</h3>
            <p className="text-foreground leading-relaxed">
              I design with the <span className="highlight-text font-semibold text-heading">user's experience front and center</span>. Every decision aims to make <span className="highlight-text font-semibold text-heading">information clear</span> and <span className="highlight-text font-semibold text-heading">tasks easy to complete</span>. I'm proactive with new challenges, asking questions and seeking input to find the best solutions. <span className="highlight-text font-semibold text-heading">Negative space</span> is core to my approach; I believe <span className="highlight-text font-semibold text-heading">simplicity helps users focus</span>, making each design both functional and easy on the eyes.
            </p>
          </div>

          <Separator className="my-12" />

          {/* Skills & Lemon Facts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Skills & Tools as Chips */}
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

            {/* Lemon Facts */}
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

          <Separator className="my-12" />

          {/* Call to Action */}
          <div className="text-center space-y-6 pt-8">
            <h3 className="text-2xl font-bold text-heading">Get in touch!</h3>
            <p className="text-foreground leading-relaxed max-w-3xl mx-auto">
              I am open to new opportunities, collaborations, and meeting fellow designers. You can email me at{" "}
              <a href="mailto:aggelosdiama@gmail.com" className="font-bold text-heading hover:text-lemon transition-colors duration-300 underline-offset-4 hover:underline">
                aggelosdiama@gmail.com
              </a>{" "}
              or connect with me on{" "}
              <a 
                href="https://www.linkedin.com/in/aggelos-diamantopoulos/" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-heading hover:text-lemon transition-colors duration-300 underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>. I am always happy to chat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
