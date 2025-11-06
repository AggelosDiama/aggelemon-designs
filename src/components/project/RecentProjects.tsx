import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCard } from "@/components/ProjectCard";

interface Project {
  id: string;
  title: string;
  month: number;
  year: number;
  short_description: string;
  category: string;
  image_url: string;
  slug: string;
  tags: string[];
}

interface RecentProjectsProps {
  currentProjectId: string;
}

export const RecentProjects = ({ currentProjectId }: RecentProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, month, year, short_description, category, image_url, slug, tags")
        .neq("id", currentProjectId)
        .order("year", { ascending: false })
        .order("month", { ascending: false })
        .limit(3);

      if (!error && data) {
        setProjects(data);
      }
    };

    fetchRecentProjects();
  }, [currentProjectId]);

  if (projects.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-heading mb-12">
        Recent Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            short_description={project.short_description}
            image={project.image_url}
            slug={project.slug}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
};
