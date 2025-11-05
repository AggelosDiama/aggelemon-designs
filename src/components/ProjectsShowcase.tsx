import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCard } from "./ProjectCard";

interface Project {
  title: string;
  tags: string[];
  slug: string;
  image_url: string;
  short_description: string;
  category: string;
}

export const ProjectsShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("title, tags, slug, image_url, short_description, category")
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data.map(p => ({ ...p, image: p.image_url })));
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-20 px-4 animate-fade-in bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 px-4 animate-fade-in bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-heading text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} image={project.image_url} short_description={project.short_description} category={project.category} showCategory={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
