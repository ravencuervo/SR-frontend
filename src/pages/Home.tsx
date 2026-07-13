import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, BookOpen, Users, Trophy, ChevronRight, Award, Building, Monitor, Star, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Noticia } from "@/data/noticias";
import { type Evento } from "@/data/eventos";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const API_URL = import.meta.env.VITE_API_URL;

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center shadow-xl">
        <span className="text-4xl md:text-5xl font-bold text-white tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/60">{label}</span>
    </div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function StatCounter({ end, label, icon: Icon, suffix = "" }: { end: number, label: string, icon: any, suffix?: string }) {
  // A simple counting effect could go here, for static mock we'll just display
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
      <div className="p-4 bg-primary/5 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-4xl font-bold text-slate-900 mb-1 flex items-baseline">
        {end}{suffix}
      </h3>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function CountdownAndPromo() {
  const target = new Date("2025-03-10T08:00:00");
  const { days, hours, minutes, seconds } = useCountdown(target);
  return (
    <section className="py-0">
      {/* Countdown */}

      {/* Vida Escolar promo banner */}
      <div className="bg-gradient-to-r from-secondary/10 via-white to-primary/10 border-y border-slate-200 py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
              <Star className="w-7 h-7 text-white fill-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Exclusivo en nuestro portal</span>
              <h4 className="text-xl font-bold text-slate-900">Descubre cómo es un día en la IES Santa Rosa</h4>
              <p className="text-slate-500 text-sm">Recorrido hora a hora, sala de trofeos y el mural de sueños de nuestros estudiantes.</p>
            </div>
          </div>
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 font-bold shrink-0">
            <Link href="/vida-escolar">
              Explorar Vida Escolar <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Noticias
        const resNoticias = await fetch(`${API_URL}/api/noticias?populate=*&pagination[limit]=3&sort[0]=fecha:desc`);
        const dataNoticias = await resNoticias.json();
        const mappedNoticias: Noticia[] = dataNoticias.data.map((item: any) => ({
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

        // Fetch Eventos
        const resEventos = await fetch(`${API_URL}/api/eventos?populate=*&pagination[limit]=3&sort[0]=fecha:asc`);
        const dataEventos = await resEventos.json();
        const mappedEventos: Evento[] = dataEventos.data.map((item: any) => ({
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
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const recentNews = noticias;
  const upcomingEvents = eventos;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/portada/portada.jpg"
            alt="Campus IES Santa Rosa Puno"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 via-[#0a192f]/70 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-4">
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance">
                Formando <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Líderes</span><br /> para el Futuro del Perú
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
                Excelencia académica, investigación e innovación desde el corazón de los Andes. Únete a la comunidad educativa más prestigiosa de la región Puno.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="text-base h-14 px-8 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full border-none">
                  <Link href="/convocatorias">
                    Convocatorias Institucionales
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base h-14 px-8 rounded-full border-2 bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white">
                  <Link href="/nosotros">Conócenos</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50 relative -mt-10 z-20 rounded-t-[3rem] px-4 border-b border-slate-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter end={90} suffix="+" label="Años de Trayectoria" icon={Building} />
            <StatCounter end={500} suffix="+" label="Estudiantes Activos" icon={Users} />
            <StatCounter end={25} label="Docentes Activos" icon={BookOpen} />
            <StatCounter end={100} suffix="%" label="Acreditación Institucional" icon={Award} />
          </div>
        </div>
      </section>

      {/* Countdown + Vida Escolar promo */}
      <CountdownAndPromo />

      {/* Quick Links / Sistemas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Plataformas y Servicios</h2>
            <p className="text-slate-500 text-lg">Acceso directo a las herramientas digitales para nuestra comunidad académica.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <a href="https://20df9ec1-2f41-4853-a741-3ccd0ef725c6-00-1kwcuf3tugs9h.picard.replit.dev/login" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-slate-200 group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Monitor className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Intranet Institucional</h3>
                  <p className="text-slate-500 mb-4">Portal para estudiantes y docentes. Notas, matrículas y trámites.</p>
                  <span className="text-primary font-semibold flex items-center text-sm group-hover:underline">
                    Ingresar <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </a>
            <a href="https://20df9ec1-2f41-4853-a741-3ccd0ef725c6-00-1kwcuf3tugs9h.picard.replit.dev/login" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-slate-200 group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Aula Virtual</h3>
                  <p className="text-slate-500 mb-4">Accede a tus cursos, materiales, tareas y evaluaciones en línea.</p>
                  <span className="text-secondary font-semibold flex items-center text-sm group-hover:underline">
                    Ingresar <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </a>
            <a href="http://bibliotecamunicipal.munipuno.gob.pe/biblioteca/opac_css/" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-slate-200 group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Biblioteca Digital</h3>
                  <p className="text-slate-500 mb-4">Repositorio de tesis, libros y bases de datos académicas mundiales.</p>
                  <span className="text-green-600 font-semibold flex items-center text-sm group-hover:underline">
                    Ingresar <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Noticias y Eventos */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Noticias */}
            <div className="lg:col-span-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-1 block">Actualidad</span>
                  <h2 className="text-3xl font-bold text-slate-900">Noticias Institucionales</h2>
                </div>
                <Button variant="ghost" asChild className="hidden sm:flex group">
                  <Link href="/noticias">
                    Ver todas <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentNews.map((noticia, idx) => (
                  <div key={noticia.id} onClick={() => setSelectedNoticia(noticia)} className={idx === 0 ? 'md:col-span-2' : ''}>
                    <Card className={`overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer group`}>
                      <div className="relative">
                        <div className={`overflow-hidden ${idx === 0 ? 'aspect-video' : 'aspect-[4/3]'}`}>
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
                      <CardContent className="p-6 bg-white">
                        <div className="flex items-center text-slate-500 text-sm mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          {noticia.fecha}
                        </div>
                        <h3 className={`font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors ${idx === 0 ? 'text-2xl' : 'text-lg'}`}>
                          {noticia.titulo}
                        </h3>
                        <p className="text-slate-600 line-clamp-2">{noticia.resumen}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              <Button variant="outline" asChild className="w-full mt-6 sm:hidden">
                <Link href="/noticias">Ver todas las noticias</Link>
              </Button>
            </div>

            {/* Eventos */}
            <div className="lg:col-span-4">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-1 block">Agenda</span>
                  <h2 className="text-3xl font-bold text-slate-900">Próximos Eventos</h2>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((evento) => (
                  <Card key={evento.id} className="overflow-hidden hover:shadow-md transition-shadow group border-l-4 border-l-primary">
                    <CardContent className="p-0 flex">
                      <div className="w-1/3 bg-slate-100 flex flex-col items-center justify-center p-4 border-r border-slate-100">
                        <span className="text-sm font-bold text-slate-500 uppercase">{evento.fecha.split(' ')[2]}</span>
                        <span className="text-3xl font-bold text-primary leading-none">{evento.fecha.split(' ')[0]}</span>
                        <span className="text-xs font-medium text-slate-400 mt-1 uppercase">{evento.fecha.split(' ')[2]}</span>
                      </div>
                      <div className="w-2/3 p-4 flex flex-col justify-center bg-white">
                        <span className="text-xs font-bold text-secondary uppercase mb-1">{evento.tipo}</span>
                        <h4 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {evento.titulo}
                        </h4>
                        <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="w-3 h-3 mr-1" /> {evento.hora}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" asChild className="w-full mt-6 border-slate-200">
                <Link href="/eventos">Ver calendario completo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
                <div className="prose prose-slate max-w-none prose-lg">
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
