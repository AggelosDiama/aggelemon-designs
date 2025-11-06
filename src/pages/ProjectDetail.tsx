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
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {contentBlocks.length > 0 ? (
          <ContentBlockRenderer blocks={contentBlocks} />
        ) : (
          project.full_content && (
            <div className="max-w-4xl mx-auto px-4">
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed">{project.full_content}</p>
              </div>
            </div>
          )
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 mt-12">
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
      </section>

      <RecentProjects currentProjectId={project.id} />
      
      <Footer />
    </main>
  );
};

export default ProjectDetail;
