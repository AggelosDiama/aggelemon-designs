import { GlassCard } from "./GlassCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  tags: string[];
  slug: string;
}

export const ProjectCard = ({ title, tags, slug }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${slug}`}>
      <GlassCard hover glow>
        <div className="flex items-center justify-between group">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-lemon group-hover:text-lemon-glow transition-colors">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-lemon group-hover:translate-x-2 transition-transform" />
        </div>
      </GlassCard>
    </Link>
  );
};
