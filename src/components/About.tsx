import React from 'react';
import { User, GraduationCap, MapPin, Sparkles, Database, Code } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0a1128] border-b border-[#38bdf8]/30 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-[#38bdf8] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            [ About Me ]
          </h2>
          <div className="mt-3 h-[1px] w-12 bg-[#38bdf8] mx-auto"></div>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-serif italic">
            Bridging the gap between front-end engineering and mathematical business intelligence.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio Card (2 columns wide on desktop) */}
          <div className="lg:col-span-2 bg-[#0b1329] border border-[#38bdf8]/30 p-6 md:p-8 flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-[1px] w-6 bg-[#38bdf8]/40"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]/70 font-mono">Biography Summary</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider text-[#f8f8f6] mb-4">My Journey</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-serif">
                Hi, I'm <strong className="font-extrabold text-[#38bdf8]">Shahid Ali</strong>, a BCA graduate passionate about Data Analytics and Web Development. I enjoy creating responsive websites, analyzing complex data tables, and building highly interactive business dashboards that help solve real-world problems.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 font-serif">
                I believe that modern data shouldn't be trapped inside corporate spreadsheets. My unique blend of computer applications background (BCA) and analytical certifications allows me to build custom web applications that process, model, and display live actionable indices seamlessly.
              </p>
            </div>
            <div className="mt-8 border-t border-[#38bdf8]/20 pt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#f8f8f6] uppercase tracking-widest font-mono">
                <span className="w-1.5 h-1.5 bg-[#38bdf8]"></span> Web Development
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#f8f8f6] uppercase tracking-widest font-mono">
                <span className="w-1.5 h-1.5 bg-[#38bdf8]"></span> Data Analysis
              </div>
            </div>
          </div>

          {/* Side Cards Stack */}
          <div className="space-y-8 flex flex-col justify-between lg:space-y-0">
            {/* Education Spotlight - INVERTED HIGH CONTRAST IN ACCENT COLOR */}
            <div className="bg-[#38bdf8] text-[#0a1128] border border-[#38bdf8] p-6 flex-1 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-[1px] w-6 bg-[#0a1128]/30"></span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#0a1128]/70 font-mono">Academics</span>
                </div>
                <h4 className="text-[10px] font-bold text-[#0a1128]/60 uppercase tracking-widest">Education Spotlight</h4>
                <h3 className="text-lg font-black uppercase tracking-tight mt-2 leading-snug">Bachelor of Computer Applications (BCA)</h3>
                <p className="text-xs text-[#0a1128]/85 italic mt-1 font-serif font-semibold">Al-Ameen Institute of Information Sciences</p>
              </div>
              <div className="mt-6 border-t border-[#0a1128]/20 pt-4 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-wider text-[#0a1128]/70 font-bold">Final CGPA</span>
                <span className="text-base font-black font-mono tracking-wider text-[#0a1128]">7.79 / 10.0</span>
              </div>
            </div>

            {/* Geography Card */}
            <div className="bg-[#0b1329] border border-[#38bdf8]/30 p-6 mt-8 lg:mt-0 flex-1 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-[1px] w-6 bg-[#38bdf8]/40"></span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#38bdf8]/70 font-mono">Geography</span>
                </div>
                <h4 className="text-[10px] font-bold text-[#38bdf8]/50 uppercase tracking-widest">Based In</h4>
                <h3 className="text-base font-black uppercase tracking-wider text-[#f8f8f6] mt-2">Bangalore, Karnataka</h3>
                <p className="text-xs text-slate-400 font-medium mt-1 font-mono uppercase tracking-wider">The Silicon Valley of India</p>
              </div>
              <p className="text-xs text-slate-300 mt-6 leading-relaxed italic font-serif">
                Operating directly from the tech capital, ready to collaborate on forward-thinking projects globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
