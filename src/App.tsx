import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { AvisoModal } from "@/components/AvisoModal";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Historia from "@/pages/Historia";
import Nosotros from "@/pages/Nosotros";
import Noticias from "@/pages/Noticias";
import Eventos from "@/pages/Eventos";
import Convocatorias from "@/pages/Convocatorias";
import Sistemas from "@/pages/Sistemas";
import VidaEscolar from "@/pages/VidaEscolar";
import Reglamentos from "@/pages/Reglamentos";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <AvisoModal />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/historia" component={Historia} />
        <Route path="/nosotros" component={Nosotros} />
        <Route path="/noticias" component={Noticias} />
        <Route path="/eventos" component={Eventos} />
        <Route path="/convocatorias" component={Convocatorias} />
        <Route path="/sistemas" component={Sistemas} />
        <Route path="/vida-escolar" component={VidaEscolar} />
        <Route path="/reglamentos" component={Reglamentos} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
