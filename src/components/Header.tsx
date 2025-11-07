import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "UI/UX Projects", path: "/uiux-projects" },
  { name: "Graphic Design", path: "/graphic-design" },
  { name: "AI & Tools", path: "/ai-tools" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "#contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="text-2xl font-bold text-heading hover:text-lemon transition-colors"
          >
            Lemon 🍋
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
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
                onClick={(e) => {
                  if (link.path === "#contact") {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-heading hover:text-lemon transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
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
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.path === "#contact") {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
