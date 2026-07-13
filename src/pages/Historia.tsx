import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Historia() {
  const hitos = [
    {
      year: "1928",
      title: "Fundación de la Institución",
      description: "El 10 de marzo de 1928 se crea oficialmente la Institución Educativa Secundaria Santa Rosa de Puno mediante la Resolución Suprema N.° 569, como una respuesta al acceso femenino a la educación secundaria en la región."
    },
    {
      year: "1930–1950",
      title: "Consolidación Académica",
      description: "Durante estas décadas, la institución fortalece su prestigio educativo, amplía su matrícula y se consolida como un referente formativo para las jóvenes puneñas."
    },
    {
      year: "1960–1980",
      title: "Expansión Institucional",
      description: "La escuela amplía su cobertura, fortalece sus programas formativos y desarrolla una mayor presencia en actividades culturales, artísticas y deportivas."
    },
    {
      year: "1990–2010",
      title: "Modernización Educativa",
      description: "Se incorporan nuevas metodologías pedagógicas, tecnologías y recursos educativos que mejoran la calidad de la enseñanza y la formación integral."
    },
    {
      year: "2024",
      title: "Inversión Histórica en Infraestructura",
      description: "El Gobierno Regional de Puno impulsa un proyecto superior a los 40 millones de soles para mejorar la infraestructura educativa de la institución, garantizando ambientes modernos para las nuevas generaciones."
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Page Header */}
      <div className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/portada/portada2.jpg" alt="Historia" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Nuestra Historia</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Nuestra Historia</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Un legado de excelencia en las alturas</h2>
            <div className="prose prose-lg text-slate-600">
              <p>
                La Institución Educativa Secundaria Santa Rosa de Puno es una de las instituciones educativas más emblemáticas de la región Puno y ha desempeñado un papel fundamental en la formación de generaciones de mujeres puneñas desde inicios del siglo XX.
              </p>
              <p>
                Según información oficial de la Municipalidad Provincial de Puno, la institución fue creada el 10 de marzo de 1928 mediante la Resolución Suprema N.° 569, durante el gobierno del presidente Augusto B. Leguía, con el propósito de fortalecer la educación femenina en la región altiplánica. Desde entonces se ha consolidado como un referente académico, cultural y social de Puno.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img src="/images/portada/portada2.jpg" alt="Archivo Histórico" className="w-full h-full object-cover filter sepia-[.3]" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary rounded-2xl -z-10 opacity-20"></div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Línea de Tiempo</h2>
          
          <div className="relative border-l-4 border-slate-200 ml-6 md:ml-0 md:border-l-0">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {hitos.map((hito, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-32px] md:left-1/2 w-6 h-6 rounded-full bg-secondary border-4 border-white shadow-sm md:-translate-x-1/2 z-10"></div>
                  
                  {/* Content */}
                  <div className="w-full md:w-1/2 md:px-12 pl-6">
                    <div className={`bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      {/* Pointer Triangle Desktop */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-50 border-t border-r border-slate-100 rotate-45 ${idx % 2 === 0 ? '-left-2 border-l border-b-0 border-t-0 border-r-0' : '-right-2 border-r border-t-0 border-l-0 border-b-0'}`}></div>
                      
                      <span className="text-primary font-bold text-2xl mb-2 block">{hito.year}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{hito.title}</h3>
                      <p className="text-slate-600">{hito.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
