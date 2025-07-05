import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

const Index = () => {
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-inter">
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center animate-fade-in">
        <div className="text-2xl font-light text-slate-800 tracking-wide">nextSkill</div>
        <div className="flex items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSocialClick('https://github.com')}
              className="p-2 text-neutral-800 hover:text-neutral-600 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => handleSocialClick('https://linkedin.com')}
              className="p-2 text-neutral-800 hover:text-neutral-600 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </button>
          </div>
          <Link to="/create">
            <Button variant="outline" className="text-neutral-800 border-neutral-400 hover:bg-neutral-100 tracking-wider font-medium transition-all duration-300 px-6 py-2">
              try
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-8 py-20 text-center">
        <div className="animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
          <h1 className="text-7xl font-ultra-light text-neutral-800 mb-16 tracking-extra-wide leading-tight">
            CREATE PERSONALISED
            <br />
            <span className="text-blue-500 font-light">
              ROADMAPS
            </span>
          </h1>
        </div>

        {/* Feature Cards */}
        <div className="max-w-6xl max-h-200 mx-auto mt-24 grid md:grid-cols-3 gap-8">
          <div 
            className="bg-blue-500 text-white rounded-none p-8 transition-all duration-300 animate-fade-in"
            style={{animationDelay: '0.4s', animationFillMode: 'both'}}
          >
            <h2 className="text-2xl font-light mb-8 tracking-extra-wide leading-relaxed uppercase">
              LLM POWERED 
              <br />
              ROADMAP
              <br />
              GENERATION
            </h2>
          </div>
          
          <div 
            className="bg-blue-500 text-white rounded-none p-8 transition-all duration-300 animate-fade-in"
            style={{animationDelay: '0.6s', animationFillMode: 'both'}}
          >
            <h2 className="text-2xl font-light mb-8 tracking-extra-wide leading-relaxed uppercase">
              CUSTOM LEARNING
              <br />
              PATHS BASED ON
              <br />
              PREFERENCE & GOALS
            </h2>
          </div>

          <div 
            className="bg-blue-500 text-white rounded-none p-8 transition-all duration-300 animate-fade-in"
            style={{animationDelay: '0.8s', animationFillMode: 'both'}}
          >
            <h2 className="text-2xl font-light mb-8 tracking-extra-wide leading-relaxed uppercase">
              DOWNLOAD YOUR
              <br />
              ROADMAP AS
              <br />
              TEXT FILE
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
