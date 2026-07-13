export interface Noticia {
  id: string;
  titulo: string;
  fecha: string;
  resumen: string;
  contenido?: string;
  imagen: string;
  categoria: string;
}

export const NOTICIAS: Noticia[] = [];
