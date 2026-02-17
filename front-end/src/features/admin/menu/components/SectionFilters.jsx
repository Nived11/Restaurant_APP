import React from "react";

const SectionFilters = ({ sections, activeSection, setActiveSection }) => (
  /* Hidden on mobile (hidden), shown on Large screens (lg:flex) */
  <div className="hidden lg:flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
    <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
      {sections.map((sec) => (
        <button
          key={sec}
          onClick={() => setActiveSection(sec)}
          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
            activeSection === sec ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {sec}
        </button>
      ))}
    </div>
  </div>
);

export default SectionFilters;