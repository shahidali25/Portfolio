import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowRight, Mail, LayoutGrid, Database, LineChart } from 'lucide-react';

interface HeroProps {
  onViewResume: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewResume, onNavigate }) => {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#0a1128] py-12 md:py-20 no-print border-b border-[#38bdf8]/30">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
        {/* Floating tech pill indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 border border-[#38bdf8] bg-[#38bdf8] text-[#0a1128] px-3.5 py-1 mb-8"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono">BCA Graduate & Technical Developer</span>
        </motion.div>

        {/* Display Typography Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl sm:text-8xl md:text-[110px] lg:text-[140px] font-black leading-[0.75] tracking-tighter uppercase text-[#f8f8f6] max-w-4xl"
        >
          Shahid<br/>
          <span className="text-[#38bdf8]">Ali</span>
        </motion.h1>

        {/* Dynamic Titles */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex items-center justify-center gap-4 flex-wrap"
        >
          <span className="h-[1px] w-8 sm:w-12 bg-[#38bdf8]/40"></span>
          <p className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider text-[#f8f8f6] flex items-center gap-2">
            <span>Aspiring Data Analyst</span>
            <span className="text-[#38bdf8]">/</span>
            <span>Web Developer</span>
          </p>
          <span className="h-[1px] w-8 sm:w-12 bg-[#38bdf8]/40"></span>
        </motion.div>

        {/* Catchy Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed font-serif italic"
        >
          "BCA graduate passionate about turning raw data into strategic insights and building interactive web applications. Dedicated to solving real-world problems through clean code and visualization."
        </motion.p>

        {/* Visual Pillars (Analyst & Developer Cards) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full border-t border-b border-[#38bdf8]/30 py-6"
        >
          <div className="text-left sm:pr-4 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]/60 block mb-1">Web Systems</span>
            <p className="text-sm font-bold uppercase text-[#f8f8f6]">HTML5, CSS3, JS, PHP, MySQL</p>
          </div>
          <div className="text-left border-t sm:border-t-0 sm:border-l border-[#38bdf8]/30 pt-4 sm:pt-0 sm:pl-6 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]/60 block mb-1">Analytical Models</span>
            <p className="text-sm font-bold uppercase text-[#f8f8f6]">Excel, Power BI, SQL, Python</p>
          </div>
        </motion.div>

        {/* Core Prompt Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onViewResume}
            className="w-full sm:w-auto border border-[#38bdf8] bg-[#38bdf8] hover:bg-transparent hover:text-[#38bdf8] text-[#0a1128] font-bold text-xs uppercase tracking-widest px-6 py-3 cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 opacity-75" />
            Resume PDF
          </button>
          
          <button
            onClick={() => onNavigate('projects')}
            className="w-full sm:w-auto border border-[#38bdf8] text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0a1128] font-bold text-xs uppercase tracking-widest px-6 py-3 cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <LayoutGrid className="w-4 h-4 opacity-75" />
            View Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};
