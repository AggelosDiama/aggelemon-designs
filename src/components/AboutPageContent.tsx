import { Separator } from "@/components/ui/separator";
import cvQRCode from "@/assets/cv-qr-code.png";
import aboutPhoto from "@/assets/aboutme-photo.png";

const designSkills = [
  "UI/UX Design",
  "Prototyping",
  "User Research",
  "Journey Mapping",
  "Usability Testing",
  "Design Systems",
  "Responsive Design",
  "Accessibility & Inclusive Design",
  "Figma",
  "Adobe Creative Suite",
  "Affinity Suite",
];

const tools = [
  "AI Agents",
  "RAG Systems",
  "LLM Orchestration",
  "Docker",
  "HTML/CSS",
  "JavaScript",
  "Python",
];

const lemonFacts = [
  "I play Pokémon on my Switch; my childhood love for the series is still strong.",
  "Improv theater is a weekly habit that helps me relax, reset, and stay creative.",
  "I listen to rock and metal and always hit shuffle instead of making playlists.",
  "I am a big Marvel fan and never miss a new movie.",
  "When I start making puns, it means I'm comfortable with you.",
];

const educationItems = [
  {
    title: "MEng in Computer Engineering",
    institution: "University of Patras (CEID)",
    detail: "Thesis: Designing and developing an AI-powered tutoring experience for coding assignments.",
  },
  {
    title: "AI Engineering Academy",
    institution: "Powered by Accenture & Code.Hub",
    detail: "Intensive training on LLM Orchestration, RAG pipelines, and Autonomous Agents.",
  },
  {
    title: "Google UX Design Professional Certificate",
    institution: "Coursera",
    detail: "Comprehensive training in User Research, Usability Testing, and Design Thinking.",
  },
  {
    title: "Generative AI Technologies & Tools",
    institution: "ReGeneration & Code.Hub",
    detail: "Specialized training in applying AI across critical sectors.",
  },
];

export const aboutSections = [
  { id: "professional-story", label: "Professional Story" },
  { id: "my-approach", label: "My Approach" },
  { id: "education-training", label: "Education & Training" },
  { id: "skills-tools", label: "Skills & Tools" },
  { id: "lemon-facts", label: "Lemon Facts" },
  { id: "contact", label: "Contact" },
];

