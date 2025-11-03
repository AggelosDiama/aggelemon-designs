import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "AI Tutor Platform",
    tags: ["UI/UX", "EdTech", "2025"],
    slug: "ai-tutor",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
  {
    title: "Travel App Concept",
    tags: ["UI/UX", "Mobile", "2024"],
    slug: "travel-app",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
  },
  {
    title: "MakeDis.Count Platform",
    tags: ["Branding", "UI/UX", "2024"],
    slug: "makediscount",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Team Website Concept",
    tags: ["Web Design", "UI/UX", "2025"],
    slug: "team-website",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
];

export const ProjectsShowcase = () => {
  return (
    <section className="py-20 px-4 animate-fade-in">
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
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
