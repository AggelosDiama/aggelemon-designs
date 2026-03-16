import profilePhoto from "@/assets/portfolio-pic-2.png";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
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
                <span className="highlight-heading">Making Intelligent Products: Where AI Engineering meets UX.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                I was always the 'tech guy' with a Computer Engineering background , but I’ve realized that the most powerful technology is <span className="highlight-text font-semibold text-heading">deeply human</span>. To me, it’s not just about writing code or optimizing algorithms. It’s about <span className="highlight-text font-semibold text-heading">why and how people using them</span> and the complex problems we try to solve.
                <br></br>
                <br></br>
                Whether I’m designing a UI or developing an AI agent, I’m driven to find smarter ways to make things work. I believe AI adds a transformative layer to this, moving beyond simple prompts to creating RAG-based systems and LLM orchestrations<span className="highlight-text font-semibold text-heading">that actually understand user needs.</span>
                <br></br>
                <br></br>
                Right now, I’m building production-ready AI tools and collaborating with people who share the same drive to create, solve, and innovate at the intersection of intelligence and design.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl pt-2">
                Get in touch with me by connecting on{" "}
                <a 
                  href="https://www.linkedin.com/in/aggelos-diamantopoulos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlight-link font-bold text-heading"
                >
                  LinkedIn
                </a>
                {" "}or email me at{" "}
                <a 
                  href="mailto:aggelosdiama@gmail.com"
                  className="highlight-link font-bold text-heading"
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
