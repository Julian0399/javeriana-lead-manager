import { useState } from "react";
import type { ProgramCategory } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { setSelectedCategory } from "../features/programs/programsSlice";
import LeadList from "./LeadList";

const CATEGORIES: (ProgramCategory | "Todas")[] = [
  "Todas",
  "Pregrado",
  "Posgrado",
  "Educación Continua",
];

interface Props {
  counts: Record<string, number>;
}

export default function Sidebar({ counts }: Props) {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.programs.selectedCategory,
  );
  const leadsCount = useAppSelector((state) => state.leads.items.length);
  const [showLeads, setShowLeads] = useState(false);

  return (
    <>
      <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-[#e0e0e0] scroll-none">
        {CATEGORIES.map((category) => {
          const label =
            category === "Educación Continua" ? "Ed. Continua" : category;
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => dispatch(setSelectedCategory(category))}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[12px] cursor-pointer transition-colors duration-150 whitespace-nowrap
                ${
                  isActive
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-[#e0e0e0] text-[#555] hover:bg-muted"
                }`}
            >
              {label}
              <span
                className={`text-[10px] ${isActive ? "opacity-75" : "text-[#aaa]"}`}
              >
                {counts[category] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
      <aside className="hidden md:flex w-48 shrink-0 bg-white border-r border-[#e0e0e0] p-[18px_14px] flex-col justify-between sticky top-0 h-full overflow-y-auto">
        <div>
          <p className="text-[10px] font-medium text-[#bbb] tracking-[0.1em] uppercase mb-1.5">
            Categorías
          </p>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => dispatch(setSelectedCategory(category))}
              className={`flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-[12px] mb-0.5 transition-colors duration-150 cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#e8edf5] text-primary font-medium"
                  : "text-[#555] hover:bg-muted"
              }`}
            >
              <span>
                {category === "Educación Continua" ? "Ed. Continua" : category}
              </span>
              <span
                className={`text-[10px] rounded-full px-2 py-0.5 ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-[#f2f2f2] text-[#bbb]"
                }`}
              >
                {counts[category] ?? 0}
              </span>
            </button>
          ))}
        </div>
        <div>
          <div className="h-px bg-[#f0f0f0f] mb-3" />
          <button
            onClick={() => setShowLeads(true)}
            className="flex items-center justify-between w-full px-2.5 py-2 rounded-lg border border-dashed border-[#e0e0e0] text-[12px] text-[#555] hover:bg-[#f9f9f9] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2C5697"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              Leads Registrados
            </div>
            <span className="text-[10px] bg-primary text-white rounded-full px-2 py-0.5">
              {leadsCount}
            </span>
          </button>
        </div>
      </aside>
      {showLeads && <LeadList onClose={() => setShowLeads(false)} />}
    </>
  );
}
