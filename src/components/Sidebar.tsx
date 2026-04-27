import type { ProgramCategory } from '../types'
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { setSelectedCategory } from '../features/programs/programsSlice'

const CATEGORIES: (ProgramCategory | 'Todas')[] = [
  'Todas',
  'Pregrado',
  'Posgrado',
  'Educación Continua',
]

interface Props {
  counts: Record<string, number>
}

export default function Sidebar({ counts }: Props) {
  const dispatch = useAppDispatch()
  const selectedCategory = useAppSelector(state => state.programs.selectedCategory)

  return (
    <aside className="w-48 shrink-0 bg-white border-r border-[#e0e0e0] p-[18px_14px] flex flex-col gap-4">
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
                ? 'bg-[#e8edf5] text-primary font-medium'
                : 'text-[#555] hover:bg-muted'
            }`}
          >
            <span>
              {category === 'Educación Continua' ? 'Ed. Continua' : category}
            </span>
            <span className={`text-[10px] rounded-full px-[7px] py-[1px] ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-[#f2f2f2] text-[#bbb]'
            }`}>
              {counts[category] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}