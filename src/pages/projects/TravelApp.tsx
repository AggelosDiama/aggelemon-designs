import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TravelApp = () => {
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
            <span className="text-lemon">Travel App</span> Concept
          </h1>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              UI/UX
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              Mobile
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
              2024
            </span>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Project Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Conceptualized a mobile travel companion app that helps users discover, plan, and
            document their journeys. The design emphasizes visual storytelling and intuitive
            navigation to inspire wanderlust and simplify trip planning.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">My Role</h2>
          <p className="text-muted-foreground leading-relaxed">
            Solo designer responsible for all aspects of the project: user research, information
            architecture, wireframing, visual design, and interactive prototyping.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Design Process</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. User Research</h3>
              <p className="leading-relaxed">
                Interviewed frequent travelers to identify common pain points in trip planning and
                on-the-go information access.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Competitive Analysis</h3>
              <p className="leading-relaxed">
                Analyzed existing travel apps to identify gaps in user experience and opportunities
                for innovation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Visual Identity</h3>
              <p className="leading-relaxed">
                Crafted a vibrant, inspiring visual style with bold imagery and a clean interface
                that puts content first.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Prototyping</h3>
              <p className="leading-relaxed">
                Built interactive prototypes to demonstrate core flows like destination discovery,
                itinerary creation, and memory capture.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold text-lemon mb-4">Tools Used</h2>
          <div className="flex flex-wrap gap-3">
            {["Figma", "Principle", "Adobe Illustrator", "InVision"].map((tool) => (
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
            <li>Personalized destination recommendations based on user preferences</li>
            <li>Collaborative trip planning with friends and family</li>
            <li>Offline access to saved itineraries and maps</li>
            <li>Visual travel journal with photo and note integration</li>
            <li>Real-time updates on flight status, weather, and local events</li>
          </ul>
        </GlassCard>

        <Footer />
      </div>
    </main>
  );
};

export default TravelApp;
