import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight, Sun, BookOpen, Coffee, Microscope, Heart,
  Dumbbell, Star, Music, Trophy, Quote
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────── */
const DIA_ESCOLAR = [
  {
    hora: "7:30", periodo: "AM",
    titulo: "Formación y Pabellón Nacional",
    descripcion: "El día comienza en el patio central. Estudiantes y docentes se reúnen bajo el mástil para el izamiento del Pabellón Nacional, entonando el Himno con orgullo altiplánico.",
    icon: Sun, color: "bg-amber-500", textColor: "text-amber-600", bg: "bg-amber-50 border-amber-200"
  },
  {
    hora: "8:00", periodo: "AM",
    titulo: "Primera a Tercera Hora",
    descripcion: "Las aulas cobran vida. Metodologías activas, debates, experimentos y trabajo colaborativo. Cada docente convierte el conocimiento en una experiencia memorable.",
    icon: BookOpen, color: "bg-primary", textColor: "text-primary", bg: "bg-blue-50 border-blue-200"
  },
  {
    hora: "10:15", periodo: "AM",
    titulo: "Recreo — 30 Minutos",
    descripcion: "El patio explota de energía. Amigos, risas, deporte espontáneo. El recreo es el corazón del día escolar, donde se forjan las amistades que duran toda la vida.",
    icon: Coffee, color: "bg-orange-500", textColor: "text-orange-600", bg: "bg-orange-50 border-orange-200"
  },
  {
    hora: "10:45", periodo: "AM",
    titulo: "Cuarta y Quinta Hora",
    descripcion: "Laboratorios de Ciencias, talleres de Arte y sesiones de Comunicación. El conocimiento toma formas distintas — pipetas, pinceles, micrófonos y debates apasionados.",
    icon: Microscope, color: "bg-green-600", textColor: "text-green-700", bg: "bg-green-50 border-green-200"
  },
  {
    hora: "12:15", periodo: "PM",
    titulo: "Almuerzo y Comunidad",
    descripcion: "La hora del almuerzo es también la hora de la comunidad. Compartir la mesa fortalece la identidad escolar y los lazos que definen a la familia Santa Rosa.",
    icon: Heart, color: "bg-secondary", textColor: "text-secondary", bg: "bg-red-50 border-red-200"
  },
  {
    hora: "1:00", periodo: "PM",
    titulo: "Tarde de Aprendizaje",
    descripcion: "Sexta y séptima hora para Matemáticas, Historia, Inglés y Formación Ciudadana. El pensamiento crítico se afila, se debate, se cuestiona y se construye.",
    icon: BookOpen, color: "bg-primary", textColor: "text-primary", bg: "bg-blue-50 border-blue-200"
  },
  {
    hora: "2:30", periodo: "PM",
    titulo: "Actividades Extracurriculares",
    descripcion: "Fútbol, básquet, coro, banda de música, robótica, club de debate y danza folclórica puneña. Aquí nacen los talentos que el Perú necesita — y los que Puno se enorgullece de ofrecer.",
    icon: Dumbbell, color: "bg-purple-600", textColor: "text-purple-700", bg: "bg-purple-50 border-purple-200"
  },
  {
    hora: "4:00", periodo: "PM",
    titulo: "Hasta Mañana",
    descripcion: "El día concluye con mochilas llenas de aprendizajes frescos y el corazón cargado de experiencias. Mañana, la misma energía, la misma pasión, la misma familia escolar.",
    icon: Star, color: "bg-amber-500", textColor: "text-amber-600", bg: "bg-amber-50 border-amber-200"
  },
];

type TrophyIconType = "trophy" | "soccer" | "microscope" | "microphone" | "dance" | "volleyball" | "book" | "bulb";

