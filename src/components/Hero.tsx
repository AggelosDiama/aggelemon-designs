import { GlassCard } from "./GlassCard";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 animate-fade-in">
      <div className="max-w-6xl w-full">
        <GlassCard className="max-w-4xl mx-auto" glow>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 bg-lemon/20 rounded-[2.5rem] rotate-6 animate-glow" />
                <div className="relative w-full h-full bg-gradient-to-br from-lemon-muted to-accent rounded-[2rem] overflow-hidden border-4 border-lemon/30 shadow-2xl">
                  {/* Placeholder for profile photo - user will add their own */}
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🍋
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                I'm <span className="text-lemon">Aggelos</span>, you can call me{" "}
                <span className="text-lemon">Lemon</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                Graphic & UI/UX Designer
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Combining my computer engineering roots with a flair for visual storytelling, I
                create user-centered digital experiences, from bold graphics to seamless UI/UX.
                Driven by curiosity, inspired by community, and always ready to squeeze the most
                out of design. Explore my work below!
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
