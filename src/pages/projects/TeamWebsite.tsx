import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TeamWebsite = () => {
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
            <span className="text-lemon">Team Website</span> Concept
          </h1>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              Web Design
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              UI/UX
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              2025
            </span>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Project Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Designed a modern, engaging website concept for a creative team. The site showcases
            team members, their work, and collaborative culture while maintaining a professional yet
            approachable aesthetic that reflects the team's innovative spirit.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">My Role</h2>
          <p className="text-muted-foreground leading-relaxed">
            Lead Designer for the entire project. Collaborated closely with team members to
            understand their vision and translate it into a cohesive digital presence. Handled all
            aspects from information architecture to final visual design and interactive prototypes.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Design Process</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Discovery & Goals</h3>
              <p className="leading-relaxed">
                Met with team members to understand their goals, values, and desired brand
                perception. Defined key user personas and site objectives.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Content Strategy</h3>
              <p className="leading-relaxed">
                Organized site structure and content hierarchy to highlight team strengths,
                showcase work, and encourage engagement from potential clients or collaborators.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Visual Design</h3>
              <p className="leading-relaxed">
                Created a bold, modern design with dynamic layouts, striking imagery, and thoughtful
                use of whitespace to keep the focus on the team and their accomplishments.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Interaction Design</h3>
              <p className="leading-relaxed">
                Added subtle animations and interactive elements to bring the site to life and
                create a memorable user experience without overwhelming visitors.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Tools Used</h2>
          <div className="flex flex-wrap gap-3">
            {["Figma", "Framer", "Adobe Photoshop", "Webflow", "Lottie"].map((tool) => (
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
          <h2 className="text-2xl font-bold text-lemon mb-4">Key Features</h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Interactive team member profiles with hover animations</li>
            <li>Filterable project portfolio showcasing diverse work</li>
            <li>Integrated blog for sharing insights and updates</li>
            <li>Responsive design optimized for all devices</li>
            <li>Accessible navigation and content structure</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Results & Impact</h2>
          <p className="text-muted-foreground leading-relaxed">
            The concept was well-received by the team and stakeholders, effectively communicating
            the team's collaborative culture and creative capabilities. The design balances{" "}
            <span className="text-lemon font-semibold">personality with professionalism</span>,
            making the team approachable while showcasing their expertise.
          </p>
        </GlassCard>

        <Footer />
      </div>
    </main>
  );
};

export default TeamWebsite;
