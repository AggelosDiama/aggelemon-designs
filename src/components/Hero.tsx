import profilePhoto from "@/assets/portfolio-pic-2.png";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 animate-fade-in relative">
      <div className="max-w-7xl w-full flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                <img 
                  src={profilePhoto} 
                  alt="Aggelos Diamantopoulos - Lemon" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
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
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Combining my computer engineering roots with a flair for visual storytelling, I
                create user-centered digital experiences, from bold graphics to seamless UI/UX.
                Driven by curiosity, inspired by community, and always ready to{" "}
                <span className="highlight">squeeze the most out of design</span>. I'm constantly 
                exploring how AI can elevate creativity and make my daily routine and projects 
                smarter and more efficient.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl pt-2">
                Get in touch with me by connecting on{" "}
                <a 
                  href="https://www.linkedin.com/in/aggelos-diamantopoulos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-heading hover:text-lemon transition-colors"
                >
                  LinkedIn
                </a>
                {" "}or email me at{" "}
                <a 
                  href="mailto:aggelosdiama@gmail.com"
                  className="font-bold text-heading hover:text-lemon transition-colors"
                >
                  aggelosdiama@gmail.com
                </a>
              </p>
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
