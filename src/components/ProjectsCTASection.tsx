import { useNavigate } from "react-router-dom";
import { Bot, Layout, Palette, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "AI Engineering",
    description: "Intelligent systems, agents, and AI-powered tools.",
    path: "/ai-engineering",
    icon: Bot,
  },
  {
    title: "Product & UI/UX",
    description: "User-centered experiences built on research and empathy.",
    path: "/product-uiux",
    icon: Layout,
  },
  {
    title: "Visual & Branding",
    description: "Bold visual storytelling and creative design leadership.",
    path: "/visual-branding",
    icon: Palette,
  },
];

export const ProjectsCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-16 animate-fade-in">
      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Explore my work
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dive deeper into each category and see how I blend intelligence, design, and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="group relative text-left bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-lemon/40 hover:shadow-lg transition-all duration-300 flex flex-col items-start gap-4"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-xl bg-lemon/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-lemon" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-heading transition-colors" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-heading group-hover:underline underline-offset-4 decoration-2 decoration-lemon transition-all">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
