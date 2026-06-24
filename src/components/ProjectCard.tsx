import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LazyImage } from "@/components/LazyImage";

interface ProjectCardProps {
  title: string;
  tags: string[];
  slug: string;
  image: string;
  short_description: string;
  category?: string;
  showCategory?: boolean;
  compact?: boolean;
}

export const ProjectCard = ({
  title,
  tags,
  slug,
  image,
  short_description,
  category,
  showCategory = false,
  compact = false,
}: ProjectCardProps) => {
  return (
    <Link to={`/projects/${slug}`} className="block h-full">
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
        {/* Project Image */}
        <div className="aspect-video overflow-hidden bg-muted relative">
          <LazyImage
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            skeletonClassName="w-full h-full"
          />
          {showCategory && category && (
            <span className={`absolute top-3 right-3 ${compact ? "px-2.5 py-1 text-[10px]" : "px-4 py-2 text-xs"} font-semibold rounded-full bg-primary text-primary-foreground`}>
              {category}
            </span>
          )}
        </div>

        {/* Project Info */}
        <div className={`${compact ? "p-4" : "p-6"} flex-1 flex flex-col`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`${compact ? "text-lg" : "text-2xl"} font-bold text-heading group-hover:text-lemon transition-colors`}>
              {title}
            </h3>
            {!compact && (
              <ArrowRight className="w-6 h-6 text-lemon group-hover:translate-x-2 transition-transform" />
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`${compact ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"} rounded-full bg-muted text-foreground`}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className={`${compact ? "text-xs" : "text-sm"} text-muted-foreground flex-1`}>{short_description}</p>
          <div className="mt-3">
            <span className="highlight-link inline-block text-sm font-semibold text-heading">
              View
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
