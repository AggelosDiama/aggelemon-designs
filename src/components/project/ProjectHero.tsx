import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div className="w-full aspect-[21/9] overflow-hidden bg-muted">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
              {category}
            </span>
            <span>•</span>
            <span>
              {monthName} {year}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-heading">
            {title}
          </h1>

          <p className="text-lg text-foreground leading-relaxed">
            {shortDescription}
          </p>

          {projectLink && (
            <div className="pt-4">
              <Button asChild size="lg">
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
      </div>
    </div>
  );
};
