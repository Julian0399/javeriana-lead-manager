interface Props {
  total: number
}

export default function Hero({ total }: Props) {
  return (
    <div className="bg-primary px-6 py-6 text-center relative overflow-hidden">

      <div className="absolute left-1/2 -top-16 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-accent/[0.07] pointer-events-none" />
      <div className="w-8 h-[2px] bg-accent rounded-full mx-auto mb-2.5" />
      <h1 className="text-accent text-2xl font-medium mb-1.5">
        Nuestros Programas Académicos
      </h1>
      <p className="text-white/60 text-[12px] mb-4">
        Generamos experiencias educativas que transforman vidas y construyen el país.
      </p>

      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-accent text-[18px] font-medium">{total}</span>
          <span className="text-white/55 text-[12px]">Programas</span>
        </div>
        <div className="w-px self-stretch bg-white/20" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-accent text-[18px] font-medium">3</span>
          <span className="text-white/55 text-[12px]">Modalidades</span>
        </div>
      </div>

    </div>
  )
}