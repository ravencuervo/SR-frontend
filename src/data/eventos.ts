export interface Evento {
  id: string;
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
  descripcion: string;
  tipo: "Académico" | "Cultural" | "Deportivo" | "Institucional";
}

export const EVENTOS: Evento[] = [];
