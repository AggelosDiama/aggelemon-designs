import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MakeDisCount = () => {
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
            <span className="text-lemon">MakeDis.Count</span> Platform
          </h1>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              Branding
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              UI/UX
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              2024
            </span>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Project Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Created comprehensive branding and UI/UX design for MakeDis.Count, a platform
            connecting users with exclusive discounts and deals. The project required establishing
            a distinctive brand identity and designing an intuitive interface that encourages
            discovery and engagement.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">My Role</h2>
          <p className="text-muted-foreground leading-relaxed">
            Brand Designer & UI/UX Lead. Developed the complete visual identity including logo,
            color palette, typography, and design system. Designed the platform's user interface
            and interactive elements to create a cohesive, memorable experience.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Design Process</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Brand Strategy</h3>
              <p className="leading-relaxed">
                Conducted stakeholder workshops to define brand values, target audience, and
                competitive positioning in the discount/deals marketplace.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Visual Identity</h3>
              <p className="leading-relaxed">
                Created a playful yet trustworthy brand identity with a memorable wordmark that
                emphasizes the "discount" value proposition through clever typography.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Design System</h3>
              <p className="leading-relaxed">
                Built a comprehensive design system with reusable components, ensuring consistency
                across all touchpoints while enabling rapid iteration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. UI Design & Testing</h3>
              <p className="leading-relaxed">
                Designed key user flows for deal discovery, filtering, and redemption. Conducted
                usability testing to optimize conversion and user satisfaction.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Tools Used</h2>
          <div className="flex flex-wrap gap-3">
            {["Figma", "Adobe Illustrator", "Adobe Photoshop", "Notion", "UserTesting"].map((tool) => (
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
            The cohesive branding and intuitive interface helped MakeDis.Count establish a strong
            market presence. User feedback highlighted the platform's{" "}
            <span className="text-lemon font-semibold">ease of use</span> and{" "}
            <span className="text-lemon font-semibold">trustworthy design</span>, contributing to
            strong user retention and organic growth through word-of-mouth.
          </p>
        </GlassCard>

        <Footer />
      </div>
    </main>
  );
};

export default MakeDisCount;
