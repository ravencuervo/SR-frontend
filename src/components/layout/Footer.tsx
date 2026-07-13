import { Link } from "wouter";
import { Building2, MapPin, Phone, Mail, Globe, MessageCircle, BadgeCheck, BadgeInfo, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t-4 border-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo-santa-rosa.png"
                alt="Logo IES Santa Rosa"
                className="h-30 w-30 object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              Institución Educativa Secundaria comprometida con la formación integral de los jóvenes de la región altiplánica y el desarrollo del Perú.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-primary"><Globe className="w-4 h-4" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-primary"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-primary"><BadgeCheck className="w-4 h-4" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-primary"><BadgeInfo className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Nuestra Historia", path: "/historia" },
                { name: "Autoridades", path: "/nosotros" },
                { name: "Noticias Institucionales", path: "/noticias" },
                { name: "Calendario de Eventos", path: "/eventos" },
                { name: "Convocatorias Laborales", path: "/convocatorias" },
                { name: "Sistemas Integrados", path: "/sistemas" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Av. La Torre Nro 150<br/>Barrio San Antonio<br/>Puno, Perú</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm text-slate-400">+51 (051) 368-294</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm text-slate-400">informes@iessantarosa.edu.pe</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Ubicación</h3>
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d875.5396714196488!2d-70.02931286829428!3d-15.84106968707001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69eb9ef27f2b%3A0xadec066a5c1546e9!2sInstituci%C3%B3n%20Educativa%20Santa%20Rosa!5e1!3m2!1ses-419!2spe!4v1783821930890!5m2!1ses-419!2spe"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ubicación IES Santa Rosa"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} IES Santa Rosa. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
