import { Link } from "wouter";
import { ChevronRight, FileText, Download, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { type Reglamento } from "@/data/reglamentos";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_URL = import.meta.env.VITE_API_URL;

export default function Reglamentos() {
  const [reglamentos, setReglamentos] = useState<Reglamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchReglamentos() {
      try {
        const response = await fetch(`${API_URL}/api/reglamentos?populate=*&sort[0]=titulo:asc`);
        const { data } = await response.json();
        
        const mapped: Reglamento[] = data.map((item: any) => ({
          id: item.id.toString(),
          titulo: item.titulo,
          descripcion: item.descripcion,
          archivoUrl: item.archivo ? `${API_URL}${item.archivo.url}` : "#"
        }));

        setReglamentos(mapped);
      } catch (error) {
        console.error("Error cargando reglamentos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReglamentos();
  }, []);

  const filteredReglamentos = reglamentos.filter(reg => 
    reg.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (reg.descripcion && reg.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Cargando reglamentos...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/portada/portada3.jpg" alt="Reglamentos" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Reglamentos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Reglamentos y Documentos</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Consulta los marcos normativos, reglamentos internos y documentos de gestión de nuestra institución.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              type="text"
              placeholder="Buscar por título o descripción..."
              className="pl-12 h-14 bg-white border-slate-200 shadow-sm rounded-xl text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredReglamentos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No se encontraron documentos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredReglamentos.map((reg) => (
                <Card key={reg.id} className="border-slate-200 hover:shadow-md transition-shadow group bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                      <div className="w-14 h-14 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{reg.titulo}</h3>
                        {reg.descripcion && (
                          <p className="text-slate-500 text-sm">{reg.descripcion}</p>
                        )}
                      </div>
                      <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white shrink-0">
                        <a href={reg.archivoUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar PDF
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
