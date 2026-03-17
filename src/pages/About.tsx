import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutPageContent, aboutSections } from "@/components/AboutPageContent";
import { cn } from "@/lib/utils";

const About = () => {
  const [activeSection, setActiveSection] = useState(aboutSections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    aboutSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // const yOffset = -10; // Offset in pixels (e.g., 24px higher)
      // const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-24 self-start py-20 pl-4">
          <nav className="space-y-1">
            {aboutSections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200",
                  activeSection === id
                    ? "text-heading font-semibold bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <AboutPageContent />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default About;
