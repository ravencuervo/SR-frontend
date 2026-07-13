import { Link } from "wouter";
import { ChevronRight, Monitor, BookOpen, Mail, Library, CreditCard, LayoutDashboard, ExternalLink } from "lucide-react";
import { SiGoogleclassroom } from "react-icons/si";
import { Card, CardContent } from "lucide-react";

export default function Sistemas() {
  const sistemas = [
    {
      id: "s1",
      nombre: "Intranet Institucional",
      descripcion: "Portal principal para docentes y estudiantes. Trámites, matrícula, constancias y registro de notas.",
      icono: <LayoutDashboard className="w-8 h-8" />,
      color: "bg-blue-500",
      link: "https://20df9ec1-2f41-4853-a741-3ccd0ef725c6-00-1kwcuf3tugs9h.picard.replit.dev/login"
    },
    {
      id: "s3",
      nombre: "Google Classroom",
      descripcion: "Plataforma oficial para el desarrollo de clases virtuales, tareas y material didáctico.",
      icono: <SiGoogleclassroom className="w-8 h-8" />,
      color: "bg-green-600",
      link: "https://classroom.google.com/"
    },
    {
      id: "s4",
      nombre: "Correo Institucional",
      descripcion: "Acceso al correo corporativo (@iessantarosa.edu.pe) provisto por Google Workspace.",
      icono: <Mail className="w-8 h-8" />,
      color: "bg-red-500",
      link: "https://mail.google.com/"
    },
    {
      id: "s5",
      nombre: "Biblioteca Virtual",
      descripcion: "Repositorio institucional de tesis, acceso a bases de datos científicas y catálogo de libros.",
      icono: <Library className="w-8 h-8" />,
      color: "bg-amber-500",
      link: "http://bibliotecamunicipal.munipuno.gob.pe/biblioteca/opac_css/"
    },
    {
      id: "s6",
      nombre: "Plataforma de Pagos",
      descripcion: "Sistema seguro para el pago en línea de pensiones, matrículas y derechos de trámites.",
      icono: <CreditCard className="w-8 h-8" />,
      color: "bg-teal-500",
      link: "https://pagalo.pe/"
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/portada/portada7.jpg" alt="Sistemas" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Sistemas Integrados</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sistemas Integrados</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Accede a todas las plataformas tecnológicas de la institución desde un solo lugar.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sistemas.map((sistema) => (
            <a key={sistema.id} href={sistema.link} target="_blank" rel="noopener noreferrer" className="block h-full">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group overflow-hidden relative">
                <div className={`h-2 w-full ${sistema.color} opacity-80`}></div>
                <div className="p-8 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white ${sistema.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    {sistema.icono}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors flex justify-between items-center">
                    {sistema.nombre}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </h3>
                  <p className="text-slate-500 mb-6 flex-1 text-sm leading-relaxed">
                    {sistema.descripcion}
                  </p>
                  <span className="text-primary font-semibold text-sm mt-auto inline-flex items-center">
                    Acceder al sistema
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
