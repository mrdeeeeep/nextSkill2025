
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const CreateRoadmap = () => {
  const [title, setTitle] = useState("");
  const [preferences, setPreferences] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      navigate(`/roadmap?title=${encodeURIComponent(title)}&preferences=${encodeURIComponent(preferences)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center animate-fade-in">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-slate-400 hover:text-slate-600 transition-colors duration-300">
            <ArrowLeft size={20} strokeWidth={1} />
          </Link>
          <div className="text-2xl font-light text-slate-800 tracking-wide">nextSkill</div>
        </div>
        <div className="text-slate-500 font-light tracking-wider uppercase text-sm">create roadmap</div>
      </header>

      {/* Main Content */}
      <main className="px-0 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            <h1 className="text-3xl font-ultra-light text-slate-800 mb-12 tracking-extra-wide leading-tight">
              ENTER YOUR CUSTOM 
              <br />
              <span className="text-blue-500 font-light">
                PROMPT
              </span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-6 animate-fade-in" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <label htmlFor="title" className="block text-lg font-light text-slate-700 tracking-wide uppercase text-sm">
                What do you want to learn?
              </label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Web Development, Machine Learning, Mobile App Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg py-4 px-6 border border-slate-200 focus:border-blue-400 rounded-none font-light tracking-wide transition-all duration-400 bg-gray-50 focus:bg-white"
                required
              />
            </div>

            <div className="space-y-6 animate-fade-in" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
              <label htmlFor="preferences" className="block text-lg font-light text-slate-700 tracking-wide uppercase text-sm">
                Any specific preferences or goals? (Optional)
              </label>
              <Textarea
                id="preferences"
                placeholder="e.g., I prefer hands-on projects, I want to build a portfolio, I have 3 months available"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="text-lg py-4 px-6 border border-slate-200 focus:border-blue-400 rounded-none min-h-[140px] font-light tracking-wide transition-all duration-400 bg-gray-50 focus:bg-white resize-none"
                rows={5}
              />
            </div>

            <div className="pt-37 animate-fade-in" style={{animationDelay: '0.8s', animationFillMode: 'both'}}>
              <Button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-5 text-lg font-light rounded-none transition-all duration-400 tracking-wider animate-soft-hover"
              >
                Generate My Roadmap
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateRoadmap;
