import { Link } from "wouter";
import { ChevronRight, Calendar, ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { type Noticia } from "@/data/noticias";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const API_URL = import.meta.env.VITE_API_URL;

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [pagination, setPagination] = useState<{ page: number; pageCount: number; total: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Cantidad de noticias por página

  useEffect(() => {
    async function fetchNoticias() {
      setLoading(true);
      try {
        // Solicitamos a Strapi la página actual con el límite definido
        const response = await fetch(`${API_URL}/api/noticias?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort[0]=fecha:desc`);
        const { data, meta } = await response.json();
        
        const mappedNoticias: Noticia[] = data.map((item: any) => ({
          id: item.id.toString(),
          titulo: item.titulo,
          fecha: new Date(item.fecha).toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
          }),
          resumen: item.resumen,
          contenido: item.contenido,
          imagen: item.imagen ? `${API_URL}${item.imagen.url}` : "/images/placeholder.png",
          categoria: item.categoria
        }));

        setNoticias(mappedNoticias);
        if (meta && meta.pagination) {
          setPagination(meta.pagination);
        }
      } catch (error) {
        console.error("Error cargando noticias:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNoticias();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Cargando noticias...</p>
      </div>
    );
  }

  if (noticias.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">No hay noticias publicadas</h2>
        <p className="text-slate-600">Vuelve más tarde para ver las novedades de nuestra institución.</p>
        <Link href="/" className="mt-6 text-primary hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  // En la página 1, la primera noticia es la destacada
  const noticiaDestacada = currentPage === 1 ? noticias[0] : null;
  // Si estamos en la página 1, el grid empieza desde la segunda noticia
  // Si estamos en otra página, mostramos todas las noticias de esa página en el grid
  const noticiasGrid = currentPage === 1 ? noticias.slice(1) : noticias;

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/portada/portada4.jpg" alt="Noticias" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Noticias</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Noticias Institucionales</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Mantente informado sobre los últimos acontecimientos, logros y novedades de nuestra casa de estudios.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        {/* Noticia Destacada (Solo en la página 1) */}
        {noticiaDestacada && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Destacado</h2>
            <Card className="overflow-hidden border-none shadow-xl bg-white group cursor-pointer" onClick={() => setSelectedNoticia(noticiaDestacada)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="relative overflow-hidden aspect-video lg:aspect-auto">
                  <img
                    src={noticiaDestacada.imagen}
                    alt={noticiaDestacada.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {noticiaDestacada.categoria}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {noticiaDestacada.fecha}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors leading-tight">
                    {noticiaDestacada.titulo}
                  </h3>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed line-clamp-3">
                    {noticiaDestacada.resumen}
                  </p>
                  <Button
                    data-testid="button-read-featured"
                    className="w-fit bg-primary hover:bg-primary/90 rounded-full px-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNoticia(noticiaDestacada);
                    }}
                  >
                    Leer noticia completa
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Grid de Noticias */}
        {noticiasGrid.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {currentPage === 1 ? 'Últimas Publicaciones' : `Noticias - Página ${currentPage}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticiasGrid.map((noticia) => (
                <Card 
                  key={noticia.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border-slate-200 flex flex-col"
                  onClick={() => setSelectedNoticia(noticia)}
                >
                  <div className="relative">
                    <div className="aspect-4/3 overflow-hidden">
                      <img
                        src={noticia.imagen}
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {noticia.categoria}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-white flex flex-col flex-1">
                    <div className="flex items-center text-slate-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {noticia.fecha}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {noticia.titulo}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3 flex-1">{noticia.resumen}</p>
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNoticia(noticia);
                      }}
                    >
                      Leer más
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {pagination && pagination.pageCount > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                disabled={pagination.page === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Anterior
              </Button>
              {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((p) => (
                <Button 
                  key={p} 
                  variant={pagination.page === p ? "default" : "outline"}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button 
                variant="outline" 
                disabled={pagination.page === pagination.pageCount}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}

      </div>

      {/* Modal de Noticia Completa */}
      <Dialog open={!!selectedNoticia} onOpenChange={(open) => !open && setSelectedNoticia(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedNoticia?.titulo}</DialogTitle>
            <DialogDescription>{selectedNoticia?.resumen}</DialogDescription>
          </DialogHeader>
          {selectedNoticia && (
            <div className="flex flex-col">
              <div className="relative h-64 md:h-96 w-full">
                <img 
                  src={selectedNoticia.imagen} 
                  alt={selectedNoticia.titulo} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedNoticia(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedNoticia.categoria}
                  </span>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedNoticia.fecha}
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
                  {selectedNoticia.titulo}
                </h2>
                <div className="prose prose-slate max-w-none prose-lg prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900">
                  {/* Aquí renderizamos el contenido. Como Strapi usa Markdown o Blocks, 
                      por ahora lo mostramos como texto con saltos de línea. */}
                  {selectedNoticia.contenido ? (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedNoticia.contenido}
                    </div>
                  ) : (
                    <p className="italic text-slate-400">Esta noticia no tiene contenido adicional.</p>
                  )}
                </div>
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedNoticia(null)}
                    className="rounded-full px-8"
                  >
                    Cerrar noticia
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
