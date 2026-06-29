import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsCTASection } from "@/components/ProjectsCTASection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProjectsCTASection />
      <AboutSection />
      <Footer />
    </main>
  );
};

export default Index;
