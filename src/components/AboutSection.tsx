import { CheckCircle2 } from "lucide-react";
import cvQRCode from "@/assets/cv-qr-code.png";

const skills = [
  "UI/UX Design",
  "Prototyping",
  "Visual Design & Branding",
  "User Research",
  "Journey Mapping",
  "Usability Testing",
  "Design Systems",
  "Responsive Design",
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
          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Left: Opening Snapshot */}
            <div>
              <p className="text-lg text-foreground leading-relaxed">
                I see design as a way to solve real problems, not just to create
                and impress. My style{" "}
                <span className="highlight-text font-semibold text-heading">
                  leans toward minimalism
                </span>
                , but every project starts with{" "}
                <span className="highlight-text font-semibold text-heading">
                  questions, research, and curiosity
                </span>
                . I treat each challenge as a chance to think differently, even
                when it means stepping outside my comfort zone.
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

            {/* Bottom Left: Skills */}
            <div>
              <h3 className="text-2xl font-bold text-heading mb-4">Skills</h3>
              <div className="grid grid-cols-1 gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lemon flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{skill}</span>
                  </div>
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