const TROFEOS: Array<{ titulo: string; detalle: string; periodo: string; icon: TrophyIconType }> = [
  { titulo: "Olimpiada Regional de Matemática", detalle: "12 medallas: oro, plata y bronce", periodo: "2019–2024", icon: "trophy" },
  { titulo: "Campeón Regional de Fútbol", detalle: "3 veces campeón consecutivo", periodo: "2021–2023", icon: "soccer" },
  { titulo: "Feria Escolar de Ciencias", detalle: "8 proyectos premiados a nivel regional", periodo: "2018–2024", icon: "microscope" },
  { titulo: "Concurso de Oratoria UGEL Puno", detalle: "5 primeros puestos regionales", periodo: "2020–2024", icon: "microphone" },
  { titulo: "Festividad de la Candelaria", detalle: "Representación oficial en el concurso folclórico", periodo: "2015–2024", icon: "dance" },
  { titulo: "Vóley Femenino Regional", detalle: "Subcampeones regionales", periodo: "2023", icon: "volleyball" },
  { titulo: "Concurso de Lectura MINEDU", detalle: "2 estudiantes clasificados a nivel nacional", periodo: "2022–2024", icon: "book" },
  { titulo: "Proyecto de Innovación Educativa", detalle: "Reconocimiento DRE Puno", periodo: "2024", icon: "bulb" },
];

const SUENOS = [
  { texto: "Quiero ser médica y trabajar aquí en Puno", grado: "5° Grado", rot: "-2deg", color: "from-red-50 to-red-100", border: "border-red-200" },
  { texto: "Sueño con estudiar Ingeniería Civil en la UNI", grado: "4° Grado", rot: "1.5deg", color: "from-blue-50 to-blue-100", border: "border-blue-200" },
  { texto: "Seré veterinario y cuidar los animales del altiplano", grado: "3° Grado", rot: "-1deg", color: "from-yellow-50 to-yellow-100", border: "border-yellow-200" },
  { texto: "Quiero representar al Perú en las Olimpiadas Internacionales de Matemática", grado: "5° Grado", rot: "2deg", color: "from-green-50 to-green-100", border: "border-green-200" },
  { texto: "Seré chef y pondré un restaurante con comida puneña en Lima y el mundo", grado: "4° Grado", rot: "-1.5deg", color: "from-purple-50 to-purple-100", border: "border-purple-200" },
  { texto: "Estudiaré enfermería para servir a mi comunidad de Puno", grado: "5° Grado", rot: "1deg", color: "from-pink-50 to-pink-100", border: "border-pink-200" },
  { texto: "Seré docente como mis profesores — esta escuela cambió mi vida", grado: "3° Grado", rot: "-2.5deg", color: "from-orange-50 to-orange-100", border: "border-orange-200" },
  { texto: "Quiero ser astronauta — ¡sí se puede desde Puno!", grado: "2° Grado", rot: "1.5deg", color: "from-cyan-50 to-cyan-100", border: "border-cyan-200" },
  { texto: "Estudiaré Arquitectura y diseñar el Puno del futuro", grado: "4° Grado", rot: "-1deg", color: "from-indigo-50 to-indigo-100", border: "border-indigo-200" },
  { texto: "Seré psicóloga para acompañar a jóvenes como yo", grado: "5° Grado", rot: "2.5deg", color: "from-rose-50 to-rose-100", border: "border-rose-200" },
  { texto: "Mi sueño es criar truchas y exportarlas al mundo desde el Lago Titicaca", grado: "3° Grado", rot: "-1.5deg", color: "from-teal-50 to-teal-100", border: "border-teal-200" },
  { texto: "Seré futbolista profesional y representar a Puno en primera división", grado: "2° Grado", rot: "1deg", color: "from-lime-50 to-lime-100", border: "border-lime-200" },
];

