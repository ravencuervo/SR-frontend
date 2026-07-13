import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChevronRight, Target, Eye, GraduationCap, Users, BookOpen,
  Calculator, MessageSquare, FlaskConical, Globe, Dumbbell,
  Music, Heart, Wrench, Languages, Star, Network, type LucideIcon
} from "lucide-react";
import { type Autoridad } from "@/data/autoridades";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const API_URL = "http://localhost:1337";

const ICON_MAP: Record<string, LucideIcon> = {
  Calculator, MessageSquare, FlaskConical, Globe, Dumbbell,
  Music, Heart, Wrench, Languages, Star
};

interface Curso {
  id: string;
  area: string;
  descripcion: string;
  color: string;
  accent: string;
  iconName: string;
}

function AutoridadCard({ autoridad }: { autoridad: Autoridad }) {
  return (
    <Card className="overflow-hidden border-slate-200 shadow-md hover:shadow-lg transition-shadow group">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="w-full sm:w-2/5 shrink-0 h-52 sm:h-auto overflow-hidden">
          <img
            src={autoridad.imagen}
            alt={autoridad.nombre}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center">
          <span className="text-primary font-bold uppercase tracking-wider text-xs mb-2 block">{autoridad.cargo}</span>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{autoridad.nombre}</h3>
          <p className="text-slate-500 text-sm">{autoridad.grado}</p>
        </div>
      </div>
    </Card>
  );
}

