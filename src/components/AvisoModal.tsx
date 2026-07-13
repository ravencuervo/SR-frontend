import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Bell } from "lucide-react";

const API_URL = "https://sr-backend-production-adf5.up.railway.app";

interface AvisoData {
  titulo: string;
  mensaje: string;
  mostrar: boolean;
  link?: string;
  textoBoton?: string;
  imagen?: {
    url: string;
  };
}

export function AvisoModal() {
  const [open, setOpen] = useState(false);
  const [aviso, setAviso] = useState<AvisoData | null>(null);

  useEffect(() => {
    async function fetchAviso() {
      try {
        const response = await fetch(`${API_URL}/api/aviso?populate=*`);
        const { data } = await response.json();

        if (data && data.mostrar) {
          // Check session storage to avoid showing it multiple times in the same session
          const hasSeenAviso = sessionStorage.getItem("hasSeenAviso");
          
          if (!hasSeenAviso) {
            setAviso(data);
            setOpen(true);
          }
        }
      } catch (error) {
        console.error("Error fetching aviso:", error);
      }
    }

    fetchAviso();
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("hasSeenAviso", "true");
  };

  if (!aviso) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-none bg-white rounded-3xl shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{aviso.titulo}</DialogTitle>
          <DialogDescription>{aviso.mensaje}</DialogDescription>
        </DialogHeader>

        <div className="relative">
          {/* Header Accent */}
          <div className="bg-primary p-6 flex items-center gap-4 text-white">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-xl leading-tight">Comunicado Importante</h3>
              <p className="text-primary-foreground/80 text-sm">IES Santa Rosa de Puno</p>
            </div>
            <button 
              onClick={handleClose}
              className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8">
            {aviso.imagen && (
              <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={`${API_URL}${aviso.imagen.url}`} 
                  alt={aviso.titulo}
                  className="w-full h-auto object-cover max-h-64"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-slate-900 mb-4">{aviso.titulo}</h2>
            
            <p className="text-slate-600 leading-relaxed mb-8 whitespace-pre-wrap">
              {aviso.mensaje}
            </p>

            <div className="flex gap-3">
              {aviso.link && (
                <Button asChild className="flex-1 rounded-full h-12 bg-primary font-bold shadow-lg shadow-primary/20">
                  <a href={aviso.link} target="_blank" rel="noopener noreferrer">
                    {aviso.textoBoton || "Ver más"}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={handleClose}
                className={`rounded-full h-12 font-bold ${aviso.link ? 'px-6' : 'w-full'}`}
              >
                Entendido
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
