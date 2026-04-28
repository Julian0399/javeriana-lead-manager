import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addLead } from "../features/leads/leadsSlice";
import type { Program, Lead } from "../types";
import {
  capitalize,
  validateLeadForm,
  normalizePhone,
} from "../utils/normalizers";

interface Props {
  program: Program;
  onClose: () => void;
}
interface FormFields {
  fullName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export default function LeadForm({ program, onClose }: Props) {
  const dispatch = useAppDispatch();

  const [fields, setFields] = useState<FormFields>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = () => {
  const validationErrors = validateLeadForm(fields)
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }

  const lead: Lead = {
    id: crypto.randomUUID(),
    fullName: capitalize(fields.fullName),
    email: fields.email.trim().toLowerCase(),
    phone: normalizePhone(fields.phone),
    programId: program.id,
    programName: program.title,
    createdAt: new Date().toISOString(),
  }

  dispatch(addLead(lead))
  setSubmitting(true)
}

  if (submitting) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2x1 w-full max-w-md p-8 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div>
            <h2 className="text-[18px] font-medium text-gray-900 mb-1">
              !Registro exitoso¡
            </h2>
            <p className="text-[14px] text-gray-500">
              Tu interes en el programa <strong>{program.title}</strong> ha sido
              registrado. Nos pondremos en contacto contigo pronto.
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-2 w-full py-2.5 bg-primary text-white text-[14px] font-medium rounded-x1 hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="bg-primary px-6 py-5 relative">
          <div className="w-6 h-0.5 bg-accent rounded-full mb-2" />
          <h2 className="text-white text-[16px] font-medium">
            Inscribete ahora
          </h2>
          <p className="text-white/60 text-[12px] mt-0.5">{program.title}</p>
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
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">
              {" "}
              Nombre Completo
            </label>
            <input
              type="text"
              name="fullName"
              value={fields.fullName}
              onChange={handleChange}
              placeholder="Ej. Julian Rodriguez"
              className={`w-full h-10 rounded-lg border px-3 text-[13px] outline-none transition-colors
                ${
                  errors.fullName
                    ? "border-red-400 bg-red-50"
                    : "border-muted focus:border-primary"
                }`}
            />
            {errors.fullName && (
              <p className="text-[12px] text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">
              Correo Institucional
            </label>
            <input
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="Ej. julian@javeriana.edu.co"
              className={`w-full h-10 rounded-lg border px-3 text-[13px] outline-none transition-colors
                ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-muted focus:border-primary"
                }`}
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">
              Número de Teléfono
            </label>
            <input
              type="text"
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              placeholder="Ej. 3123456789"
              className={`w-full h-10 rounded-lg border px-3 text-[13px] outline-none transition-colors
                ${
                  errors.phone
                    ? "border-red-400 bg-red-50"
                    : "border-muted focus:border-primary"
                }`}
            />
            {errors.phone && (
              <p className="text-[12px] text-red-500">{errors.phone}</p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full pt-2.5 bg-accent hover:bg-accent-dark text-white text-[14px] font-medium rounded-x1 transition-colors cursor-pointer mt-1 pb-2 border-4 rounded-lg border-transparent hover:border-accent-dark"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
