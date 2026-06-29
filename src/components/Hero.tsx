import { useEffect, useState } from "react";
import profilePhoto from "@/assets/portfolio-pic-2.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/ProjectCard";

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
        .limit(6);
      if (!error && data) setProjects(data as FeaturedProject[]);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="px-4 pt-10 pb-16 animate-fade-in">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
        {/* Left: compact info column */}
        <aside className="lg:sticky lg:top-24 self-start flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
          <div className="w-40 h-40 md:w-48 md:h-48">
            <img
              src={profilePhoto}
              alt="Aggelos Diamantopoulos - Lemon"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-heading leading-tight">
              I'm Aggelos, you can call me <span className="highlight-heading">Lemon</span>
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-heading">
              <span className="highlight-heading">AI Dev. meets UX.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Computer Engineer & UX Specialist building intelligent products that bridge{" "}
              <span className="highlight-text font-semibold text-heading">user needs</span> and{" "}
              <span className="highlight-text font-semibold text-heading">technical possibility</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full">
            <Button
              className="bg-lemon hover:bg-lemon/90 text-heading font-bold text-sm px-5 py-2.5 h-auto w-full"
              onClick={() => navigate("/ai-engineering")}
            >
              View my AI Projects
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-semibold px-5 py-2.5 h-auto border border-border hover:text-lemon w-full"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Let's Connect
            </Button>
          </div>
        </aside>

        {/* Right: projects stacked one per row */}
        <div className="space-y-5">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-4 flex gap-5">
                <Skeleton className="w-48 h-32 rounded-xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : projects.length === 0 ? (
            <div className="text-center text-muted-foreground py-16 border border-dashed border-border rounded-2xl">
              No featured projects yet.
            </div>
          ) : (
            projects.map((project, index) => (
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
                  showCategory={true}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