export const AboutPageContent = () => {
  return (
    <section className="py-20 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Opening Snapshot */}
        <div>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <p className="text-lg text-foreground leading-relaxed">
                <span className="text-2xl mr-2">👋</span>
                <span className="text-2xl font-bold text-heading">Hello!</span>
              </p>
              <p className="text-lg text-foreground leading-relaxed mt-4">
                I'm Aggelos, a <span className="highlight-text font-semibold text-heading">Computer Engineer</span> and <span className="highlight-text font-semibold text-heading">UX Specialist</span> building the next generation of AI products. 
                <br /><br />
                I don't just design interfaces. I develop the intelligent systems behind them. My goal is to <span className="highlight-text font-semibold text-heading">bridge the gap</span> between complex engineering and seamless user experiences.
              </p>
            </div>
            <img
              src={aboutPhoto}
              alt="Aggelos"
              className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-2 border-border shadow-lg flex-shrink-0"
            />
          </div>
        </div>

        <Separator className="my-12" />

        {/* Professional Story with QR Code */}
        <div id="professional-story" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-heading mb-4">Professional Story</h3>
              <h4 className="text-lg font-bold text-heading mb-3">The Engineering Foundation</h4>
              <p className="text-foreground leading-relaxed">
                My journey started at the University of Patras where I studied Computer Engineering. <span className="highlight-text font-semibold text-heading">I loved the logic of code, but there I also discovered a passion for design.</span> I was always curious about how people actually interact with technology. This led me to master UI/UX design through various online programs, such as the Google Professional Certificate program. <span className="highlight-text font-semibold text-heading">I wanted to merge technical power with visual clarity.</span>
              </p>
              <br />
              <h4 className="text-lg font-bold text-heading mb-3">The AI Breakthrough</h4>
              <p className="text-foreground leading-relaxed">
                When ChatGPT launched, it changed the trajectory of my work. I was already developing a RAG agent for my thesis, but the leap in Large Language Models allowed me to <span className="highlight-text font-semibold text-heading">pivot toward a more ambitious goal</span>. I built an AI Tutor Platform designed to provide students with personalized, real-time feedback on programming assignments. 
                <br /><br />
                To make sure the platform actually worked in a real-world setting, I conducted usability testing with university students to validate my design assumptions and refine how the AI communicated complex coding concepts. <span className="highlight-text font-semibold text-heading">This is where I first merged my engineering background with my UX skills to create a product that was not only functional but also genuinely helpful for users.</span>
              </p>
              <br />
              <h4 className="text-lg font-bold text-heading mb-3">Finding My Niche</h4>
              <p className="text-foreground leading-relaxed">
                As AI started <span className="highlight-text font-semibold text-heading">changing traditional UI/UX</span>, I saw a chance to return to my engineering roots. I joined Accenture's AI Engineering Academy to sharpen my skills in LLM orchestration, building agents and vector databases. <span className="highlight-text font-semibold text-heading">Today, I use my engineering background to build robust agents and my UX foundation to make sure they are actually easy for people to use.</span>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-card border border-border">
              <img src={cvQRCode} alt="CV QR Code" className="w-48 h-48 mb-3" />
              <p className="text-sm text-muted-foreground text-center">Scan QR for my CV</p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* My Approach */}
        <div id="my-approach" className="scroll-mt-24">
          <h3 className="text-2xl font-bold text-heading mb-4">My Approach</h3>
          <h4 className="text-lg font-bold text-heading mb-3">Requirements-Driven Architecture</h4>
          <p className="text-foreground leading-relaxed">
            Every project starts with a conversation. I first identify the client's resources and constraints, then <span className="highlight-text font-semibold text-heading">ask the right questions</span> to translate their vision into technical requirements. These requirements define the entire architecture, ensuring I choose the right technologies, whether it's a simple script or a complex agentic workflow.
          </p>
          <br />
          <h4 className="text-lg font-bold text-heading mb-3">Scalable Complexity</h4>
          <p className="text-foreground leading-relaxed">
            I believe the technology should match the need. If a project requires a simple interaction, <span className="highlight-text font-semibold text-heading">I keep it lightweight with a focused UI and precise prompting</span>. As the user's needs become more complex, I scale the solution, moving into custom JavaScript and more sophisticated logic to ensure the interface remains clear and the output remains powerful.
          </p>
          <br />
          <h4 className="text-lg font-bold text-heading mb-3">The Feedback Loop</h4>
          <p className="text-foreground leading-relaxed">
            <span className="highlight-text font-semibold text-heading">I build systems that learn.</span> My goal is to create products where the user can rate or critique the AI's performance. This feedback loop allows the system to refine its logic and build better, more accurate responses over time, turning a static tool into an evolving assistant.
          </p>
          <br />
          <h4 className="text-lg font-bold text-heading mb-3">Visual and Functional Iteration</h4>
          <p className="text-foreground leading-relaxed">
            I iterate based on how the product feels in a user's hands. This means I don't just "fix the code". I constantly refine the prompts and the typography. I focus on <span className="highlight-text font-semibold text-heading">how the information is presented, ensuring that even the most complex AI-generated data is easy to read.</span> 
          </p>
        </div>

        <Separator className="my-12" />

        {/* Education & Training */}
        <div id="education-training" className="scroll-mt-24">
          <h3 className="text-2xl font-bold text-heading mb-6">Education & Training</h3>
          <div className="space-y-6">
            {educationItems.map((item, index) => (
              <div key={index} className="p-5 rounded-lg bg-card border border-border">
                <h4 className="text-lg font-bold text-heading">{item.title}</h4>
                <p className="text-sm text-muted-foreground font-mono mt-1">{item.institution}</p>
                <p className="text-foreground leading-relaxed mt-2">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Skills & Lemon Facts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills & Tools as Chips */}
          <div id="skills-tools" className="scroll-mt-24">
            <h3 className="text-2xl font-bold text-heading mb-4">Skills & Tools</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {designSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm rounded-full bg-muted text-foreground border border-border font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-sm rounded-full bg-card text-foreground border border-border font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Lemon Facts */}
          <div id="lemon-facts" className="scroll-mt-24">
            <h3 className="text-2xl font-bold text-heading mb-4">
              🍋 <span className="highlight-heading">Lemon</span> Facts
            </h3>
            <div className="space-y-4">
              {lemonFacts.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <span className="text-2xl">🍋</span>
                  <p className="text-foreground leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Call to Action */}
        <div id="contact" className="scroll-mt-24 text-center space-y-6 pt-8">
          <h3 className="text-2xl font-bold text-heading">Get in touch!</h3>
          <p className="text-foreground leading-relaxed max-w-3xl mx-auto">
            I am open to new opportunities, collaborations, and meeting fellow designers. You can email me at{" "}
            <a href="mailto:aggelosdiama@gmail.com" className="font-bold text-heading hover:text-lemon transition-colors duration-300 underline-offset-4 hover:underline">
              aggelosdiama@gmail.com
            </a>{" "}
            or connect with me on{" "}
            <a 
              href="https://www.linkedin.com/in/aggelos-diamantopoulos/" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-heading hover:text-lemon transition-colors duration-300 underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>. I am always happy to chat.
          </p>
        </div>
      </div>
    </section>
  );
};
