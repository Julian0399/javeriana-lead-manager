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
  id: number;
  name: string;
  email: string;
  phone: string;
  programId: number;
  programName: string;
  createdAt: Date;
}

export interface ProgramsState {
  items: Program[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: ProgramCategory | "All";
}

export interface LeadsState {
  items: Lead[];
  loading: boolean;
  error: string | null;
}
