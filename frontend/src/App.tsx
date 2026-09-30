import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import ServiceDetails from "./pages/ServiceDetails";
import Notfound from "@/pages/Notfound";

import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";

import CalendlyCard from "./components/CalendlyCard";
import MarcaAIChat from "./components/mj/MarcaAIChat";
import CertificatePopup from "./components/mj/CertificatePopup";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

function Router() {

  return (

    <Switch>

      <Route path="/" component={Home} />
      <Route path="/about" component={About} />

      <Route path="/Contact" component={Contact} />
      <Route path="/contact" component={Contact} />

      <Route path="/services" component={Services} />
      <Route path="/Services" component={Services} />

      <Route path="/services/:slug" component={ServiceDetails} />
      <Route path="/Services/:slug" component={ServiceDetails} />

      <Route path="/portfolio" component={Portfolio} />
      <Route path="/Portfolio" component={Portfolio} />

      <Route path="/blog" component={Blog} />

      <Route path="/admin" component={Admin} />

      <Route component={Notfound} />

    </Switch>

  );

}

function App() {

  return (

    <QueryClientProvider client={queryClient}>

      <TooltipProvider>

        <WouterRouter>

          <ScrollToTop />

          <PageTransition />

          <Router />

          {/* ✅ HERE */}
          <CalendlyCard />

          <MarcaAIChat />

          <CertificatePopup />

        </WouterRouter>

        <Toaster />

      </TooltipProvider>

    </QueryClientProvider>

  );

}

export default App;