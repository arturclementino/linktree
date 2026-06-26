import React, { useState } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { motion, type Variants } from 'framer-motion';
import {
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaGraduationCap,
  FaFileAlt,
} from 'react-icons/fa';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

// ── Paleta terracota ─────────────────────────────────────────────────────────
const C = {
  terracotta: '#C05A1F',
  terracottaDark: '#9E3D10',
  cream: '#FDF3E7',
  sand: '#F5E6D0',
  choco: '#3D1E08',
  brown: '#7A4F2E',
  border: '#E8C9A0',
  btnBg: '#FFFAF5',
  glow: 'rgba(192,90,31,0.15)',
  shadow: 'rgba(158,61,16,0.30)',
} as const;

const links = [
  {
    id: 'lattes',
    url: 'https://lattes.cnpq.br/1077788210198678',
    label: 'Currículo Lattes',
    icon: FaGraduationCap,
    color: C.terracotta,
  },
  {
    id: 'whatsapp',
    url: 'https://wa.me/5531971670159?text=Olá%20Artur,%20assisti%20sua%20apresentação%20de%20TCC%20e%20gostaria%20de%20falar%20com%20você!',
    label: 'Fale comigo no WhatsApp',
    icon: FaWhatsapp,
    color: '#25D366',
  },
  {
    id: 'linkedin',
    url: 'https://linkedin.com/in/arturclementino',
    label: 'Conecte-se no LinkedIn',
    icon: FaLinkedin,
    color: '#0077b5',
  },
  {
    id: 'email',
    url: 'mailto:artur.clementino@soukennedy.com.br',
    label: 'E-mail Institucional',
    icon: FaEnvelope,
    color: C.terracotta,
  },
  {
    id: 'instagram',
    url: 'https://instagram.com/arturcclementino',
    label: 'Siga no Instagram',
    icon: FaInstagram,
    color: '#E1306C',
  },
];

// ── Textura de fundo orgânica ─────────────────────────────────────────────────
function AfricanPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.05 }}
    >
      <defs>
        <pattern id="organic" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M10 40 Q20 20 30 40 Q40 60 50 40 Q60 20 70 40" fill="none" stroke={C.terracottaDark} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M0 60 Q15 45 25 60 Q35 75 50 60 Q65 45 80 60" fill="none" stroke={C.terracottaDark} strokeWidth="1.1" strokeLinecap="round" />
          <path d="M5 15 Q18 5 28 18 Q38 30 50 18 Q62 5 75 15" fill="none" stroke={C.terracottaDark} strokeWidth="0.9" strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#organic)" />
    </svg>
  );
}

// ── Botão de link individual ──────────────────────────────────────────────────
// Componente próprio para que cada botão gerencie seu estado de hover/touch
// independentemente — isso permite inverter a cor do ícone (qualquer cor → branco)
// sem depender de seletores CSS que o inline style impediria.
type LinkDef = (typeof links)[number];

