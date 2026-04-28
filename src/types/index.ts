export type ProgramCategory =
  | "Pregrado"
  | "Posgrado"
  | "Doctorado"
  | "Programas Eclesiasticos"
  | "Educación Continua"
  | "Técnico Laboral";

export interface Program {
  id: number;
  title: string;
  description: string;
  category: ProgramCategory;
  faculty: string;
  duration: string;
  credits: number | null;
  modality: string;
  imageUrl: string;
  url: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  programId: number;
  programName: string;
  createdAt: string;
}

export interface ProgramsState {
  items: Program[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: ProgramCategory | "Todas";
}

export interface LeadsState {
  items: Lead[];
  loading: boolean;
  error: string | null;
}
