import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "AI Engineering & Agents", path: "/ai-engineering" },
  { name: "Product & UI/UX", path: "/product-uiux" },
  { name: "Visual Identity & Branding", path: "/visual-identity" },
  { name: "About Me", path: "/about" },
  { name: "Contact", path: "#contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink 
            to="/" 
            className="text-2xl font-bold text-heading hover:text-lemon transition-colors"
          >
            Lemon 🍋
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.path === "#contact") {
                return (
                  <Button
                    key={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-lemon hover:bg-lemon/90 text-grey font-bold"
                  >
                    {link.name}
                  </Button>
                );
              }
              
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "text-base font-medium transition-all duration-200 relative",
                      "hover:text-lemon",
                      "after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0",
                      "after:bg-lemon after:origin-bottom-right after:transition-transform after:duration-300",
                      "after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left",
                      isActive
                        ? "text-lemon after:scale-x-100"
                        : "text-muted-foreground"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          <button
            className="md:hidden p-2 text-heading hover:text-lemon transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 animate-fade-in">
            {navLinks.map((link) => {
              if (link.path === "#contact") {
                return (
                  <button
                    key={link.path}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium transition-colors rounded-md text-muted-foreground hover:bg-muted hover:text-lemon"
                  >
                    {link.name}
                  </button>
                );
              }
              
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-2 text-base font-medium transition-colors rounded-md",
                      isActive
                        ? "bg-lemon/10 text-lemon"
                        : "text-muted-foreground hover:bg-muted hover:text-lemon"
                    )
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
