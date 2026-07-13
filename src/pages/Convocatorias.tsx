import { Link } from "wouter";
import { ChevronRight, FileText, CalendarDays, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { type Convocatoria } from "@/data/convocatorias";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const API_URL = "http://localhost:1337";

export default function Convocatorias() {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConvocatorias() {
      try {
        const response = await fetch(`${API_URL}/api/convocatorias?populate=*&sort[0]=createdAt:desc`);
        const { data } = await response.json();
        
        const mapped: Convocatoria[] = data.map((item: any) => {
          const fechaFinRaw = new Date(item.fechaFin);
          const hoy = new Date();
          // Reset hours for comparison
          hoy.setHours(0, 0, 0, 0);
          
          let estadoCalculado = item.estado;
          if (hoy > fechaFinRaw) {
            estadoCalculado = "Cerrada";
          } else if (item.estado === "Vigente") {
            estadoCalculado = "Abierta";
          }

          return {
            id: item.id.toString(),
            titulo: item.titulo,
            tipo: item.tipo,
            estado: estadoCalculado,
            fechaInicio: new Date(item.fechaInicio).toLocaleDateString('es-ES'),
            fechaFin: new Date(item.fechaFin).toLocaleDateString('es-ES'),
            descripcion: item.descripcion,
            linkPostulacion: item.linkPostulacion,
            linkBases: item.linkBases
          };
        });

        setConvocatorias(mapped);
      } catch (error) {
        console.error("Error cargando convocatorias:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchConvocatorias();
  }, []);

  const getStatusColor = (estado: string) => {
    switch(estado) {
      case "Abierta": 
      case "Vigente": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Cerrada": return "bg-red-100 text-red-800 hover:bg-red-100";
      case "En Evaluación": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      default: return "bg-slate-100 text-slate-800 hover:bg-slate-100";
    }
  };

  const getStatusIcon = (estado: string) => {
    switch(estado) {
      case "Abierta":
      case "Vigente": return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case "Cerrada": return <XCircle className="w-4 h-4 mr-1" />;
      case "En Evaluación": return <AlertCircle className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Cargando convocatorias...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/portada/portada6.jpg" alt="Convocatorias" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Convocatorias</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Convocatorias</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Oportunidades laborales, concursos docentes y becas para integrar y beneficiar a nuestra comunidad.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {convocatorias.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-lg">No hay convocatorias vigentes en este momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {convocatorias.map((conv) => (
                <Card key={conv.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full bg-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {conv.tipo}
                      </span>
                      <Badge variant="secondary" className={`flex items-center font-bold px-3 py-1 ${getStatusColor(conv.estado)}`}>
                        {getStatusIcon(conv.estado)}
                        {conv.estado}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                      {conv.titulo}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 flex-1 text-sm md:text-base">
                      {conv.descripcion}
                    </p>
                    
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-slate-600">
                          <CalendarDays className="w-4 h-4 mr-2 text-slate-400" />
                          <span><strong>Inicio:</strong> {conv.fechaInicio}</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <CalendarDays className="w-4 h-4 mr-2 text-slate-400" />
                          <span><strong>Cierre:</strong> {conv.fechaFin}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex gap-3">
                      <Button 
                        variant="default" 
                        className="w-full" 
                        disabled={conv.estado !== 'Abierta' && conv.estado !== 'Vigente'}
                        asChild={!!conv.linkPostulacion && (conv.estado === 'Abierta' || conv.estado === 'Vigente')}
                      >
                        {(conv.linkPostulacion && (conv.estado === 'Abierta' || conv.estado === 'Vigente')) ? (
                          <a href={conv.linkPostulacion} target="_blank" rel="noopener noreferrer">
                            Postular
                          </a>
                        ) : (
                          <span>Postular</span>
                        )}
                      </Button>
                      <Button variant="outline" className="px-4" asChild={!!conv.linkBases}>
                        {conv.linkBases ? (
                          <a href={conv.linkBases} target="_blank" rel="noopener noreferrer" title="Ver Bases">
                            <FileText className="w-4 h-4" />
                          </a>
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
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
