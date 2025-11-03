import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProjectsShowcase />
      <AboutSection />
      <Footer />
    </main>
  );
};

export default Index;
