import profilePhoto from "@/assets/portfolio-pic-2.png";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 animate-fade-in relative">
      <div className="max-w-7xl w-full flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
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
                I'm Aggelos, you can call me <span className="highlight-heading">Lemon</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-heading">
                Making Intelligent Products: <br></br>
                <span className="highlight-heading">Where AI Dev. meets UX.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                I’ve always been the 'tech guy' with a Computer Engineering background, but realized that the most powerful technology is <span className="highlight-text font-semibold text-heading">deeply human</span>. To me, it’s not just about code or algorithms. It’s about <span className="highlight-text font-semibold text-heading">why and how people using them</span> and the complex problems we try to solve.
                <br></br>
                <br></br>
                Whether I’m building a UI or an AI agent, I’m driven to find smarter ways to <span className="highlight-text font-semibold text-heading">bridge the gap between user needs and technical possibility.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="bg-lemon hover:bg-lemon/90 text-heading font-bold text-base px-6 py-3 h-auto"
                  onClick={() => navigate("/ai-engineering")}
                >
                  View my AI Projects
                </Button>
                <Button 
                  variant="ghost"
                  className="text-base font-semibold px-6 py-3 h-auto border border-border hover:text-lemon"
                  asChild
                >
                  <a 
                    href="https://www.linkedin.com/in/aggelos-diamantopoulos/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Let's Connect on LinkedIn
                  </a>
                </Button>
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
