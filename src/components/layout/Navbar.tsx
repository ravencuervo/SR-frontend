import { Link, useLocation } from "wouter";
import { Menu, X, BookOpen, UserCircle, Calendar, GraduationCap, Monitor, Building2, Search, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Inicio", path: "/" },
  { name: "Institución", path: "/nosotros", children: [
    { name: "Nosotros", path: "/nosotros" },
    { name: "Nuestra Historia", path: "/historia" },
  ]},
  { name: "Actualidad", path: "/noticias", children: [
    { name: "Noticias", path: "/noticias" },
    { name: "Eventos", path: "/eventos" },
    { name: "Convocatorias", path: "/convocatorias" },
  ]},
  { name: "Sistemas", path: "/sistemas", children: [
    { name: "Ver todos los sistemas", path: "/sistemas" },
    { name: "Intranet Institucional", path: "https://20df9ec1-2f41-4853-a741-3ccd0ef725c6-00-1kwcuf3tugs9h.picard.replit.dev/login", external: true },
    { name: "Google Classroom", path: "https://classroom.google.com/", external: true },
    { name: "Correo Institucional", path: "https://mail.google.com/", external: true },
    { name: "Biblioteca Digital", path: "http://bibliotecamunicipal.munipuno.gob.pe/biblioteca/opac_css/", external: true },
  ]},
  { name: "Reglamentos", path: "/reglamentos" },
  { name: "Vida Escolar", path: "/vida-escolar", highlight: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpended, setMobileExpended] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
    setMobileExpended(null);
  }, [location]);

  const toggleMobileExpended = (name: string) => {
    setMobileExpended(mobileExpended === name ? null : name);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b" : "bg-white border-b"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="text-white rounded-lg transition-transform group-hover:scale-105 duration-300 overflow-hidden h-16 w-16 flex items-center justify-center">
              <img
                src="/logo-santa-rosa.png"
                alt="Logo IES Santa Rosa"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl leading-none text-primary tracking-tight">I.E.S. SANTA ROSA</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-1">Puno - Perú</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.path} 
                className="relative group py-2 px-1"
                onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <div className="flex items-center">
                    <Link
                      href={link.path}
                      className={`text-[13px] xl:text-sm font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1 ${
                        location.startsWith(link.path) ? "text-primary bg-primary/5" : "text-slate-600 hover:text-primary hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 w-48 bg-white shadow-xl border border-slate-100 rounded-xl py-2 mt-1 z-50 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            child.external ? (
                              <a
                                key={child.path}
                                href={child.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                              >
                                {child.name}
                              </a>
                            ) : (
                              <Link
                                key={child.path}
                                href={child.path}
                                className={`block px-4 py-2 text-sm transition-colors ${
                                  location === child.path ? "text-primary bg-primary/5 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                }`}
                              >
                                {child.name}
                              </Link>
                            )
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : link.highlight ? (
                  <Link
                    href={link.path}
                    className={`text-[13px] xl:text-sm font-bold px-4 py-2 rounded-full border transition-all shadow-sm ${
                      location === link.path
                        ? "bg-secondary text-white border-secondary"
                        : "border-secondary text-secondary hover:bg-secondary hover:text-white"
                    }`}
                  >
                    ★ {link.name}
                  </Link>
                ) : (
                  <Link
                    href={link.path}
                    className={`text-[13px] xl:text-sm font-bold px-3 py-2 rounded-lg transition-all ${
                      location === link.path ? "text-primary bg-primary/5" : "text-slate-600 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              }
            </div>
          ))}
        </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-bold shadow-md hover:shadow-lg transition-all group">
              <a href="https://20df9ec1-2f41-4853-a741-3ccd0ef725c6-00-1kwcuf3tugs9h.picard.replit.dev/login" target="_blank" rel="noopener noreferrer">
                Intranet
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Collapse Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white overflow-y-auto shadow-2xl max-h-[calc(100vh-80px)]"
          >
            <nav className="flex flex-col p-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.path} className="flex flex-col">
                  {link.children ? (
                    <>
                      <button 
                        onClick={() => toggleMobileExpended(link.name)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all ${
                          mobileExpended === link.name ? "bg-primary/5 text-primary" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileExpended === link.name ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {mobileExpended === link.name && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 pr-2 py-2 flex flex-col space-y-1 border-l-2 border-primary/10 ml-4 my-1">
                              {link.children.map((child) => (
                                child.external ? (
                                  <a
                                    key={child.path}
                                    href={child.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                                  >
                                    {child.name}
                                  </a>
                                ) : (
                                  <Link
                                    key={child.path}
                                    href={child.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                      location === child.path
                                        ? "bg-primary/10 text-primary"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                    }`}
                                  >
                                    {child.name}
                                  </Link>
                                )
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                        location === link.path
                          ? "bg-primary/5 text-primary"
                          : link.highlight 
                            ? "text-secondary hover:bg-secondary/5"
                            : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.highlight && "★ "}{link.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-6 mt-4 border-t border-slate-100 px-2 space-y-4 pb-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-2">Accesos Directos</span>
                  <a 
                    href="https://20df9ec1-2f41-4853-a741-3ccd0ef725c6-00-1kwcuf3tugs9h.picard.replit.dev/login" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-4 rounded-2xl font-bold bg-primary text-white shadow-lg shadow-primary/20"
                  >
                    <span>Intranet Institucional</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
