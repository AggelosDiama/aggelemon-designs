import profilePhoto from "@/assets/profile-original.jpg";
import { ChevronDown, Mail, Linkedin } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 animate-fade-in relative">
      <div className="max-w-6xl w-full flex-1 flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-lemon shadow-lg">
                <img 
                  src={profilePhoto} 
                  alt="Aggelos Diamantopoulos - Lemon" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Hero Text */}
            <div className="flex-1 text-center md:text-left space-y-6">
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
                <span className="highlight">squeeze the most out of design</span>. I'm constantly 
                exploring how AI can elevate creativity and make my daily routine and projects 
                smarter and more efficient.
              </p>
              <div className="pt-2 flex items-center gap-4 text-center md:justify-start justify-center">
                <span className="text-lg font-medium text-heading">Get in Touch</span>
                <div className="flex gap-3">
                  <a 
                    href="mailto:aggelosdiama@gmail.com"
                    className="hover:scale-110 transition-transform"
                    aria-label="Email"
                  >
                    <Mail className="w-6 h-6 text-heading hover:text-lemon transition-colors" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-heading hover:text-lemon transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="flex flex-col items-center gap-2 pb-8 animate-fade-in">
        <p className="text-sm text-muted-foreground">Check my projects</p>
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};