function LinkButton({ link, variants }: { link: LinkDef; variants: Variants }) {
  const [active, setActive] = useState(false);

  return (
    <motion.a
      href={link.url}
      target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      aria-label={link.label}
      className="w-full grid rounded-2xl font-semibold select-none"
      style={{
        // 3 colunas: [ícone 44px] [texto centralizado flex-1] [espaçador 44px]
        // O espaçador espelha o ícone e mantém o texto perfeitamente centrado.
        gridTemplateColumns: '44px 1fr 44px',
        alignItems: 'center',
        minHeight: '60px',
        paddingTop: 'clamp(0.75rem, 3.5vw, 1rem)',
        paddingBottom: 'clamp(0.75rem, 3.5vw, 1rem)',
        fontSize: 'clamp(0.9375rem, 4vw, 1rem)',
        background: active ? C.terracotta : C.btnBg,
        border: `1.5px solid ${active ? C.terracottaDark : C.border}`,
        color: active ? '#fff' : C.choco,
        boxShadow: active ? `0 8px 24px ${C.shadow}` : `0 2px 10px ${C.glow}`,
        transform: active ? 'scale(0.98)' : 'scale(1)',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        transition: 'background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.22s, transform 0.18s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 160)}
      variants={variants}
    >
      {/* Coluna 1 — ícone: branco quando ativo, cor da marca caso contrário */}
      <span className="flex items-center justify-center" aria-hidden="true">
        <link.icon
          style={{
            fontSize: 'clamp(20px, 5.5vw, 24px)',
            color: active ? '#fff' : link.color,
            transition: 'color 0.22s',
          }}
        />
      </span>
      {/* Coluna 2 — rótulo */}
      <span className="text-center tracking-tight">{link.label}</span>
      {/* Coluna 3 — espaçador invisível */}
      <span aria-hidden="true" />
    </motion.a>
  );
}

// ── Botão do Artigo (em breve) ────────────────────────────────────────────────
// Quando o artigo for publicado, substitua ARTIGO_URL pela URL real.
const ARTIGO_URL = '';

function ArtigoButton({ variants }: { variants: Variants }) {
  const [active, setActive] = useState(false);
  const comingSoon = !ARTIGO_URL;

  return (
    <motion.a
      href={ARTIGO_URL || '#'}
      onClick={(e) => { if (comingSoon) e.preventDefault(); }}
      onTouchEnd={(e) => {
        if (comingSoon) e.preventDefault();
        setTimeout(() => setActive(false), 160);
      }}
      aria-label="Artigo Científico — em breve"
      aria-disabled={comingSoon}
      className="w-full grid rounded-2xl font-semibold select-none"
      style={{
        gridTemplateColumns: '44px 1fr 44px',
        alignItems: 'center',
        minHeight: '60px',
        paddingTop: 'clamp(0.75rem, 3.5vw, 1rem)',
        paddingBottom: 'clamp(0.75rem, 3.5vw, 1rem)',
        fontSize: 'clamp(0.9375rem, 4vw, 1rem)',
        background: comingSoon
          ? `repeating-linear-gradient(135deg, ${C.btnBg} 0px, ${C.btnBg} 6px, ${C.sand} 6px, ${C.sand} 12px)`
          : active ? C.terracotta : C.btnBg,
        border: `1.5px dashed ${C.border}`,
        color: comingSoon ? C.brown : active ? '#fff' : C.choco,
        boxShadow: `0 2px 10px ${C.glow}`,
        opacity: comingSoon ? 0.72 : 1,
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        transition: 'background 0.22s, color 0.22s, transform 0.18s',
        cursor: comingSoon ? 'default' : 'pointer',
      }}
      onMouseEnter={() => { if (!comingSoon) setActive(true); }}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => { if (!comingSoon) setActive(true); }}
      variants={variants}
    >
      <span className="flex items-center justify-center" aria-hidden="true">
        <FaFileAlt
          style={{
            fontSize: 'clamp(20px, 5.5vw, 24px)',
            color: active && !comingSoon ? '#fff' : C.terracottaDark,
            transition: 'color 0.22s',
          }}
        />
      </span>
      <span className="text-center tracking-tight">Artigo Científico</span>
      {comingSoon ? (
        <span className="flex items-center justify-center pr-1" aria-hidden="true">
          <span
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: C.terracottaDark,
              background: `${C.terracotta}22`,
              border: `1px solid ${C.terracotta}55`,
              borderRadius: '6px',
              padding: '2px 6px',
              whiteSpace: 'nowrap',
            }}
          >
            em breve
          </span>
        </span>
      ) : (
        <span aria-hidden="true" />
      )}
    </motion.a>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
function Home() {
  const [imgError, setImgError] = useState(false);
  const avatarFallback =
    'https://ui-avatars.com/api/?name=Artur+Clementino&background=C05A1F&color=fff&size=256';
  const profileSrc = imgError ? avatarFallback : `${import.meta.env.BASE_URL}perfil.jpg`;

  const profileVariants: Variants = {
    hidden: { opacity: 0, y: -12, scale: 0.94 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring' as const, stiffness: 72, damping: 17 },
    },
  };

  return (
    <div
      className="min-h-[100dvh] w-full flex flex-col font-sans relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${C.cream} 0%, ${C.sand} 100%)` }}
    >
      <AfricanPattern />

      {/* Barra superior decorativa */}
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-[3px] z-20"
        style={{
          background: `linear-gradient(90deg, ${C.terracottaDark}, ${C.terracotta}, #E8924A, ${C.terracotta}, ${C.terracottaDark})`,
        }}
      />

      <main
        className="flex-1 flex flex-col items-center z-10 w-full"
        style={{
          padding: 'clamp(2rem, 8vw, 3.5rem) clamp(1.25rem, 6vw, 2rem)',
          paddingTop: 'clamp(2.5rem, 10vw, 4rem)',
          paddingBottom: 'calc(clamp(2rem, 8vw, 3.5rem) + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="w-full max-w-[440px] flex flex-col items-center">

          {/* ── Perfil ──────────────────────────────────────────────── */}
          <motion.section
            aria-label="Perfil"
            className="flex flex-col items-center text-center mb-8 w-full"
            initial="hidden"
            animate="visible"
            variants={profileVariants}
          >
            {/* Avatar */}
            <div className="relative mb-5">
              <div
                className="rounded-full overflow-hidden relative z-10"
                style={{
                  width: 'clamp(100px, 28vw, 132px)',
                  height: 'clamp(100px, 28vw, 132px)',
                  border: `4px solid ${C.btnBg}`,
                  boxShadow: `0 0 0 3px ${C.terracotta}50, 0 10px 30px ${C.glow}`,
                }}
              >
                <img
                  src={profileSrc}
                  onError={() => setImgError(true)}
                  alt="Foto de Artur Clementino"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-[-8px] rounded-full -z-10 blur-2xl"
                style={{ background: C.glow }}
              />
            </div>

            {/* Nome */}
            <h1
              className="font-bold tracking-tight leading-tight mb-1"
              style={{ fontSize: 'clamp(1.55rem, 6.5vw, 1.875rem)', color: C.choco }}
            >
              Artur Clementino
            </h1>

            {/* Subtítulo */}
            <p
              className="font-semibold uppercase tracking-[0.13em] mb-4"
              style={{ fontSize: 'clamp(0.75rem, 3vw, 0.8125rem)', color: C.terracottaDark }}
            >
              Enfermagem &amp; Pesquisa
            </p>

            {/* Divisor */}
            <div className="flex items-center gap-2 mb-4 w-full max-w-[260px]" aria-hidden="true">
              <div className="flex-1 h-px" style={{ background: C.border }} />
              <div className="w-[6px] h-[6px] rounded-full" style={{ background: C.terracotta }} />
              <div className="flex-1 h-px" style={{ background: C.border }} />
            </div>

            {/* Bio */}
            <p
              className="leading-relaxed max-w-[310px]"
              style={{ fontSize: 'clamp(0.875rem, 3.8vw, 0.9375rem)', color: C.brown }}
            >
              Competência Cultural em Enfermagem: Barreiras Estruturais e Estratégias de Cuidado no{' '}
              <strong style={{ color: C.choco, fontWeight: 600 }}>Brasil</strong> e na{' '}
              <strong style={{ color: C.choco, fontWeight: 600 }}>Guiné-Bissau</strong>.
            </p>
          </motion.section>

          {/* ── Links ───────────────────────────────────────────────── */}
          <motion.nav
            aria-label="Links de contato e redes"
            className="w-full flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {links.map((link) => (
              <LinkButton key={link.id} link={link} variants={itemVariants} />
            ))}
            <ArtigoButton variants={itemVariants} />
          </motion.nav>

          {/* ── Rodapé ──────────────────────────────────────────────── */}
          <motion.footer
            className="mt-10 text-center"
            style={{ fontSize: 'clamp(0.7rem, 3vw, 0.8rem)', color: C.brown, opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            © 2026 Artur Eduardo Clementino da Cruz
          </motion.footer>
        </div>
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
