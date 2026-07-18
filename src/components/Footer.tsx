import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a1128] text-[#f8f8f6] py-16 border-t border-[#38bdf8]/30 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-base font-serif italic text-slate-300">
          "Thank you for visiting my portfolio. Let's build something amazing together."
        </p>
        
        <div className="border-t border-[#38bdf8]/10 max-w-xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <span>Shahid Ali — © {new Date().getFullYear()}</span>
          <span>Designed with Editorial Precision & Sandbox Models</span>
        </div>
      </div>
    </footer>
  );
};
