import type { Program } from "../types/index";

interface Props {
  program: Program;
  onSignUp: (program: Program) => void;
}

export default function ProgramCard({ program, onSignUp }: Props) {
  return (
    <article className="rounded-[14px] overflow-hidden border border-[#e0e0e0] flex flex-col bg-white hover:scale-[1.02] transition-transform duration-200">

      <div className="relative h-32">
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 to-primary/82"/>

          <span className="absolute top-2.5 left-2.5 text-[8px] font-medium text-white bg-white/20 border border-white/35 px-2.5 py-1 rounded-full tracking-wide ">
            {program.category}
          </span>

          <h2 className="absolute bottom-2.5 left-3 right-3 text-[14px] font-medium text-white leading-snug">
            {program.title}
          </h2>
        </div>

        <div className="flex flex-col gap-2 p-3.5 flex-1">
          <div className="flex gap-3">

            <div className="flex items-center gap-1 text-[12px] text-[#777]">
              <svg
                className="w-3 h-3 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2C5697"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              {program.duration}
            </div>

            <div className="flex items-center gap-1 text-[12px] text-[#777]">
              {program.modality.toLowerCase().includes("virtual") ? (
                <svg
                  className="w-3 h-3 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C5697"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C5697"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              )}
              {program.modality}
            </div>

          </div>

          <button
            onClick={() => onSignUp(program)}
            className="mt-auto w-full py-2 bg-accent rounded-lg text-[12px] font-medium text-[#1a1200] tracking-wide hover:bg-accent-dark transition-colors duration-150 cursor-pointer"
          >
            Inscribirte
          </button>
        </div>
    </article>
  );
}
