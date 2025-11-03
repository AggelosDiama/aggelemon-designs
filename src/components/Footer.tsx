import { GlassCard } from "./GlassCard";
import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="text-center space-y-6">
          <h3 className="text-2xl font-bold">
            Let's <span className="text-lemon">Connect</span>
          </h3>
          
          <div className="flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/aggelos-diamantopoulos/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-xl hover:scale-110 hover:lemon-glow transition-all duration-300 group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-8 h-8 text-lemon group-hover:text-lemon-glow" />
            </a>
            
            <a
              href="mailto:aggelosdiama@gmail.com"
              className="glass p-4 rounded-xl hover:scale-110 hover:lemon-glow transition-all duration-300 group"
              aria-label="Email Contact"
            >
              <Mail className="w-8 h-8 text-lemon group-hover:text-lemon-glow" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground pt-4 border-t border-border/50">
            Made by Lemon 🍋
          </p>
        </GlassCard>
      </div>
    </footer>
  );
};
