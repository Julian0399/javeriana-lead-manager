import { useAppSelector } from "../hooks/useAppDispatch";

interface Props {
  onClose: () => void;
}

export default function LeadList({ onClose }: Props) {
  const leads = useAppSelector((state) => state.leads.items);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-primary px-6 py-5 relative">
          <div className="w-6 h-0.5 bg-accent rounded-full mb-2" />
          <h2 className="text-white text-[16px] font-medium">
            Lista de Leads Registrados
          </h2>
          <p className="text-white/60 text-[12px] mt-0.5">
            {leads.length} {leads.length === 1 ? "Interesado" : "Interesados"}{" "}
            registrados en total
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-105 overflow-auto">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <svg
                className="w-10 h-10 text-[#ddd] mb-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              <p className="text-[14px] text-[#999]">
                {" "}
                Aun no hay leads registrados.
              </p>
              <p className="text-[12px] text-[#bbb] mt-1">
                Los interesados aparecerán aquí una vez se inscriban.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#f0f0f0]">
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  className="flex items-start justify-between px-6 py-4 hover:bg-[#f9f9f9] transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-medium text-gray-800">
                      {lead.fullName}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      {lead.email}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      {lead.phone}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                    <span className="text-[10px] font-medium text-primary bg-[#e8edf5] px-2 py-0.5 rounded-full">
                      {lead.programName}
                    </span>
                    <span className="text-[10px] text-[#bbb]">
                      {new Date(lead.createdAt).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
