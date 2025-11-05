import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [shortDescription, setShortDescription] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [category, setCategory] = useState<string>("UI/UX Design");
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tags, setTags] = useState("");
  const [slug, setSlug] = useState("");

  const MAX_SHORT_DESC_WORDS = 30;

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  useEffect(() => {
    checkUser();
    fetchProjects();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
      return;
    }
    setUser(user);
    setLoading(false);
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error fetching projects",
        description: error.message,
      });
    } else {
      setProjects(data || []);
    }
  };

  const resetForm = () => {
    setTitle("");
    setMonth(1);
    setYear(new Date().getFullYear());
    setShortDescription("");
    setFullContent("");
    setCategory("UI/UX Design");
    setFeatured(false);
    setImageUrl("");
    setImageFile(null);
    setTags("");
    setSlug("");
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate short description word count
    const wordCount = getWordCount(shortDescription);
    if (wordCount > MAX_SHORT_DESC_WORDS) {
      toast({
        variant: "destructive",
        title: "Short description too long",
        description: `Please keep it to ${MAX_SHORT_DESC_WORDS} words or less. Current: ${wordCount} words.`,
      });
      return;
    }

    let finalImageUrl = imageUrl;

    // Upload image file if provided
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError, data } = await supabase.storage
        .from("project-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        toast({
          variant: "destructive",
          title: "Error uploading image",
          description: uploadError.message,
        });
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    const projectData = {
      title,
      month,
      year,
      short_description: shortDescription,
      full_content: fullContent,
      category,
      featured,
      image_url: finalImageUrl,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };

    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating project",
          description: error.message,
        });
      } else {
        toast({
          title: "Project updated!",
          description: "The project has been successfully updated.",
        });
        resetForm();
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from("projects").insert([projectData]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error creating project",
          description: error.message,
        });
      } else {
        toast({
          title: "Project created!",
          description: "The project has been successfully added.",
        });
        resetForm();
        fetchProjects();
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setMonth(project.month);
    setYear(project.year);
    setShortDescription(project.short_description);
    setFullContent(project.full_content);
    setCategory(project.category);
    setFeatured(project.featured);
    setImageUrl(project.image_url);
    setImageFile(null);
    setTags(project.tags.join(", "));
    setSlug(project.slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error deleting project",
        description: error.message,
      });
    } else {
      toast({
        title: "Project deleted",
        description: "The project has been removed.",
      });
      fetchProjects();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-heading">CMS Admin</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          {/* Project Form */}
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-sm mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-heading mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="auto-generated from title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">Month *</Label>
                <Select value={month.toString()} onValueChange={(v) => setMonth(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <SelectItem key={m} value={m.toString()}>
                        {new Date(2000, m - 1).toLocaleString("default", { month: "long" })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                    <SelectItem value="AI Tools">AI Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageFile">Project Image</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setImageUrl(""); // Clear URL if file is selected
                    }
                  }}
                />
                {(imageUrl || imageFile) && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      {imageFile ? `Selected: ${imageFile.name}` : "Current image URL set"}
                    </p>
                    {imageUrl && !imageFile && (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description * (max {MAX_SHORT_DESC_WORDS} words)</Label>
              <Textarea
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
                rows={3}
              />
              <p className={`text-sm ${getWordCount(shortDescription) > MAX_SHORT_DESC_WORDS ? 'text-destructive' : 'text-muted-foreground'}`}>
                {getWordCount(shortDescription)} / {MAX_SHORT_DESC_WORDS} words
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullContent">Full Content (Markdown) *</Label>
              <Textarea
                id="fullContent"
                value={fullContent}
                onChange={(e) => setFullContent(e.target.value)}
                required
                rows={10}
                placeholder="Use markdown formatting: ## Headings, **bold**, *italic*, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tools Used (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Figma, Adobe XD, React, TypeScript"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={featured}
                onCheckedChange={(checked) => setFeatured(checked as boolean)}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Project (show on homepage)
              </Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingProject ? "Update Project" : "Add Project"}
              </Button>
              {editingProject && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>

          {/* Projects List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-heading">All Projects</h2>
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-card p-6 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-heading mb-2">
                    {project.title}
                    {project.featured && (
                      <span className="ml-2 text-xs bg-lemon text-black px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.category} • {new Date(project.year, project.month - 1).toLocaleString("default", { month: "long", year: "numeric" })}
                  </p>
                  <p className="text-foreground">{project.short_description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Admin;
