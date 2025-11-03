import { GlassCard } from "./GlassCard";
import { CheckCircle2 } from "lucide-react";

const skills = [
  "UI/UX Design & Prototyping",
  "Visual Design & Branding",
  "User Research & Testing",
  "Design Systems",
  "Figma, Adobe Creative Suite",
  "Frontend Basics (HTML/CSS)",
  "Cross-functional Collaboration",
  "Accessibility & Inclusive Design",
];

const lemonFacts = [
  "Started with computer engineering before falling in love with design",
  "Believes the best designs are invisible—they just work",
  "Always learning, always experimenting, never settling",
];

export const AboutSection = () => {
  return (
    <section className="py-20 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          About <span className="text-lemon">Lemon</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Background & Skills */}
          <GlassCard className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-lemon mb-4">Background & Education</h3>
              <p className="text-muted-foreground leading-relaxed">
                With a foundation in <span className="text-lemon font-semibold">computer engineering</span>, 
                I discovered my passion for creating intuitive, beautiful digital experiences. 
                I've combined technical understanding with creative vision to bridge the gap 
                between users and technology.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-lemon mb-4">Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lemon flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Lemon Facts */}
          <GlassCard className="space-y-6" glow>
            <h3 className="text-2xl font-bold text-lemon mb-4">
              🍋 Lemon Facts
            </h3>
            <div className="space-y-4">
              {lemonFacts.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-lemon/5 border border-lemon/20"
                >
                  <span className="text-2xl">🍋</span>
                  <p className="text-foreground leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
