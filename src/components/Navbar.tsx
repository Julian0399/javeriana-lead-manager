import logo from '../assets/Logo-PUJ-Bogota-90.svg';

interface Props {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange }: Props) {
    return (
        <nav className="bg-primary h-18 flex items-center justify-between gap-4 px-6 border-b border-gray-200">

            <div className="flex items-center gap-2 shrink-0">
                <img src={logo} alt="Logo Javeriana" className="w-42 p-1"/>
                <span className="text-white text-sm font-extrabold">Lead Manager</span>
            </div>

            <div className="relative flex-1 max-w-[380px]">
                <svg
          className="absolute left-[9px] top-1/2 -translate-y-1/2 w-[13px] h-[13px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
            <input type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar Programa..."
            className="w-full h-8 rounded-lg bg-white/15 text-white text-[12px] placeholder:text-white/50 pl-8 pr-3 outline-none" />
            </div>
        </nav>
    )
}   