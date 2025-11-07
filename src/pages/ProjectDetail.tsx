import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ContentBlockRenderer } from "@/components/project/ContentBlockRenderer";
import { RecentProjects } from "@/components/project/RecentProjects";
import ReactMarkdown from "react-markdown";

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
  project_link: string | null;
}

interface ContentBlock {
  id: string;
  block_type: string;
  order_index: number;
  content: any;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
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
        setLoading(false);
        return;
      }

      setProject(data);

      // Fetch content blocks
      const { data: blocks, error: blocksError } = await supabase
        .from("project_content_blocks")
        .select("*")
        .eq("project_id", data.id)
        .order("order_index");

      if (!blocksError && blocks) {
        setContentBlocks(blocks);
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
      
      <section className="pb-20">
        <ProjectHero
          title={project.title}
          shortDescription={project.short_description}
          coverImage={project.image_url}
          projectLink={project.project_link || undefined}
          category={project.category}
          month={project.month}
          year={project.year}
        />

        <div id="project-content" className="max-w-4xl mx-auto px-4 mb-12 pt-12">
          {contentBlocks.length > 0 ? (
            <ContentBlockRenderer blocks={contentBlocks} />
          ) : (
            project.full_content && (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-heading mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-heading mb-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-foreground leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-foreground space-y-2 mb-4">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-foreground space-y-2 mb-4">
                        {children}
                      </ol>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-heading">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {project.full_content}
                </ReactMarkdown>
              </div>
            )
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-heading mb-4">Tools, Technologies & Methodologies</h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-lg bg-primary/10 text-foreground border border-primary/20"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <RecentProjects currentProjectId={project.id} />
      
      <Footer />
    </main>
  );
};

export default ProjectDetail;
