import React, { useState } from 'react';
import { LayoutGrid, Check, Layers, Code, Play } from 'lucide-react';
import { PROJECTS } from '../data';
import { 
  EasyMartPreview, 
  ExcelDashboardPreview, 
  PowerBiDashboardPreview, 
  PythonAnalysisPreview, 
  SqlProjectPreview 
} from './ProjectPreviews';

export const Projects: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState('easymart');

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  const renderPreview = (id: string) => {
    switch (id) {
      case 'easymart':
        return <EasyMartPreview />;
      case 'excel-dashboard':
        return <ExcelDashboardPreview />;
      case 'powerbi-dashboard':
        return <PowerBiDashboardPreview />;
      case 'python-analysis':
        return <PythonAnalysisPreview />;
      case 'sql-project':
        return <SqlProjectPreview />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-20 bg-[#0a1128] border-b border-[#38bdf8]/30 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-[#38bdf8] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            [ Interactive Playgrounds ]
          </h2>
          <div className="mt-3 h-[1px] w-12 bg-[#38bdf8] mx-auto"></div>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-serif italic">
            Explore fully functional interactive live mockups. Click on different projects to run live analytics, compile code cells, or simulate client orders.
          </p>
        </div>

        {/* Project Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Sidebar Selection & Project Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Project Selection Tabs */}
            <div className="bg-[#0b1329] border border-[#38bdf8]/30 rounded-none p-4 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2 px-1 font-mono">Select Project Deck:</span>
              {PROJECTS.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`w-full text-left p-3 rounded-none border transition-all cursor-pointer flex items-start gap-3 ${
                    selectedProjectId === proj.id 
                      ? 'bg-[#38bdf8] border-[#38bdf8] text-[#0a1128]' 
                      : 'bg-transparent border-transparent text-slate-300 hover:bg-[#38bdf8]/10 hover:text-[#38bdf8]'
                  }`}
                >
                  <span className="text-xl mt-0.5">
                    {proj.id === 'easymart' && '🛒'}
                    {proj.id === 'excel-dashboard' && '📊'}
                    {proj.id === 'powerbi-dashboard' && '📈'}
                    {proj.id === 'python-analysis' && '🐍'}
                    {proj.id === 'sql-project' && '🗄️'}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider leading-tight">{proj.title}</h4>
                    <p className={`text-[10px] mt-0.5 truncate max-w-[180px] md:max-w-xs font-mono ${selectedProjectId === proj.id ? 'text-[#0a1128]/70' : 'text-slate-400'}`}>{proj.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Project Specs */}
            <div className="bg-[#0b1329] border border-[#38bdf8]/30 rounded-none p-6 space-y-6">
              <div>
                <span className="px-2 py-0.5 bg-[#38bdf8] text-[#0a1128] text-[8px] font-bold uppercase tracking-widest font-mono">
                  {selectedProject.category === 'web' ? 'Web App Project' : 'Data Analytics Project'}
                </span>
                <h3 className="text-lg font-black uppercase tracking-wider text-[#f8f8f6] mt-2.5">{selectedProject.title}</h3>
                <p className="text-xs text-slate-300 font-medium font-serif italic mt-0.5">{selectedProject.subtitle}</p>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed font-serif">{selectedProject.description}</p>

              {/* Technologies list */}
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">Built With</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="bg-[#0a1128] border border-[#38bdf8]/30 text-[#38bdf8] text-[9px] font-bold px-2 py-0.5 rounded-none font-mono uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bullet Features list */}
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">Key Engineering Features</span>
                <ul className="space-y-2 text-xs text-slate-300 font-serif">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#38bdf8] mt-1.5 flex-shrink-0"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Dashboard/Model Preview */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <div className="sticky top-20">
              <div className="bg-[#0a1128] border border-[#38bdf8]/40 rounded-none p-3 shadow-none mb-4 flex items-center justify-between text-[#f8f8f6]">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest font-mono text-[#38bdf8]">
                  <Play className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
                  <span>Sandbox Engine: Active</span>
                </div>
                <span className="text-[9px] border border-[#38bdf8]/40 text-[#f8f8f6] font-bold px-2 py-0.5 rounded-none uppercase font-mono tracking-wider">
                  Interactive Demo
                </span>
              </div>
              
              <div className="border border-[#38bdf8]/30 bg-[#0b1329] p-1">
                {renderPreview(selectedProjectId)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
