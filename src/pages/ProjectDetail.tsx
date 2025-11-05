import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  month: number;
  year: number;
  short_description: string;
  full_content: string;
  category: string;
  featured: boolean;
  image_url: string;
  tags: string[];
  slug: string;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error loading project",
          description: error.message,
        });
        navigate("/");
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    if (slug) {
      fetchProject();
    }
  }, [slug, navigate, toast]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lemon mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading project...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lemon hover:text-lemon-glow transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <GlassCard glow>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-lemon">{project.title}</span>
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
                {project.category}
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-lemon/10 text-foreground border border-lemon/20">
                {new Date(project.year, project.month - 1).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {project.short_description}
            </p>
          </GlassCard>

          {project.image_url && (
            <GlassCard>
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full rounded-lg"
              />
            </GlassCard>
          )}

          <GlassCard>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-lemon mb-4 mt-6">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-lemon mb-4 mt-6">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">{children}</ol>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-foreground">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-lemon pl-4 italic text-muted-foreground my-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-lemon/10 px-2 py-1 rounded text-sm font-mono text-foreground">
                      {children}
                    </code>
                  ),
                }}
              >
                {project.full_content}
              </ReactMarkdown>
            </div>
          </GlassCard>

          {project.tags && project.tags.length > 0 && (
            <GlassCard>
              <h2 className="text-2xl font-bold text-lemon mb-4">Tools Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full bg-lemon/10 text-foreground border border-lemon/20"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProjectDetail;
