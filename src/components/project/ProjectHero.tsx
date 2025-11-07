import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown } from "lucide-react";

interface ProjectHeroProps {
  title: string;
  shortDescription: string;
  coverImage: string;
  projectLink?: string;
  category: string;
  month: number;
  year: number;
}

export const ProjectHero = ({
  title,
  shortDescription,
  coverImage,
  projectLink,
  category,
  month,
  year,
}: ProjectHeroProps) => {
  const monthName = new Date(year, month - 1).toLocaleString("default", {
    month: "long",
  });

  const scrollToContent = () => {
    const contentSection = document.getElementById("project-content");
    contentSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-lemon relative min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex-1 flex items-center">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Project Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-black/10 text-black font-medium">
                {category}
              </span>
              <span className="text-black">•</span>
              <span className="text-black font-medium">
                {monthName} {year}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              {title}
            </h1>

            <p className="text-lg text-black/90 leading-relaxed">
              {shortDescription}
            </p>

            {projectLink && (
              <div className="pt-4">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-black text-white hover:bg-black/90"
                >
                  <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Check it here
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Right side - Project Image */}
          <div className="order-first md:order-last">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-black/10">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center gap-2 text-black hover:text-black/70 transition-colors cursor-pointer"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </button>
      </div>
    </div>
  );
};
