import { Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer id="contact" className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-heading">
            Let's Connect
          </h3>
          
          <div className="flex justify-center gap-6">
            <motion.a
              href="https://www.linkedin.com/in/aggelos-diamantopoulos/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-card hover:bg-muted transition-all duration-300 group"
              aria-label="LinkedIn Profile"
              initial={{ scale: 1 }}
              whileInView={{ 
                scale: [1, 1.15, 1],
                transition: { duration: 0.6, times: [0, 0.5, 1] }
              }}
              viewport={{ once: true, margin: "0px" }}
            >
              <Linkedin className="w-8 h-8 text-heading group-hover:text-lemon transition-colors" />
            </motion.a>
            
            <motion.a
              href="mailto:aggelosdiama@gmail.com"
              className="p-4 rounded-lg bg-card hover:bg-muted transition-all duration-300 group"
              aria-label="Email Contact"
              initial={{ scale: 1 }}
              whileInView={{ 
                scale: [1, 1.15, 1],
                transition: { duration: 0.6, times: [0, 0.5, 1], delay: 0.1 }
              }}
              viewport={{ once: true, margin: "0px" }}
            >
              <Mail className="w-8 h-8 text-heading group-hover:text-lemon transition-colors" />
            </motion.a>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Made by <span className="highlight">Lemon</span> 🍋
          </p>
        </div>
      </div>
    </footer>
  );
};
