import React from 'react';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onResumeClick: () => void;
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onResumeClick, activeSection, onNavClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
  ];

  const handleNav = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#38bdf8]/30 bg-[#0a1128]/90 backdrop-blur-md no-print">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Initials */}
        <button 
          onClick={() => handleNav('hero')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center border border-[#38bdf8] bg-[#38bdf8] text-[#0a1128] font-black text-sm tracking-widest transition-all group-hover:bg-transparent group-hover:text-[#38bdf8]">
            SA
          </div>
          <div className="text-left font-serif">
            <span className="block font-black text-[#f8f8f6] leading-none uppercase tracking-wider text-xs group-hover:text-[#38bdf8] transition-all">Shahid Ali</span>
            <span className="text-[9px] text-[#38bdf8]/80 font-mono uppercase tracking-widest block mt-0.5">PORTFOLIO</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeSection === item.id 
                  ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-black' 
                  : 'text-[#f8f8f6]/60 hover:text-[#38bdf8] hover:line-through'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Resume Action CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onResumeClick}
            className="flex items-center gap-1.5 border border-[#38bdf8] bg-[#38bdf8] hover:bg-transparent hover:text-[#38bdf8] text-[#0a1128] px-4 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onResumeClick}
            className="flex items-center justify-center border border-[#38bdf8] bg-[#38bdf8] hover:bg-transparent hover:text-[#38bdf8] text-[#0a1128] p-2 cursor-pointer transition-all"
            aria-label="View Resume"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#f8f8f6] hover:text-[#38bdf8] transition-all focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#38bdf8]/30 bg-[#0a1128]/95 backdrop-blur px-4 py-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`block w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
                activeSection === item.id 
                  ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-l-2 border-[#38bdf8] font-black' 
                  : 'text-[#f8f8f6]/60 hover:text-[#38bdf8] hover:bg-[#38bdf8]/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
