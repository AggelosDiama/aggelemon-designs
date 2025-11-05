import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  tags: string[];
  slug: string;
  image: string;
  short_description: string;
  category?: string;
  showCategory?: boolean;
}

export const ProjectCard = ({ title, tags, slug, image, short_description, category, showCategory = false }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
        {/* Project Image */}
        <div className="aspect-video overflow-hidden bg-muted relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {showCategory && category && (
            <span className="absolute top-4 right-4 px-4 py-2 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
              {category}
            </span>
          )}
        </div>
        
        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-heading group-hover:text-lemon transition-colors">
              {title}
            </h3>
            <ArrowRight className="w-6 h-6 text-lemon group-hover:translate-x-2 transition-transform" />
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-muted text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {short_description}
          </p>
        </div>
      </div>
    </Link>
  );
};
