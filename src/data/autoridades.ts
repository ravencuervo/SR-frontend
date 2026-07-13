export interface Autoridad {
  id: string;
  nombre: string;
  cargo: string;
  grado: string;
  imagen: string;
  area?: string;
  mensaje?: string;
}

export const AUTORIDADES_DIRECCION: Autoridad[] = [];
export const AUTORIDADES_ADMIN: Autoridad[] = [];
export const DOCENTES: Autoridad[] = [];
export const AUTORIDADES = [];
