import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export function Banner() {
  return (
    <div className="py-2 px-4 flex justify-center items-center text-sm font-medium z-50 relative">
      <span className="flex items-center gap-2">
        <span className="uppercase tracking-wider text-xs bg-white/20 px-2 py-0.5 rounded-sm mr-2 hidden sm:inline-block">Admisión 2024-II</span>
        Proceso de admisión abierto. Inscríbete hasta el 15 de Mayo.
      </span>
      <Link href="/convocatorias" className="ml-4 hover:underline flex items-center group font-bold">
        Ver detalles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
