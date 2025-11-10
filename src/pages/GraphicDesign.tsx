import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";

interface Project {
  title: string;
  tags: string[];
  slug: string;
  image_url: string;
  short_description: string;
}

const GraphicDesign = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("title, tags, slug, image_url, short_description")
      .eq("category", "Graphic Design")
      .eq("hidden", false)
      .eq("draft", false)
      .order("year", { ascending: false })
      .order("month", { ascending: false });

    if (!error && data) {
      setProjects(data.map(p => ({ ...p, image: p.image_url })));
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-heading text-center mb-4">
            Graphic Design
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Bold visual storytelling through graphics, branding, and creative design.
          </p>
          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground">No projects found in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.slug}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard {...project} image={project.image_url} short_description={project.short_description} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default GraphicDesign;