/* ─── COMPONENTS ───────────────────────────────── */
function TimelineItem({ item, index }: { item: typeof DIA_ESCOLAR[0], index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;
  const Icon = item.icon;

  return (
    <div ref={ref} className={`relative flex items-start gap-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 pl-12 md:pl-0"
      >
        <div className={`border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${item.bg}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-2xl font-bold ${item.textColor}`}>{item.hora}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.periodo}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.titulo}</h3>
          <p className="text-slate-600 leading-relaxed">{item.descripcion}</p>
        </div>
      </motion.div>

      {/* Center dot (desktop) */}
      <div className="hidden md:flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center shadow-lg z-10`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />

      {/* Mobile dot */}
      <div className="absolute left-0 top-5 md:hidden">
        <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center shadow`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

function TrophyGlyph({ type }: { type: TrophyIconType }) {
  const baseClass = "h-12 w-12 shrink-0 rounded-2xl p-2.5 shadow-sm ring-1 ring-black/5";

  switch (type) {
    case "soccer":
      return (
        <div className={`${baseClass} bg-emerald-50 text-emerald-600`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4v3" />
            <path d="M4 12h3" />
            <path d="M12 17v3" />
            <path d="M17 12h3" />
            <path d="M7 7l2 2" />
            <path d="M15 15l2 2" />
            <path d="M7 17l2-2" />
            <path d="M15 9l2-2" />
          </svg>
        </div>
      );
    case "microscope":
      return (
        <div className={`${baseClass} bg-sky-50 text-sky-600`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <path d="M6 4h8" />
            <path d="M10 4v5" />
            <path d="M7 9l5 5" />
            <path d="M9 14l-2 4h6l-2-4" />
            <path d="M4 20h10" />
          </svg>
        </div>
      );
    case "microphone":
      return (
        <div className={`${baseClass} bg-violet-50 text-violet-600`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <rect x="9" y="3" width="6" height="10" rx="3" />
            <path d="M7 10a5 5 0 0 0 10 0" />
            <path d="M12 15v4" />
            <path d="M8 19h8" />
          </svg>
        </div>
      );
    case "dance":
      return (
        <div className={`${baseClass} bg-rose-50 text-rose-600`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <path d="M3 17l3-3" />
            <path d="M8 14l3-3 3 2 4-4" />
            <path d="M15 9h3v3" />
            <circle cx="7" cy="18" r="1.5" />
            <circle cx="16" cy="18" r="1.5" />
          </svg>
        </div>
      );
    case "volleyball":
      return (
        <div className={`${baseClass} bg-amber-50 text-amber-600`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <circle cx="12" cy="12" r="8" />
            <path d="M5 8c2.5 1.7 4.5 2.5 7 2.5S16.5 9.7 19 8" />
            <path d="M5 16c2.5-1.7 4.5-2.5 7-2.5s4.5.8 7 2.5" />
            <path d="M8 5c1.2 2.3 1.8 4.3 1.8 6.5S9.2 14.7 8 17" />
            <path d="M16 5c-1.2 2.3-1.8 4.3-1.8 6.5S14.8 14.7 16 17" />
          </svg>
        </div>
      );
    case "book":
      return (
        <div className={`${baseClass} bg-indigo-50 text-indigo-600`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <path d="M5 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2" />
            <path d="M7 6h8" />
            <path d="M7 10h8" />
            <path d="M7 14h5" />
          </svg>
        </div>
      );
    case "bulb":
      return (
        <div className={`${baseClass} bg-yellow-50 text-yellow-600`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <path d="M9 18h6" />
            <path d="M10 21h4" />
            <path d="M9 14a4 4 0 1 1 6 0" />
            <path d="M10 10c0-1 .6-2 1.5-2.4A3 3 0 1 1 15 11" />
          </svg>
        </div>
      );
    default:
      return (
        <div className={`${baseClass} bg-primary/10 text-primary`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <path d="M5 9a7 7 0 0 1 14 0c0 3.3-2.3 5.8-4 7.5V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1.5C7.3 14.8 5 12.3 5 9Z" />
          </svg>
        </div>
      );
  }
}

function TrofeoCard({ t, i }: { t: typeof TROFEOS[0], i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 p-6 flex gap-4 items-start group"
    >
      <div className="group-hover:scale-105 transition-transform duration-300">
        <TrophyGlyph type={t.icon} />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-1 leading-tight">{t.titulo}</h4>
        <p className="text-slate-500 text-sm mb-2">{t.detalle}</p>
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-0.5 rounded-full">{t.periodo}</span>
      </div>
    </motion.div>
  );
}

function SuenoCard({ s, i }: { s: typeof SUENOS[0], i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: s.rot } : {}}
      transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20 }}
      className={`relative bg-gradient-to-br ${s.color} border ${s.border} rounded-xl p-5 shadow-md cursor-default`}
      style={{ transformOrigin: "center" }}
    >
      <Quote className="w-5 h-5 text-slate-300 mb-2" />
      <p className="text-slate-800 font-medium text-sm leading-relaxed mb-3">{s.texto}</p>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.grado}</span>
      {/* Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-400 shadow border-2 border-white" />
    </motion.div>
  );
}

/* ─── PAGE ─────────────────────────────────────── */
export default function VidaEscolar() {
  const [bgOffset, setBgOffset] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const heroImages = [
    "/images/portada/portada.jpg",
    "/images/portada/portada2.jpg",
    "/images/portada/portada3.jpg",
    "/images/portada/portada4.jpg",
    "/images/portada/portada5.jpg",
  ];

  useEffect(() => {
    const onScroll = () => setBgOffset(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="w-full bg-white">

      {/* ── HERO PARALLAX ── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${bgOffset}px)`, willChange: "transform" }}
        >
          <motion.img
            key={activeImage}
            src={heroImages[activeImage]}
            alt={`Vida Escolar ${activeImage + 1}`}
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/70 via-[#0d2348]/70 to-[#7c0a0a]/70" />
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ver imagen ${index + 1}`}
                onClick={() => setActiveImage(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${index === activeImage ? "bg-white scale-125" : "bg-white/50"}`}
              />
            ))}
          </div>
          {/* Decorative circles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${60 + i * 30}px`, height: `${60 + i * 30}px`,
                top: `${(i * 37) % 90}%`, left: `${(i * 23 + 5) % 95}%`,
                animation: `float${i % 3} ${4 + i}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Vida Escolar</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-secondary border border-secondary/40 px-4 py-1.5 rounded-full mb-6">
              Algo que no verás en otra escuela
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Más que una escuela,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">
                una experiencia
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-xl leading-relaxed">
              Descubre cómo es un día en la IES Santa Rosa — desde el primer izamiento del pabellón hasta el último grito de gol en las extracurriculares.
            </p>
          </motion.div>
        </div>

        <style>{`
          @keyframes float0 { from { transform: translateY(0px); } to { transform: translateY(-20px); } }
          @keyframes float1 { from { transform: translateY(-10px); } to { transform: translateY(15px); } }
          @keyframes float2 { from { transform: translateY(5px); } to { transform: translateY(-25px); } }
        `}</style>
      </section>

      {/* ── UN DÍA CON NOSOTROS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-secondary">Recorrido Exclusivo</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">Un Día con Nosotros</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              7 horas y 30 minutos de formación, aprendizaje, amistad y pasión. Así se vive la IES Santa Rosa de lunes a viernes.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-secondary/40 to-primary/20 -translate-x-1/2" />
            <div className="space-y-10 md:space-y-12">
              {DIA_ESCOLAR.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SALA DE TROFEOS ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <span className="text-sm font-bold uppercase tracking-widest text-amber-600">Orgullo Institucional</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">Sala de Trofeos</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Cada logro es el fruto del esfuerzo de nuestros estudiantes y la dedicación de nuestra plana docente. Estos son algunos de nuestros mayores orgullos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {TROFEOS.map((t, i) => <TrofeoCard key={i} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── MURAL DE SUEÑOS ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-[#0d2348] to-[#1a0505] relative overflow-hidden">
        {/* Background decorative */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white font-bold select-none pointer-events-none"
              style={{
                fontSize: `${8 + (i % 5) * 4}px`,
                top: `${(i * 31) % 95}%`,
                left: `${(i * 17 + 3) % 92}%`,
                opacity: 0.3 + (i % 4) * 0.15,
              }}
            >
              ★
            </div>
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-amber-400">Voces de Nuestra Comunidad</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Mural de Sueños</h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Cada estudiante de la IES Santa Rosa llega con un sueño. Aquí los exponemos con orgullo — porque Puno merece grandes personas y el mundo merece saber de dónde vienen.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {SUENOS.map((s, i) => <SuenoCard key={i} s={s} i={i} />)}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <p className="text-white/50 text-sm mb-2">¿Eres estudiante o egresado?</p>
            <p className="text-white font-bold text-xl">Comparte tu sueño con la comunidad IES Santa Rosa</p>
            <Link href="/noticias">
              <button className="mt-6 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg">
                Ver noticias de nuestra comunidad
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
