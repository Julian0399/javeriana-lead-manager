import { useMemo } from "react";
import { useAppSelector } from "../hooks/useAppDispatch";
import ProgramCard from "./ProgramCard";
import type { Program, ProgramCategory } from "../types";

interface Props {
  onSignUp: (program: Program) => void;
}

export default function ProgramList({ onSignUp }: Props) {
  const { items, selectedCategory, searchQuery } = useAppSelector(
    (state) => state.programs,
  );
  const filtered = useMemo(() => {
    return items.filter((program) => {
        const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Todas" || program.category === (selectedCategory as ProgramCategory);
        return matchesSearch && matchesCategory;
    })
}, [items, searchQuery, selectedCategory]);

    if (filtered.length === 0) {
        return (
            <div className="col-span-full text-center py-12 pl-12 text-[#555]">
                No se encontraron programas que coincidan con tu búsqueda.
            </div>
         );
     }
    

    return (
        <main className="flex-1 p-5">
            <p className="text-[12px] text-[#999] mb-3">
                Mostrando {filtered.length} {filtered.length === 1 ? "programa" : "programas"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filtered.map(program => (
                    <ProgramCard key={program.id} program={program} onSignUp={onSignUp} />
                ))}
            </div>
        </main>

);}