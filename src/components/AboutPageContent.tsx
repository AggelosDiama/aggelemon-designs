import { CheckCircle2, Mail } from "lucide-react";
import { Linkedin } from "lucide-react";
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
  "Figma",
  "Adobe Creative Suite",
  "Affinity Suite",
  "Frontend Basics (HTML/CSS)",
  "Cross-functional Collaboration",
  "Accessibility & Inclusive Design",
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

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Opening Snapshot & QR Code */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <p className="text-lg text-foreground leading-relaxed">
                I see design as a way to solve real problems, not just to create and impress. My style leans toward minimalism, but every project starts with questions, research, and curiosity. I treat each challenge as a chance to think differently, even when it means stepping outside my comfort zone.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-card border border-border">
              <img src={cvQRCode} alt="CV QR Code" className="w-48 h-48 mb-3" />
              <p className="text-sm text-muted-foreground text-center">Scan QR for my CV</p>
            </div>
          </div>

          {/* Professional Story */}
          <div>
            <h3 className="text-2xl font-bold text-heading mb-4">Professional Story</h3>
            <p className="text-foreground leading-relaxed">
              I was always the "tech guy" in my circles, so studying computer engineering felt like the obvious path. During university, I joined EESTEC, a European organization for Electrical and Computer Engineers, and discovered their Graphic Design team. That's where design first clicked for me. I moved from small visual tasks to leading the team, designing the annual magazine, and mentoring new designers. Freelance projects followed, giving me space to explore creativity through real challenges. To connect my technical background with that creative drive, I began focusing on UI/UX design, taking on projects and specialized courses to refine my skills.
            </p>
          </div>

          {/* Design Philosophy */}
          <div>
            <h3 className="text-2xl font-bold text-heading mb-4">Design Philosophy</h3>
            <p className="text-foreground leading-relaxed">
              I design with the user's experience front and center. Every decision aims to make information clear and tasks easy to complete. I'm proactive with new challenges, asking questions and seeking input to find the best solutions. Negative space is core to my approach; I believe simplicity helps users focus, making each design both functional and easy on the eyes.
            </p>
          </div>

          {/* Skills & Lemon Facts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold text-heading mb-4">Skills & Tools</h3>
              <div className="grid grid-cols-1 gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lemon flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{skill}</span>
                  </div>
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

          {/* Call to Action */}
          <div className="text-center space-y-6 pt-8">
            <h3 className="text-2xl font-bold text-heading">Let's Connect</h3>
            <p className="text-foreground leading-relaxed max-w-3xl mx-auto">
              I am open to new opportunities, collaborations, and meeting fellow designers. You can email me at{" "}
              <a href="mailto:aggelosdiama@gmail.com" className="text-lemon hover:underline">
                aggelosdiama@gmail.com
              </a>{" "}
              or connect with me on LinkedIn. I am always happy to chat.
            </p>
            <div className="flex justify-center gap-6 pt-4">
              <a
                href="https://www.linkedin.com/in/aggelos-diamantopoulos/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-card hover:bg-muted transition-all duration-300 group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-8 h-8 text-heading group-hover:text-lemon transition-colors" />
              </a>
              <a
                href="mailto:aggelosdiama@gmail.com"
                className="p-4 rounded-lg bg-card hover:bg-muted transition-all duration-300 group"
                aria-label="Email Contact"
              >
                <Mail className="w-8 h-8 text-heading group-hover:text-lemon transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
