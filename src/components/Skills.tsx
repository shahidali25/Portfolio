import React, { useState, useMemo } from 'react';
import { Award, Search, CheckCircle, Code, Database, Layout, Lightbulb, Hammer } from 'lucide-react';
import { SKILLS } from '../data';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'programming' | 'web_dev' | 'analytics' | 'database' | 'tools'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Tech Stack', icon: <Award className="w-4 h-4" /> },
    { id: 'programming', label: 'Programming', icon: <Code className="w-4 h-4" /> },
    { id: 'web_dev', label: 'Web Dev', icon: <Layout className="w-4 h-4" /> },
    { id: 'analytics', label: 'Data Analytics', icon: <Database className="w-4 h-4" /> },
    { id: 'database', label: 'Databases', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <Hammer className="w-4 h-4" /> },
  ];

  // Filter skills by search query & category tab in real-time
  const filteredSkills = useMemo(() => {
    return SKILLS.filter(skill => {
      const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 bg-[#0a1128] border-b border-[#38bdf8]/30 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#38bdf8] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            [ Skills & Competencies ]
          </h2>
          <div className="mt-3 h-[1px] w-12 bg-[#38bdf8] mx-auto"></div>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-serif italic">
            Search or filter across programming languages, analytics models, and developer utilities.
          </p>
        </div>

        {/* Filter Controls (Search + Tabs) */}
        <div className="space-y-6 max-w-4xl mx-auto mb-10">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search specific technology... (e.g. Python, Power BI, SQL)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#38bdf8]/30 bg-[#0b1329] text-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#38bdf8] text-xs font-mono uppercase tracking-wider placeholder:text-slate-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center border-b border-[#38bdf8]/10 pb-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setSearchQuery(''); // clear search on filter change
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all border ${
                  activeCategory === cat.id 
                    ? 'bg-[#38bdf8] border-[#38bdf8] text-[#0a1128] font-black' 
                    : 'bg-[#0b1329] border-[#38bdf8]/30 text-[#f8f8f6]/70 hover:text-[#38bdf8] hover:border-[#38bdf8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 max-w-md mx-auto">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">No matching skills found in this index.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {filteredSkills.map((skill, index) => (
              <div 
                key={`${skill.name}-${index}`}
                className="bg-[#0b1329] border border-[#38bdf8]/30 rounded-none p-4 flex flex-col justify-between transition-all hover:bg-[#38bdf8] hover:text-[#0a1128] group"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-black text-[#f8f8f6] group-hover:text-[#0a1128] text-xs uppercase tracking-wider">{skill.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#38bdf8] group-hover:text-[#0a1128] flex-shrink-0" />
                </div>

                {/* Subcategory Pill */}
                <div className="flex items-center justify-between border-t border-[#38bdf8]/10 group-hover:border-[#0a1128]/20 pt-2 mt-2">
                  <span className="text-[8px] font-bold text-slate-400 group-hover:text-[#0a1128]/70 uppercase tracking-widest font-mono">
                    {skill.category.replace('_', ' ')}
                  </span>
                  
                  {/* Skill Mastery Indicator bar */}
                  {skill.rating && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 group-hover:bg-[#0a1128]/10 h-[2px] overflow-hidden">
                        <div 
                          className="bg-[#38bdf8] group-hover:bg-[#0a1128] h-full" 
                          style={{ width: `${skill.rating}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[9px] text-slate-400 group-hover:text-[#0a1128]/70 font-bold">{skill.rating}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
