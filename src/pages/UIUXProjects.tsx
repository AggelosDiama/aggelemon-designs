import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";

const uiuxProjects = [
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

const UIUXProjects = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-heading text-center mb-4">
            UI/UX Projects
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            User-centered digital experiences crafted with attention to detail and seamless interactions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uiuxProjects.map((project, index) => (
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
      <Footer />
    </main>
  );
};

export default UIUXProjects;
