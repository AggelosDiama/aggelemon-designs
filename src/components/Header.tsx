import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projectLinks = [
  { name: "AI Engineering", path: "/ai-engineering" },
  { name: "Product & UI/UX", path: "/product-uiux" },
  { name: "Visual & Branding", path: "/visual-identity" },
];

const CV_URL = "https://linkly.link/2KW66";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const projectsActive = projectLinks.some((l) => location.pathname === l.path);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink
            to="/"
            className="flex flex-col leading-none hover:text-lemon transition-colors"
          >
            <span className="text-2xl font-bold text-heading">Lemon 🍋</span>
            <span className="text-xs font-medium text-muted-foreground tracking-wide">
              Aggelos Diamantopoulos
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "group flex items-center gap-1 text-base font-medium transition-all duration-200 outline-none",
                  "hover:text-lemon",
                  projectsActive ? "text-lemon" : "text-muted-foreground"
                )}
              >
                My Projects
                <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[14rem]">
                {projectLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === link.path && "text-lemon"
                      )}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              to="/about"
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
              About
            </NavLink>

            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-lemon text-heading text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              See my CV
            </a>
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
          <nav className="md:hidden py-4 space-y-1 animate-fade-in">
            <p className="px-4 pt-2 pb-1 text-xs uppercase tracking-wider text-muted-foreground">
              My Projects
            </p>
            {projectLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "block px-6 py-2 text-base font-medium transition-colors rounded-md",
                    isActive
                      ? "bg-lemon/10 text-lemon"
                      : "text-muted-foreground hover:bg-muted hover:text-lemon"
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  "block px-4 py-2 mt-2 text-base font-medium transition-colors rounded-md",
                  isActive
                    ? "bg-lemon/10 text-lemon"
                    : "text-muted-foreground hover:bg-muted hover:text-lemon"
                )
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-lemon text-heading text-sm font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="w-4 h-4" />
              See my CV
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};
