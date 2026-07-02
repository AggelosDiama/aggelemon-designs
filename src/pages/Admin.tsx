import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";
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
import {
  ContentBlockEditor,
  ContentBlock,
} from "@/components/admin/ContentBlockEditor";

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
  hidden: boolean;
  draft: boolean;
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
  const [category, setCategory] = useState<string>("Product & UI/UX");
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tags, setTags] = useState("");
  const [slug, setSlug] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [hidden, setHidden] = useState(false);
  const [draft, setDraft] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    localStorage.getItem("adminFilterCategory") || null
  );
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured" | "non-featured">(
    (localStorage.getItem("adminFilterFeatured") as "all" | "featured" | "non-featured") || "all"
  );
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "visible" | "hidden">(
    (localStorage.getItem("adminFilterVisibility") as "all" | "visible" | "hidden") || "all"
  );
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">(
    (localStorage.getItem("adminSortOrder") as "newest" | "oldest") || "newest"
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem("adminSearchQuery") || ""
  );

  const MAX_SHORT_DESC_CHARS = 300;

  useEffect(() => {
    checkUser();
    fetchProjects();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
    setCategory("Product & UI/UX");
    setFeatured(false);
    setImageUrl("");
    setImageFile(null);
    setTags("");
    setSlug("");
    setProjectLink("");
    setContentBlocks([]);
    setHidden(false);
    setDraft(false);
    setEditingProject(null);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2)}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(fileName, file);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("project-images").getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();

    // Validate short description character count
    if (shortDescription.length > MAX_SHORT_DESC_CHARS) {
      toast({
        variant: "destructive",
        title: "Short description too long",
        description: `Please keep it to ${MAX_SHORT_DESC_CHARS} characters or less. Current: ${shortDescription.length} characters.`,
      });
      return;
    }

    let finalImageUrl = imageUrl;

    // Upload image file if provided
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}-${Date.now()}.${fileExt}`;
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
      const {
        data: { publicUrl },
      } = supabase.storage.from("project-images").getPublicUrl(filePath);

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
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      project_link: projectLink || null,
      hidden: editingProject ? hidden : false,
      draft: editingProject ? draft : isDraft,
    };

    let projectId = editingProject?.id;

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
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([projectData])
        .select()
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error creating project",
          description: error.message,
        });
        return;
      }
      projectId = data.id;
    }

    // Save content blocks
    if (projectId && contentBlocks.length > 0) {
      // Delete existing blocks for this project
      await supabase
        .from("project_content_blocks")
        .delete()
        .eq("project_id", projectId);

      // Insert new blocks
      const blocksToInsert = contentBlocks.map((block) => ({
        project_id: projectId,
        block_type: block.block_type,
        order_index: block.order_index,
        content: block.content,
      }));

      const { error: blocksError } = await supabase
        .from("project_content_blocks")
        .insert(blocksToInsert);

      if (blocksError) {
        toast({
          variant: "destructive",
          title: "Error saving content blocks",
          description: blocksError.message,
        });
        return;
      }
    }

    toast({
      title: editingProject ? "Project updated!" : (isDraft ? "Draft saved!" : "Project created!"),
      description: editingProject 
        ? "The project has been successfully updated." 
        : (isDraft 
          ? "Draft saved. Edit and click 'Add Project' to publish." 
          : "The project has been successfully created."),
    });
    resetForm();
    fetchProjects();
  };

  const handleEdit = async (project: Project) => {
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
    setProjectLink(project.project_link || "");
    setHidden(project.hidden);
    setDraft(project.draft);

    // Fetch content blocks
    const { data: blocks } = await supabase
      .from("project_content_blocks")
      .select("*")
      .eq("project_id", project.id)
      .order("order_index");

    if (blocks) {
      setContentBlocks(blocks as ContentBlock[]);
    }

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

  const handleToggleVisibility = async (project: Project) => {
    const { error } = await supabase
      .from("projects")
      .update({ hidden: !project.hidden })
      .eq("id", project.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating project",
        description: error.message,
      });
    } else {
      toast({
        title: project.hidden ? "Project shown" : "Project hidden",
        description: `The project is now ${project.hidden ? "visible" : "hidden"}.`,
      });
      fetchProjects();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Persist filter states
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("adminFilterCategory", selectedCategory);
    } else {
      localStorage.removeItem("adminFilterCategory");
    }
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem("adminFilterFeatured", featuredFilter);
  }, [featuredFilter]);

  useEffect(() => {
    localStorage.setItem("adminFilterVisibility", visibilityFilter);
  }, [visibilityFilter]);

  useEffect(() => {
    localStorage.setItem("adminSortOrder", sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    localStorage.setItem("adminSearchQuery", searchQuery);
  }, [searchQuery]);

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDescription = project.short_description?.toLowerCase().includes(query);
        const matchesTags = project.tags?.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && project.category !== selectedCategory) return false;

      // Featured filter
      if (featuredFilter === "featured" && !project.featured) return false;
      if (featuredFilter === "non-featured" && project.featured) return false;

      // Visibility filter
      if (visibilityFilter === "visible" && project.hidden) return false;
      if (visibilityFilter === "hidden" && !project.hidden) return false;

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1).getTime();
      const dateB = new Date(b.year, b.month - 1).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
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
          <form
            onSubmit={handleSubmit}
            className="bg-card p-6 rounded-lg shadow-sm mb-12 space-y-6"
          >
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
                <Select
                  value={month.toString()}
                  onValueChange={(v) => setMonth(parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <SelectItem key={m} value={m.toString()}>
                        {new Date(2000, m - 1).toLocaleString("default", {
                          month: "long",
                        })}
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
                    <SelectItem value="Product & UI/UX">Product & UI/UX</SelectItem>
                    <SelectItem value="Visual & Branding">Visual & Branding</SelectItem>
                    <SelectItem value="AI Engineering">AI Engineering</SelectItem>
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
                      {imageFile
                        ? `Selected: ${imageFile.name}`
                        : "Current image URL set"}
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
              <Label htmlFor="shortDescription">
                Short Description * (max {MAX_SHORT_DESC_CHARS} characters)
              </Label>
              <Textarea
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
                rows={3}
                placeholder="A brief 2-3 sentence description of the project"
              />
              <p
                className={`text-sm ${
                  shortDescription.length > MAX_SHORT_DESC_CHARS
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {shortDescription.length} / {MAX_SHORT_DESC_CHARS} characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">
                Tools, Technologies & Methodologies (comma-separated) *
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Figma, Adobe XD, React, TypeScript, Agile"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectLink">Project Link (optional)</Label>
              <Input
                id="projectLink"
                type="url"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                placeholder="https://example.com"
              />
              <p className="text-xs text-muted-foreground">
                If provided, a "Check it here" button will appear on the project
                page
              </p>
            </div>

            <div className="space-y-4">
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
              {editingProject && (
                <>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="draft"
                      checked={draft}
                      onCheckedChange={(checked) => setDraft(checked as boolean)}
                    />
                    <Label htmlFor="draft" className="cursor-pointer">
                      Draft (page generated but not public)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hidden"
                      checked={hidden}
                      onCheckedChange={(checked) => setHidden(checked as boolean)}
                    />
                    <Label htmlFor="hidden" className="cursor-pointer">
                      Hide Project (not visible on public portfolio)
                    </Label>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-border pt-6">
              <ContentBlockEditor
                blocks={contentBlocks}
                onChange={setContentBlocks}
                onImageUpload={uploadImage}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingProject ? "Update Project" : "Add Project"}
              </Button>
              {!editingProject && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={(e) => handleSubmit(e as any, true)}
                >
                  Save as Draft
                </Button>
              )}
              {editingProject && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>

          {/* Projects List */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-heading">All Projects</h2>
              
              {/* Filters */}
              <div className="bg-card p-4 rounded-lg shadow-sm space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Search</Label>
                  <Input
                    type="text"
                    placeholder="Search by title, tags, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md"
                  />
                </div>

                {/* Category Chips */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Product & UI/UX", "Visual & Branding", "AI Engineering"].map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className="transition-all"
                      >
                        {cat}
                      </Button>
                    ))}
                    {selectedCategory && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className="text-muted-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>

                {/* Toggles and Sort */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Featured</Label>
                    <Select value={featuredFilter} onValueChange={(v: any) => setFeaturedFilter(v)}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="featured">Featured Only</SelectItem>
                        <SelectItem value="non-featured">Non-Featured</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Visibility</Label>
                    <Select value={visibilityFilter} onValueChange={(v: any) => setVisibilityFilter(v)}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="visible">Visible Only</SelectItem>
                        <SelectItem value="hidden">Hidden Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Sort By</Label>
                    <Select value={sortOrder} onValueChange={(v: any) => setSortOrder(v)}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Showing {filteredProjects.length} of {projects.length} projects
                </div>
              </div>
            </div>

            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card p-6 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-heading">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-xs bg-lemon text-black px-2 py-1 rounded font-medium">
                        Featured
                      </span>
                    )}
                    {project.draft && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded font-medium border">
                        Draft
                      </span>
                    )}
                    {project.hidden && (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded font-medium border border-destructive/20">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.category} •{" "}
                    {new Date(project.year, project.month - 1).toLocaleString(
                      "default",
                      { month: "long", year: "numeric" }
                    )}
                  </p>
                  <p className="text-foreground">{project.short_description}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Link to={`/projects/${project.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={project.hidden ? "default" : "secondary"}
                    size="sm"
                    onClick={() => handleToggleVisibility(project)}
                  >
                    {project.hidden ? "Show" : "Hide"}
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
