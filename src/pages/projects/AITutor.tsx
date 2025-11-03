import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AITutor = () => {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-lemon hover:text-lemon-glow transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <GlassCard glow>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-lemon">AI Tutor</span> Platform
          </h1>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              UI/UX
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              EdTech
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              2025
            </span>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Project Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Designed an intelligent tutoring platform that adapts to individual learning styles.
            The interface prioritizes clarity, accessibility, and engagement to help students
            achieve their educational goals through personalized AI-driven guidance.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">My Role</h2>
          <p className="text-muted-foreground leading-relaxed">
            Led the complete UI/UX design process, from user research and wireframing to
            high-fidelity prototypes. Collaborated with developers and educators to ensure the
            design met both technical feasibility and pedagogical effectiveness.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Design Process</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Research & Discovery</h3>
              <p className="leading-relaxed">
                Conducted user interviews with students and teachers to understand pain points in
                traditional and digital learning environments.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Ideation & Wireframing</h3>
              <p className="leading-relaxed">
                Created low-fidelity wireframes to explore different layout structures and
                interaction patterns that promote focused learning.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Visual Design</h3>
              <p className="leading-relaxed">
                Developed a clean, modern interface with calming colors and clear typography to
                reduce cognitive load and enhance readability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Testing & Iteration</h3>
              <p className="leading-relaxed">
                Ran usability tests with target users, gathering feedback to refine navigation,
                content hierarchy, and interactive elements.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Tools Used</h2>
          <div className="flex flex-wrap gap-3">
            {["Figma", "Adobe XD", "Miro", "Maze", "Notion"].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full bg-lemon/10 text-foreground border border-lemon/20"
              >
                {tool}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Results & Impact</h2>
          <p className="text-muted-foreground leading-relaxed">
            The platform's intuitive design led to a <span className="text-lemon font-semibold">40% increase</span> in
            user engagement during beta testing. Educators praised the clarity of the interface,
            and students reported feeling more confident and motivated in their learning journey.
          </p>
        </GlassCard>

        <Footer />
      </div>
    </main>
  );
};

export default AITutor;
