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
}

export const ProjectCard = ({
  title,
  tags,
  slug,
  image,
  short_description,
  category,
  showCategory = false,
}: ProjectCardProps) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:border-lemon/30 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5">
      {/* Project Image */}
      <div className="sm:w-52 md:w-60 shrink-0 aspect-video sm:aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <LazyImage
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          skeletonClassName="w-full h-full"
        />
      </div>

      {/* Project Info */}
      <div className="flex-1 flex flex-col py-1">
        <Link
          to={`/projects/${slug}`}
          className="group/title self-start"
        >
          <h3 className="text-xl md:text-2xl font-bold text-heading leading-tight group-hover/title:underline underline-offset-4 decoration-2 decoration-lemon transition-all">
            {title}
          </h3>
        </Link>

        {showCategory && category && (
          <span className="inline-flex self-start mt-2.5 px-4 py-1.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground">
            {category}
          </span>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-muted text-foreground font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mt-3 flex-1">
          {short_description}
        </p>

        <div className="mt-4">
          <Link
            to={`/projects/${slug}`}
            className="view-project-link group/vpl inline-flex items-center gap-1.5 text-sm font-semibold text-heading"
          >
            View Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover/vpl:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
