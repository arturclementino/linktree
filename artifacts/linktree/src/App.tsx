import React, { useState } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { motion, type Variants } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const links = [
  {
    id: 'whatsapp',
    url: 'https://wa.me/5531971670159?text=Olá%20Artur,%20assisti%20sua%20apresentação%20de%20TCC%20e%20gostaria%20de%20falar%20com%20você!',
    label: 'Fale comigo no WhatsApp',
    icon: FaWhatsapp,
    color: '#25D366'
  },
  {
    id: 'linkedin',
    url: 'https://linkedin.com/in/arturclementino',
    label: 'Conecte-se no LinkedIn',
    icon: FaLinkedin,
    color: '#0077b5'
  },
  {
    id: 'email',
    url: 'mailto:artur.clementino@soukennedy.com.br',
    label: 'E-mail Institucional',
    icon: FaEnvelope,
    color: '#2b6cb0'
  },
  {
    id: 'instagram',
    url: 'https://instagram.com/arturcclementino',
    label: 'Siga no Instagram',
    icon: FaInstagram,
    color: '#E1306C'
  },
  {
    id: 'facebook',
    url: 'https://facebook.com/1077788210198678',
    label: 'Perfil no Facebook',
    icon: FaFacebook,
    color: '#1877F2'
  }
];

function Home() {
  const [imgError, setImgError] = useState(false);
  const avatarUrl = 'https://ui-avatars.com/api/?name=Artur+Clementino&background=2b6cb0&color=fff&size=256';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
    },
  };

  const profileVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div 
      className="min-h-[100dvh] w-full flex flex-col items-center py-12 px-6 font-sans relative selection:bg-primary/20 selection:text-primary"
      style={{ background: 'linear-gradient(135deg, #f4f7f6 0%, #e2e8f0 100%)' }}
    >
      <main className="w-full max-w-[480px] flex flex-col items-center z-10 m-auto">
        <motion.div 
          className="flex flex-col items-center mb-10 text-center"
          initial="hidden"
          animate="visible"
          variants={profileVariants}
        >
          <div className="relative mb-5">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white shadow-[0_8px_24px_rgba(43,108,176,0.15)] bg-white relative z-10">
              <img 
                src={imgError ? avatarUrl : "/perfil.jpg"} 
                onError={() => setImgError(true)} 
                alt="Artur Clementino"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Subtle glow behind the avatar */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-110 -z-10" />
          </div>

          <h1 className="text-[28px] font-bold text-[#2d3748] tracking-tight mb-1">
            Artur Clementino
          </h1>
          <h2 className="text-[15px] font-medium text-[#2b6cb0] tracking-wide uppercase mb-4 opacity-90">
            Enfermagem & Pesquisa
          </h2>
          <p className="text-[15px] text-[#718096] leading-relaxed max-w-[340px]">
            Competência Cultural em Enfermagem: Barreiras Estruturais e Estratégias de Cuidado.
          </p>
        </motion.div>

        <motion.div 
          className="w-full flex flex-col gap-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="relative w-full flex items-center justify-center bg-white border border-[#e2e8f0] rounded-xl p-[18px] text-[#2d3748] font-medium text-[15px] transition-all duration-400 ease-out hover:bg-[#2b6cb0] hover:text-white hover:-translate-y-[2px] hover:border-[#2b6cb0] hover:shadow-[0_12px_24px_rgba(43,108,176,0.25)] group"
              variants={itemVariants}
            >
              <div className="absolute left-[20px] flex items-center justify-center" aria-hidden="true">
                <link.icon 
                  className="text-[22px] transition-colors duration-400 ease-out group-hover:text-white" 
                  style={{ color: link.color }} 
                />
              </div>
              <span className="tracking-tight">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.footer 
          className="mt-12 text-[13px] text-[#718096] font-medium opacity-80 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          © 2026 Artur E. Clementino da Cruz
        </motion.footer>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
