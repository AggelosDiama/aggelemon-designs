export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 animate-fade-in">
      <div className="max-w-6xl w-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-card shadow-lg">
                {/* Placeholder for profile photo */}
                <div className="w-full h-full bg-card flex items-center justify-center text-6xl">
                  🍋
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-heading">
                I'm Aggelos, you can call me <span className="highlight">Lemon</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-heading">
                Graphic & UI/UX Designer
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Combining my computer engineering roots with a flair for visual storytelling, I
                create user-centered digital experiences, from bold graphics to seamless UI/UX.
                Driven by curiosity, inspired by community, and always ready to{" "}
                <span className="highlight">squeeze the most out of design</span>. Explore my work below!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
