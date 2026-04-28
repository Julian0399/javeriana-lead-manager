import "./App.css";
import { useEffect, useMemo, useState } from "react";
import {
  fetchPrograms,
  setSearchQuery,
} from "./features/programs/programsSlice";
import { useAppDispatch, useAppSelector } from "./hooks/useAppDispatch";
import type { Program } from "./types/index";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import ProgramList from "./components/ProgramList";
import LeadForm from "./components/LeadForm";

function App() {
  const dispatch = useAppDispatch();
  const { items, loading, error, searchQuery } = useAppSelector(
    (state) => state.programs,
  );
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { Todas: items.length };
    items.forEach((program) => {
      result[program.category] = (result[program.category] ?? 0) + 1;
    });
    return result;
  }, [items]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando programas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error al cargar programas: {error}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => dispatch(setSearchQuery(q))}
      />
      <Hero total={items.length} />
      <div className="flex flex-1">
        <Sidebar counts={counts} />
        <ProgramList onSignUp={(p) => setSelectedProgram(p)} />
      </div>
      {selectedProgram && (
        <LeadForm
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
}

export default App;
