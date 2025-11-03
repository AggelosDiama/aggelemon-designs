import { Hero } from "@/components/Hero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectsShowcase />
      <AboutSection />
      <Footer />
    </main>
  );
};

export default Index;
