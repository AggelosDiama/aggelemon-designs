import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-bold text-heading">Let's Connect</h3>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/aggelos-diamantopoulos/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 py-4 rounded-lg bg-card border border-border hover:border-lemon hover:shadow-lg transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-8 h-8 text-heading group-hover:text-lemon transition-colors shrink-0" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-lemon transition-colors">
                  LinkedIn
                </p>
                <p className="text-lg font-bold text-heading group-hover:translate-x-1 transition-transform">
                  Connect
                </p>
              </div>
            </a>

            <a
              href="mailto:aggelosdiama@gmail.com"
              className="group flex items-center gap-4 px-6 py-4 rounded-lg bg-card border border-border hover:border-lemon hover:shadow-lg transition-all duration-300"
              aria-label="Email Contact"
            >
              <Mail className="w-8 h-8 text-heading group-hover:text-lemon transition-colors shrink-0" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-lemon transition-colors">
                  Email
                </p>
                <p className="text-lg font-bold text-heading group-hover:translate-x-1 transition-transform">
                  Send a Message
                </p>
              </div>
            </a>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Made by <span className="highlight">Lemon</span> 🍋
          </p>
        </div>
      </div>
    </footer>
  );
};
