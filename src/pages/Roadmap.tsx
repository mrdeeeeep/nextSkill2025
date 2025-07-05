
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

const Roadmap = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "Web Development";
  const preferences = searchParams.get("preferences") || "";
  
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleDownload = () => {
    // Create a simple text version of the roadmap for download
    const roadmapText = `${title} Roadmap\n6 months (24 weeks) roadmap\n\n${roadmapData.map((item, index) => 
      `${index + 1}. ${item.title}\nDuration: ${item.duration}\nDescription: ${item.description}\nTopics: ${item.topics.join(' ')}\n\n`
    ).join('')}`;
    
    const blob = new Blob([roadmapText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}_Roadmap.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Use roadmap data from navigation state, fallback to empty array
  // @ts-ignore
  const location = window.location || {};
  // Try to get roadmap from navigation state (react-router-dom)
  let roadmapData: RoadmapItem[] = [];
  try {
    // Debug: log roadmapData and ids
    setTimeout(() => {
      console.log('roadmapData:', roadmapData);
      roadmapData.forEach((item, idx) => {
        console.log(`Item ${idx}: id =`, item.id);
      });
    }, 0);
    // For react-router-dom v6, use window.history.state or location.state if available
    // This code assumes the roadmap is passed in navigation state
    // You may need to adjust based on your router setup
    // eslint-disable-next-line
    const navState = (window.history.state && window.history.state.usr) || (location.state);
    if (navState && navState.roadmap) {
      roadmapData = navState.roadmap;
    }
  } catch (e) {
    roadmapData = [];
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-inter">
      {/* Header */}
      <header className="bg-white px-8 py-6 flex justify-between items-center border-b border-neutral-200 animate-fade-in">
        <div className="flex items-center gap-6">
          <Link to="/create" className="text-slate-400 hover:text-slate-600 transition-colors duration-300">
            <ArrowLeft size={20} strokeWidth={1} />
          </Link>
          <div className="text-2xl font-light text-slate-800 tracking-wide">nextSkill</div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="text-neutral-800 border-neutral-400 hover:bg-neutral-100 tracking-wider font-medium transition-all duration-300 px-4 py-2 flex items-center gap-2"
          >
            <Download size={16} strokeWidth={1.5} />
            download
          </Button>
          <div className="text-slate-500 font-light tracking-wider uppercase text-sm">roadmap</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="mb-16 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            <h1 className="text-5xl font-ultra-light text-slate-800 mb-4 tracking-wide">{title}</h1>
            <p className="text-lg text-slate-500 font-light tracking-wider uppercase text-sm">6 months (24 weeks) roadmap</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-10 top-0 bottom-0 w-px bg-slate-200 transition-all duration-500"></div>

            {/* Roadmap Items */}
            <div className="space-y-12">
              {roadmapData.map((item, index) => (
                <div key={item.id ?? index} className="relative flex items-start animate-fade-in" style={{animationDelay: `${0.4 + index * 0.2}s`, animationFillMode: 'both'}}>
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 w-5 h-5 rounded-full border-2 transition-all duration-500 z-10 ${
                    hoveredItem === item.id 
                      ? 'bg-blue-500 border-blue-500 scale-125' 
                      : 'bg-white border-slate-300'
                  }`}></div>

                  {/* Active Timeline Line Segment */}
                  {hoveredItem === item.id && (
                    <div className="absolute left-10 top-2 w-px h-full bg-blue-500 transition-all duration-500"></div>
                  )}

                  {/* Content Card */}
                  <div 
                    className="ml-20 w-full"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={`rounded-none p-12 transition-all duration-500 cursor-pointer animate-soft-hover ${
                      hoveredItem === item.id
                        ? 'bg-blue-500 text-white shadow-lg transform translate-x-2'
                        : 'bg-white text-slate-800 shadow-sm'
                    }`}>
                      <div className="mb-4">
                        <span className={`text-xs font-medium tracking-ultra-wide uppercase ${
                          hoveredItem === item.id ? 'text-blue-100' : 'text-slate-400'
                        }`}>
                          Estimated Time Needed: {item.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl font-normal mb-6 tracking-wide">{item.title}</h3>
                      
                      <p className={`mb-8 font-normal tracking-wide leading-relaxed text-lg ${
                        hoveredItem === item.id ? 'text-blue-50' : 'text-slate-700'
                      }`}>
                        {item.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {item.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className={`text-sm font-normal tracking-wide ${
                            hoveredItem === item.id ? 'text-blue-100' : 'text-slate-600'
                          }`}>
                            • {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Roadmap;