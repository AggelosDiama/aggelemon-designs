import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Github } from "lucide-react";

interface Project {
  title: string;
  tags: string[];
  slug: string;
  image_url: string;
  short_description: string;
}

const AITools = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("title, tags, slug, image_url, short_description")
      .eq("category", "AI Engineering")
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
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-12 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-12" />
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-5 border border-border">
                  <Skeleton className="w-48 h-32 sm:w-52 md:w-60 shrink-0 rounded-xl" />
                  <div className="flex-1 space-y-3 py-1">
                    <Skeleton className="h-6 w-2/3" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
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
            AI Engineering
          </h1>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Building intelligent systems, AI-powered tools, and autonomous agents that solve real problems.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12 p-6 rounded-lg bg-card border border-border">
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">
                Explore my code, experiments, and open-source contributions on GitHub.
              </p>
              <Button asChild className="bg-lemon hover:bg-lemon/90 text-white font-bold">
                <a href="https://github.com/AggelosDiama" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  My GitHub
                </a>
              </Button>
            </div>
          </div>
          {projects.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="flex justify-center gap-4">
                <Bot className="w-16 h-16 text-muted-foreground/40" />
                <Sparkles className="w-12 h-12 text-lemon/40 -mt-2" />
              </div>
              <h3 className="text-2xl font-bold text-heading">Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                AI engineering projects are in the works. Check back soon for autonomous agents, intelligent workflows, and more.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {projects.map((project, index) => (
                <div
                  key={project.slug}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
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

export default AITools;
