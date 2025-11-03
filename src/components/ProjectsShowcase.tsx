import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "AI Tutor Platform",
    tags: ["UI/UX", "EdTech", "2025"],
    slug: "ai-tutor",
  },
  {
    title: "Travel App Concept",
    tags: ["UI/UX", "Mobile", "2024"],
    slug: "travel-app",
  },
  {
    title: "MakeDis.Count Platform",
    tags: ["Branding", "UI/UX", "2024"],
    slug: "makediscount",
  },
  {
    title: "Team Website Concept",
    tags: ["Web Design", "UI/UX", "2025"],
    slug: "team-website",
  },
];

export const ProjectsShowcase = () => {
  return (
    <section className="py-20 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Featured <span className="text-lemon">Projects</span>
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
