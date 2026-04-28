import type { ProgramCategory } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { setSelectedCategory } from "../features/programs/programsSlice";

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
      <aside className="hidden md:flex w-48 shrink-0 bg-white border-r border-[#e0e0e0] p-[18px_14px] flex-col gap-4">
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
      </aside>
    </>
  );
}
