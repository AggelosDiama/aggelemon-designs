import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  tags: string[];
  slug: string;
  image: string;
}

export const ProjectCard = ({ title, tags, slug, image }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
        {/* Project Image */}
        <div className="aspect-video overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-heading group-hover:text-lemon transition-colors">
              {title}
            </h3>
            <ArrowRight className="w-6 h-6 text-lemon group-hover:translate-x-2 transition-transform" />
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-muted text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
