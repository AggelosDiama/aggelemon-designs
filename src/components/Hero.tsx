import { useEffect, useState } from "react";
import profilePhoto from "@/assets/portfolio-pic-2.png";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCard } from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedProject {
  title: string;
  tags: string[];
  slug: string;
  image_url: string;
  short_description: string;
  category: string;
}

export const Hero = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("title, tags, slug, image_url, short_description, category")
        .eq("featured", true)
        .eq("hidden", false)
        .eq("draft", false)
        .order("created_at", { ascending: false })
        .limit(4);
      if (!error && data) setProjects(data as FeaturedProject[]);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="min-h-screen flex flex-col px-4 pt-12 pb-8 animate-fade-in relative">
      <div className="max-w-7xl w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left column: image on top + info */}
        <div className="flex flex-col items-center lg:items-start space-y-6">
          <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
            <img
              src={profilePhoto}
              alt="Aggelos Diamantopoulos - Lemon"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          <div className="text-center lg:text-left space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-heading">
              I'm Aggelos, you can call me <span className="highlight-heading">Lemon</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-heading">
              Making Intelligent Products: <br />
              <span className="highlight-heading">Where AI Dev. meets UX.</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              I’ve always been the 'tech guy' with a Computer Engineering background, but realized that the most powerful technology is{" "}
              <span className="highlight-text font-semibold text-heading">deeply human</span>. To me, it’s not just about code or algorithms. It’s about{" "}
              <span className="highlight-text font-semibold text-heading">why and how people using them</span> and the complex problems we try to solve.
              <br />
              <br />
              Whether I’m building a UI or an AI agent, I’m driven to find smarter ways to{" "}
              <span className="highlight-text font-semibold text-heading">bridge the gap between user needs and technical possibility.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              <Button
                className="bg-lemon hover:bg-lemon/90 text-heading font-bold text-base px-6 py-3 h-auto"
                onClick={() => navigate("/ai-engineering")}
              >
                View my AI Projects
              </Button>
              <Button
                variant="ghost"
                className="text-base font-semibold px-6 py-3 h-auto border border-border hover:text-lemon"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/aggelos-diamantopoulos/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Let's Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right column: Featured Projects */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-heading mb-6 text-center lg:text-left">
            <span className="highlight-heading">Featured Projects</span>
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-lg overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-lg">
              No featured projects yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div
                  key={project.slug}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <ProjectCard
                    title={project.title}
                    tags={project.tags}
                    slug={project.slug}
                    image={project.image_url}
                    short_description={project.short_description}
                    category={project.category}
                    showCategory
                    compact
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center gap-2 pt-10 animate-fade-in">
        <p className="text-sm text-muted-foreground">More about me</p>
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};
