import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../data';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-[#0a1128] border-b border-[#38bdf8]/30 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-[#38bdf8] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            [ Credentials & Experience ]
          </h2>
          <div className="mt-3 h-[1px] w-12 bg-[#38bdf8] mx-auto"></div>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-serif italic">
            A chronological timeline of internships, academic degrees, and specialized professional certifications.
          </p>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* LEFT COLUMN: Career Experience & Academic Path */}
          <div className="space-y-12">
            {/* Professional Experience Section */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#f8f8f6] mb-8 border-b border-[#38bdf8]/30 pb-2 flex items-center gap-2">
                Work History
              </h3>
              
              <div className="relative border-l border-[#38bdf8]/30 pl-6 space-y-10 ml-3">
                {EXPERIENCE.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Circle bullet on timeline */}
                    <span className="absolute -left-[30px] top-1.5 flex h-2 w-2 bg-[#38bdf8] border border-[#38bdf8] rounded-none"></span>
                    
                    <div>
                      <span className="inline-flex items-center gap-1 bg-[#38bdf8] text-[#0a1128] text-[8px] font-bold px-2 py-0.5 font-mono mb-2 uppercase tracking-widest">
                        {item.period}
                      </span>
                      <h4 className="text-sm font-black uppercase tracking-wide text-[#f8f8f6]">{item.role}</h4>
                      <p className="text-xs font-medium italic text-slate-400 font-serif mt-0.5">{item.company}</p>
                      
                      <ul className="mt-3.5 space-y-2 text-xs text-slate-300 font-serif">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[#38bdf8] mt-2 flex-shrink-0"></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Academic Education Section */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#f8f8f6] mb-8 border-b border-[#38bdf8]/30 pb-2 flex items-center gap-2">
                Academic Background
              </h3>
              
              <div className="relative border-l border-[#38bdf8]/30 pl-6 space-y-10 ml-3">
                {EDUCATION.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-[30px] top-1.5 flex h-2 w-2 bg-[#38bdf8] border border-[#38bdf8] rounded-none"></span>
                    
                    <div>
                      <span className="inline-flex items-center gap-1 bg-[#38bdf8] text-[#0a1128] text-[8px] font-bold px-2 py-0.5 font-mono mb-2 uppercase tracking-widest">
                        {item.period}
                      </span>
                      <h4 className="text-sm font-black uppercase tracking-wide text-[#f8f8f6]">{item.degree}</h4>
                      <p className="text-xs font-medium italic text-slate-400 font-serif mt-0.5">{item.institution}</p>
                      
                      <div className="mt-3.5 inline-flex border border-[#38bdf8]/30 bg-[#0b1329] text-[#38bdf8] font-bold font-mono text-[10px] px-3 py-1.5 uppercase tracking-wider">
                        {item.gpa}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Certifications Grid */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#f8f8f6] mb-8 border-b border-[#38bdf8]/30 pb-2 flex items-center gap-2">
              Professional Certifications
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-[#0b1329] border border-[#38bdf8]/30 rounded-none p-4 flex flex-col justify-between hover:bg-[#38bdf8] hover:text-[#0a1128] group transition-all"
                >
                  <div className="flex h-8 w-8 items-center justify-center border border-[#38bdf8]/30 bg-[#0a1128] text-[#38bdf8] group-hover:bg-[#0a1128]/20 group-hover:text-[#0a1128] group-hover:border-[#0a1128]/30 mb-4 transition-all">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wide text-[#f8f8f6] group-hover:text-[#0a1128] leading-snug">{cert.name}</h4>
                    <p className="text-[10px] text-slate-400 group-hover:text-[#0a1128]/80 font-medium font-serif italic mt-1.5">{cert.issuer}</p>
                  </div>
                  <div className="mt-4 pt-3.5 border-t border-[#38bdf8]/10 group-hover:border-[#0a1128]/20 flex justify-between items-center text-[9px] font-bold font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-1 text-emerald-400 group-hover:text-emerald-700">
                      Verified
                    </span>
                    <span className="text-slate-400 group-hover:text-[#0a1128]/70">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
