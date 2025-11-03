import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const GraphicDesign = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-heading text-center mb-4">
            Graphic Design
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Bold visual storytelling through graphics, branding, and creative design.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for graphic design projects */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Project coming soon</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default GraphicDesign;
