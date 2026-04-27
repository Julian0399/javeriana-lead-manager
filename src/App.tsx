import './App.css'
import ProgramCard from './components/ProgramCard'
import { useEffect } from 'react'
import { fetchPrograms,setSearchQuery } from './features/programs/programsSlice'
import { useAppDispatch,useAppSelector } from './hooks/useAppDispatch'
import type { Program } from './types/index'
import Navbar from './components/Navbar'

function App() {
  const dispatch = useAppDispatch();
  const {items,loading,error,searchQuery} = useAppSelector(state => state.programs)

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const handleSignUp = (program: Program) => {
    alert(`Inscribirse en: ${program.title}`);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => dispatch(setSearchQuery(q))}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(program => (
          <ProgramCard key={program.id} program={program} onSignUp={handleSignUp} />
        ))}
      </div>
    </div>
      
  )
}

export default App
