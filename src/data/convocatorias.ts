export interface Convocatoria {
  id: string;
  titulo: string;
  tipo: "Docente" | "Administrativo" | "Becas" | "Investigación";
  estado: "Vigente" | "Cerrada" | "En Evaluación";
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  linkPostulacion?: string;
  linkBases?: string;
}

export const CONVOCATORIAS: Convocatoria[] = [];