export default function Nosotros() {
  const [autoridadesDireccion, setAutoridadesDireccion] = useState<Autoridad[]>([]);
  const [autoridadesAdmin, setAutoridadesAdmin] = useState<Autoridad[]>([]);
  const [docentes, setDocentes] = useState<Autoridad[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Autoridades
        const resAut = await fetch(`${API_URL}/api/autoridades?populate=*`);
        const dataAut = await resAut.json();
        const mappedAut: Autoridad[] = dataAut.data.map((item: any) => ({
          id: item.id.toString(),
          nombre: item.nombre,
          cargo: item.cargo,
          grado: item.grado,
          imagen: item.imagen ? `${API_URL}${item.imagen.url}` : "/images/placeholder.png",
          area: item.area,
          mensaje: item.mensaje,
          tipo: item.tipo
        }));

        setAutoridadesDireccion(mappedAut.filter((a: any) => a.tipo === "Dirección"));
        setAutoridadesAdmin(mappedAut.filter((a: any) => a.tipo === "Administrativa"));
        setDocentes(mappedAut.filter((a: any) => a.tipo === "Docente"));

        // Fetch Cursos
        const resCur = await fetch(`${API_URL}/api/cursos?populate=*`);
        const dataCur = await resCur.json();
        const mappedCur: Curso[] = dataCur.data.map((item: any) => ({
          id: item.id.toString(),
          area: item.area,
          descripcion: item.descripcion,
          color: item.color,
          accent: item.accent,
          iconName: item.icon_name
        }));
        setCursos(mappedCur);

      } catch (error) {
        console.error("Error fetching data for Nosotros:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Cargando información institucional...</p>
      </div>
    );
  }
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/portada/portada3.jpg" alt="Nosotros" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center text-primary-foreground/70 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Nosotros</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Nosotros</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Conoce nuestra filosofía institucional, nuestras autoridades y la oferta académica que brindamos a los jóvenes de Puno.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="identidad" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 bg-white border border-slate-200 p-1 h-auto">
              <TabsTrigger value="identidad" className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm py-3 flex items-center gap-2">
                <Target className="w-4 h-4" /> Identidad
              </TabsTrigger>
              <TabsTrigger value="autoridades" className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm py-3 flex items-center gap-2">
                <Users className="w-4 h-4" /> Autoridades
              </TabsTrigger>
              <TabsTrigger value="cursos" className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm py-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Cursos
              </TabsTrigger>
              <TabsTrigger value="organigrama" className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm py-3 flex items-center gap-2">
                <Network className="w-4 h-4" /> Organigrama
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ── IDENTIDAD ── */}
          <TabsContent value="identidad" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              <Card className="border-none shadow-lg overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
                <CardContent className="p-10 md:p-12">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 text-secondary group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Nuestra Misión</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    La misión institucional está orientada a la formación integral de las estudiantes mediante el desarrollo de competencias académicas, científicas, tecnológicas y humanísticas, fortaleciendo valores, liderazgo, responsabilidad social y compromiso con el desarrollo regional y nacional. Asimismo, promueve una educación basada en principios éticos y en el respeto a la dignidad humana.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                <CardContent className="p-10 md:p-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Nuestra Visión</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    La institución proyecta consolidarse como una comunidad educativa líder, reconocida por la excelencia académica, la innovación pedagógica y la formación de ciudadanas críticas, reflexivas y comprometidas con el desarrollo sostenible, capaces de responder a los desafíos locales, regionales y nacionales.
                  </p>
                </CardContent>
              </Card>

              <div className="md:col-span-2 mt-8">
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardContent className="p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Valores Institucionales</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { valor: "Responsabilidad", desc: "Compromiso con el deber y el trabajo bien hecho" },
                        { valor: "Respeto", desc: "Valoración de la dignidad y la diversidad" },
                        { valor: "Honestidad", desc: "Actuamos con verdad e integridad" },
                        { valor: "Solidaridad", desc: "Apoyo mutuo y compromiso social" },
                        { valor: "Justicia", desc: "Equidad y trato digno para todos" },
                        { valor: "Disciplina", desc: "Orden, constancia y perseverancia" },
                        { valor: "Liderazgo", desc: "Capacidad de influir positivamente" },
                        { valor: "Identidad cultural", desc: "Orgullo de nuestra herencia puneña" },
                        { valor: "Conciencia ambiental", desc: "Cuidado del entorno y el futuro" }
                      ].map(({ valor, desc }, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <GraduationCap className="w-7 h-7 text-primary" />
                          </div>
                          <span className="font-bold text-slate-800 mb-1">{valor}</span>
                          <span className="text-xs text-slate-500 text-center">{desc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── AUTORIDADES ── */}
          <TabsContent value="autoridades" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto space-y-16"
            >
              {/* Director General Destacado */}
              <div>
                <h2 className="text-xl font-bold text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-secondary inline-block rounded"></span>
                  Dirección
                </h2>
                {autoridadesDireccion.length > 0 ? (
                  <>
                    <Card className="overflow-hidden border-none shadow-xl bg-white mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                        <div className="md:col-span-2">
                          <div className="h-full min-h-[300px] w-full">
                            <img
                              src={autoridadesDireccion[0].imagen}
                              alt={autoridadesDireccion[0].nombre}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                          <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">{autoridadesDireccion[0].cargo}</span>
                          <h2 className="text-3xl font-bold text-slate-900 mb-2">{autoridadesDireccion[0].nombre}</h2>
                          <p className="text-slate-500 mb-6 font-medium">{autoridadesDireccion[0].grado}</p>
                          <div className="flex flex-col gap-6">
                            {autoridadesDireccion[0].mensaje && (
                              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 relative">
                                <div className="text-6xl text-primary/10 absolute top-2 left-4">"</div>
                                <p className="text-slate-700 italic relative z-10 text-lg leading-relaxed">
                                  {autoridadesDireccion[0].mensaje}
                                </p>
                              </div>
                            )}
                          </div>
                      </div>
                    </div>
                  </Card>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {autoridadesDireccion.slice(1).map((a) => (
                      <AutoridadCard key={a.id} autoridad={a} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 mb-12">
                  <p className="text-slate-500">Información de dirección no disponible.</p>
                </div>
              )}
            </div>

              {/* Plana Administrativa */}
              <div>
                <h2 className="text-xl font-bold text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-secondary inline-block rounded"></span>
                  Plana Administrativa
                </h2>
                {autoridadesAdmin.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {autoridadesAdmin.map((a) => (
                      <AutoridadCard key={a.id} autoridad={a} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white/50 rounded-xl border border-dashed border-slate-200 mb-6">
                    <p className="text-slate-500 text-sm">Próximamente información administrativa.</p>
                  </div>
                )}
              </div>

              {/* Plana Docente */}
              <div>
                <h2 className="text-xl font-bold text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-secondary inline-block rounded"></span>
                  Plana Docente
                </h2>
                {docentes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {docentes.map((doc) => (
                      <Card key={doc.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-4 p-5">
                          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                            <img
                              src={doc.imagen}
                              alt={doc.nombre}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Badge variant="outline" className="text-xs mb-1 border-primary/30 text-primary bg-primary/5">
                              {doc.area}
                            </Badge>
                            <h3 className="font-bold text-slate-900 leading-tight">{doc.nombre}</h3>
                            <p className="text-slate-500 text-xs mt-0.5">{doc.grado}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white/50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500 text-sm">Próximamente información docente.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* ── CURSOS ── */}
          <TabsContent value="cursos" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Áreas Curriculares</h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                  Nuestro plan de estudios sigue el currículo nacional del MINEDU para la Educación Básica Regular (EBR) — nivel secundaria, organizado en diez áreas curriculares.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cursos.map((curso, i) => {
                  const Icon = ICON_MAP[curso.iconName] || BookOpen;
                  
                  return (
                    <motion.div
                      key={curso.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <Card className={`border overflow-hidden hover:shadow-lg transition-shadow group ${curso.color}`}>
                        <CardContent className="p-6 flex gap-5 items-start">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: curso.accent }}
                          >
                            <Icon className="w-7 h-7" />
                          </div>
                          <div>
                            <h3 className="font-bold text-base mb-2 leading-snug">{curso.area}</h3>
                            <p className="text-sm leading-relaxed opacity-80">{curso.descripcion}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Grados que ofrecemos</h3>
                <p className="text-slate-600 mb-6">Educación Secundaria completa del 1° al 5° grado, en turno mañana.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["1° Grado", "2° Grado", "3° Grado", "4° Grado", "5° Grado"].map((g) => (
                    <span key={g} className="bg-primary text-white px-5 py-2 rounded-full font-semibold text-sm shadow-sm">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>
          {/* ── ORGANIGRAMA ── */}
          <TabsContent value="organigrama" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Organigrama Institucional</h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                  Estructura jerárquica y funcional de la Institución Educativa Secundaria Santa Rosa.
                </p>
              </div>

              <Card className="border-slate-200 shadow-xl overflow-hidden bg-white p-4 md:p-8">
                <div className="relative group cursor-zoom-in">
                  <img 
                    src="/images/organigrama/ORGANIGRAMA_INSTITUCIONAL_SR.png" 
                    alt="Organigrama Institucional IES Santa Rosa" 
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Clic para ampliar
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div> Órgano de Dirección
                    </h4>
                    <p className="text-slate-600">Liderado por la Dirección General, encargado de la gestión académica y administrativa.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div> Órgano Pedagógico
                    </h4>
                    <p className="text-slate-600">Integrado por coordinadores y docentes responsables del proceso de enseñanza-aprendizaje.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-400"></div> Órgano de Apoyo
                    </h4>
                    <p className="text-slate-600">Personal administrativo y de servicio que garantiza el funcionamiento operativo.</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
