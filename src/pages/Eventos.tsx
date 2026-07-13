import { Link } from "wouter";
import { ChevronRight, CalendarDays, Clock, MapPin, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { type Evento } from "@/data/eventos";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = "http://localhost:1337";

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await fetch(`${API_URL}/api/eventos?populate=*`);
        const { data } = await response.json();
        
        const mappedEventos: Evento[] = data.map((item: any) => ({
          id: item.id.toString(),
          titulo: item.titulo,
          fecha: new Date(item.fecha).toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
          }),
          hora: item.hora,
          lugar: item.lugar,
          descripcion: item.descripcion,
          tipo: item.tipo
        }));

        setEventos(mappedEventos);
      } catch (error) {
        console.error("Error cargando eventos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventos();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Cargando calendario de eventos...</p>
      </div>
    );
  }
  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/portada/portada5.jpg" alt="Eventos" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center text-primary-foreground/70 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Eventos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Calendario de Eventos</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Participa en nuestras actividades académicas, culturales y deportivas diseñadas para toda la comunidad santarrosina.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {eventos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500">No hay eventos programados en este momento.</p>
            </div>
          ) : (
            eventos.map((evento) => (
              <Card key={evento.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 group relative">
                {/* Type indicator bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${
                  evento.tipo === 'Académico' ? 'bg-primary' : 
                  evento.tipo === 'Cultural' ? 'bg-secondary' : 
                  evento.tipo === 'Deportivo' ? 'bg-green-500' : 'bg-orange-500'
                }`}></div>
                
                <CardContent className="p-0 sm:flex pl-2">
                  {/* Date block */}
                  <div className="bg-slate-50 sm:w-48 p-6 flex flex-col justify-center items-center text-center border-b sm:border-b-0 sm:border-r border-slate-200 shrink-0">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{evento.fecha.split(' ')[2]}</span>
                    <span className="text-5xl font-bold text-slate-900 my-1">{evento.fecha.split(' ')[0]}</span>
                    <span className="text-sm font-semibold text-slate-600 uppercase">{evento.fecha.split(' ')[2]}</span>
                  </div>
                  
                  {/* Content block */}
                  <div className="p-6 sm:p-8 flex-1 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`inline-flex items-center text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${
                          evento.tipo === 'Académico' ? 'bg-primary/10 text-primary' : 
                          evento.tipo === 'Cultural' ? 'bg-secondary/10 text-secondary' : 
                          evento.tipo === 'Deportivo' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          <Tag className="w-3 h-3 mr-1" />
                          {evento.tipo}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {evento.titulo}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6">
                      {evento.descripcion}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-medium text-slate-600">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-slate-400" />
                        {evento.hora}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-slate-400" />
                        {evento.lugar}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
