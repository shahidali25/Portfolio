import React from 'react';
import { X, Printer, Mail, Phone, MapPin, Award } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 no-print">
      <div className="bg-[#0a1128] max-w-4xl w-full rounded-none shadow-none relative border-2 border-[#38bdf8]/40 overflow-hidden flex flex-col my-8">
        {/* Modal Controls Toolbar */}
        <div className="bg-[#0b1329] text-[#f8f8f6] px-6 py-4 flex justify-between items-center border-b border-[#38bdf8]/20 no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-[#38bdf8]" />
            <span className="font-bold text-xs uppercase tracking-widest font-mono text-[#38bdf8]">Resume Ledger View</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-[#38bdf8] hover:bg-[#38bdf8]/80 text-[#0a1128] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-none flex items-center gap-1.5 cursor-pointer transition-all border border-[#38bdf8]"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-[#38bdf8] hover:line-through text-xs font-bold uppercase tracking-widest cursor-pointer font-mono"
              aria-label="Close modal"
            >
              [ Close ]
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[80vh] bg-[#0a1128] text-[#f8f8f6]" id="resume-print-area">
          {/* Header */}
          <div className="border-b border-[#38bdf8]/30 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-black text-[#38bdf8] uppercase tracking-wider">Shahid Ali</h1>
              <p className="text-sm font-bold uppercase tracking-widest text-[#f8f8f6] mt-2 font-mono">[ Aspiring Data Analyst & Web Developer ]</p>
              <p className="text-xs text-slate-300 mt-1.5 font-serif italic">BCA Graduate passionate about turning data into highly customized interactive applications</p>
            </div>
            
            <div className="text-[10px] space-y-1 text-slate-300 md:text-right font-mono uppercase tracking-wider">
              <p className="flex items-center md:justify-end gap-1.5"><Mail className="w-3.5 h-3.5 text-[#38bdf8]" /> alishahid3496@gmail.com</p>
              <p className="flex items-center md:justify-end gap-1.5"><Phone className="w-3.5 h-3.5 text-[#38bdf8]" /> +91 8050489025</p>
              <p className="flex items-center md:justify-end gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#38bdf8]" /> Bangalore, Karnataka, India</p>
            </div>
          </div>

          {/* Body Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Left Column: Skills, Certs, Education */}
            <div className="space-y-6 md:border-r md:border-[#38bdf8]/20 md:pr-8">
              {/* Education */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-mono">Education</h3>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#f8f8f6]">BCA (Bachelor of Computer Applications)</h4>
                  <p className="text-xs text-slate-400 font-serif">Al-Ameen Institute of Information Sciences</p>
                  <p className="text-xs font-bold font-mono text-[#38bdf8] mt-1">CGPA: 7.79 / 10.0</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-mono">Technical Core</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1 font-mono">Programming</span>
                    <p className="text-xs text-slate-300 font-serif">Python, JavaScript, PHP, SQL</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1 font-mono">Web Architecture</span>
                    <p className="text-xs text-slate-300 font-serif">HTML5, CSS3, JavaScript, PHP, Bootstrap, Responsive Systems</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1 font-mono">Business Intel</span>
                    <p className="text-xs text-slate-300 font-serif">Microsoft Excel, Power BI, SQL, Python, MySQL, Data Visualization</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1 font-mono">Utilities</span>
                    <p className="text-xs text-slate-300 font-serif">VS Code, Git, GitHub, XAMPP, Jupyter Notebook, Power BI, Excel</p>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">Languages</h3>
                <p className="text-xs text-slate-300 font-serif">English, Hindi, Kannada</p>
              </div>
            </div>

            {/* Right Column (2 columns wide): Experience, Projects, Certs list */}
            <div className="md:col-span-2 space-y-6">
              {/* Objective */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">Professional Objective</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-serif">
                  Result-driven BCA graduate continuously seeking to leverage analytical skills and web development capabilities. Skilled in building responsive websites, writing SQL aggregations, and structuring business intelligence models in Power BI to deliver data-backed insights.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-[#38bdf8]/20 pb-1 font-mono">Work History</h3>
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#f8f8f6]">Web Development Intern</h4>
                    <span className="text-[9px] text-[#0a1128] font-bold font-mono uppercase tracking-wider bg-[#38bdf8] px-2 py-0.5">Internship</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1">SkillCraft Technology</p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300 font-serif">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#38bdf8] mt-1.5 flex-shrink-0"></span>
                      <span>Built responsive, high-performance web systems using HTML5, CSS3, JavaScript, PHP, and MySQL.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#38bdf8] mt-1.5 flex-shrink-0"></span>
                      <span>Designed and normalized database schemas for inventory tracking.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#38bdf8] mt-1.5 flex-shrink-0"></span>
                      <span>Improved frontend loading speeds by 30% through modular Bootstrap layouts.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Projects Summary */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-[#38bdf8]/20 pb-1 font-mono">Selected Projects</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#f8f8f6]">🛒 EasyMart – Grocery Shopping Website</h4>
                    <p className="text-[9px] text-[#38bdf8] font-mono mt-0.5 uppercase">HTML, CSS, JavaScript, PHP, MySQL</p>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-serif">Developed a full-stack grocery platform featuring user authentication, product search, an interactive shopping cart, order tracking, and an admin analytics dashboard.</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#f8f8f6]">📈 Power BI & Excel Sales Dashboards</h4>
                    <p className="text-[9px] text-[#38bdf8] font-mono mt-0.5 uppercase">Power BI, DAX, Advanced Excel, Slicers, Pivot Tables</p>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-serif">Engineered interactive sales dashboards with KPIs, regional comparative analysis, profit margins, and segment cross-filtering.</p>
                  </div>
                </div>
              </div>

              {/* Certifications list */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-[#38bdf8]/20 pb-1 font-mono">Key Credentials</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-serif font-semibold italic">
                  <p className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#38bdf8]" /> Python Programming</p>
                  <p className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#38bdf8]" /> Power BI Data Analyst</p>
                  <p className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#38bdf8]" /> Microsoft Excel Analytics</p>
                  <p className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#38bdf8]" /> SQL Queries & Reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
