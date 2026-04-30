import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowDown, Fingerprint, Shield, Users, MessageCircle } from "lucide-react";
import mascot from "./assets/mascot.png";
const logo = "/logo.png";
import { electionSteps as staticSteps } from "./data/electionData";
import { translations, getElectionSteps } from "./data/translations";
import AnimatedBackground from "./components/AnimatedBackground";
import SmoothScroll from "./components/SmoothScroll";

const Timeline = lazy(() => import("./components/Timeline"));
const StepDetailCard = lazy(() => import("./components/Timeline").then(m => ({ default: m.StepDetailCard })));
const ElectionBuddy = lazy(() => import("./components/ElectionBuddy"));

/* ── Framer variants ────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

/* ── Stat card ──────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="rounded-xl px-6 py-5 flex items-center gap-4 border border-white/10 bg-white/5 backdrop-blur-md"
    >
      <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center border border-saffron/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
        <Icon size={18} className="text-saffron" />
      </div>
      <div>
        <p className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-heading)" }}>
          {value}
        </p>
        <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

/* ── Main App ───────────────────────────────────────────────── */
function App() {
  const [activeStep, setActiveStep] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [language, setLanguage] = useState("en");

  const t = translations[language];
  const electionSteps = getElectionSteps(language);

  // References for Parallax scroll
  const heroRef = useRef(null);

  // Hero Scroll Parallax (fades into background)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.8]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]); 

  const { scrollYProgress: globalScroll } = useScroll();
  useMotionValueEvent(globalScroll, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100));
  });

  const typewriterContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const typewriterLetter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Enforce dark mode as the space theme works best in dark
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-[#020408] text-white transition-colors duration-500 min-h-screen selection:bg-saffron/30 font-sans overflow-x-hidden">
        <AnimatedBackground isDark={true} />
        


        {/* ── Mission Progress HUD ───────────────────────────── */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-4 motion-safe" style={{ transform: 'translateZ(0)' }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 [writing-mode:vertical-lr] rotate-180">
            Guide Progress
          </div>
          <div className="w-[2px] h-40 bg-white/10 relative rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-saffron to-india-green"
              style={{ height: useTransform(globalScroll, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <div className="text-[10px] font-bold text-saffron w-8 text-center tabular-nums">
            {scrollPercent}%
          </div>
        </div>

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#020408]/60 backdrop-blur-xl"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button 
              className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0 text-left" 
              whileHover={{ scale: 1.02 }} 
              onClick={() => window.lenis?.scrollTo(0)}
              aria-label="ElectED - Scroll to top"
            >
              <motion.div
                className="relative w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-black/40 border border-saffron/30 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <img
                  src={logo}
                  alt="ElectED Project Logo"
                  width="44"
                  height="44"
                  className="w-11 h-11 relative z-10 mix-blend-screen contrast-125 brightness-110"
                />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold tracking-tight leading-none text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  ElectED
                </h1>
                <p className="text-[9px] uppercase tracking-[0.2em] text-india-green font-bold mt-1">
                  India Elections
                </p>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-8">
                {[
                  { key: "Registration", label: t.nav.registration },
                  { key: "Voting Day", label: t.nav.votingDay },
                  { key: "Results", label: t.nav.results }
                ].map((item) => (
                  <motion.a
                    key={item.key}
                    href={`#step-${electionSteps.find(s => s.id === (item.key === "Registration" ? 1 : item.key === "Voting Day" ? 2 : 3))?.id}`}
                    aria-label={`Navigate to ${item.label} section`}
                    className="text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-saffron transition-colors outline-none focus:text-saffron"
                    whileHover={{ y: -2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = `step-${electionSteps.find(s => s.id === (item.key === "Registration" ? 1 : item.key === "Voting Day" ? 2 : 3))?.id}`;
                      const target = document.getElementById(id);
                      if (target) window.lenis?.scrollTo(target);
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <button
                onClick={() => setLanguage(l => l === "en" ? "hi" : "en")}
                className="text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-saffron bg-white/5 px-3 py-1.5 rounded-full border border-white/10 ml-4 shadow-sm"
                aria-label={`Toggle Language to ${language === "en" ? "Hindi" : "English"}`}
              >
                {language === "en" ? "EN / HI" : "HI / EN"}
              </button>
            </div>
          </div>
        </motion.header>

        {/* ── 3D Cinematic Scroll Container ─────────────────────── */}
        <div className="relative w-full z-10">
          
          {/* SECTION 1: HERO */}
          <section ref={heroRef} className="relative min-h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
            <motion.main 
              style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
              className="relative w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center"
            >
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-saffron/30 bg-saffron/5 text-white text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-2 h-2 rounded-full bg-india-green shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                {t.hero.tag}
              </motion.div>

              <motion.h2
                variants={typewriterContainer}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.0] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span>
                  {t.hero.title1.split("").map((char, index) => (
                    <motion.span key={`t1-${index}`} variants={typewriterLetter}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-saffron via-white to-india-green bg-clip-text text-transparent bg-[length:200%_auto] inline-block drop-shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  {t.hero.title2.split("").map((char, index) => (
                    <motion.span key={`t2-${index}`} variants={typewriterLetter}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-white/60 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light"
              >
                {t.hero.para}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto w-full mb-16"
              >
                <StatCard icon={Users} label={t.stats.phases} value="03" />
                <StatCard icon={Fingerprint} label={t.stats.insights} value="15+" />
                <StatCard icon={Shield} label={t.stats.assistant} value="Votey" />
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex justify-center"
              >
                <button
                  onClick={() => {
                    const firstStep = electionSteps[0];
                    if (firstStep) {
                      const target = document.getElementById(`step-${firstStep.id}`);
                      if (target) {
                        window.lenis?.scrollTo(target);
                        // Using a timeout to ensure lenis finishes scroll or just focus immediately
                        target.focus({ preventScroll: true });
                      }
                    }
                  }}
                  className="bg-transparent border-none p-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-xl"
                  aria-label="Start Exploring"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-white flex flex-col items-center gap-3 opacity-80"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-saffron">{t.hero.startExploring}</span>
                    <ArrowDown size={24} className="text-saffron drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                  </motion.div>
                </button>
              </motion.div>
            </motion.main>
          </section>

          {/* SECTION 2: TIMELINE INTRO */}
          <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-24" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative w-full max-w-6xl mx-auto px-6 flex flex-col items-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tighter text-white drop-shadow-lg" style={{ fontFamily: "var(--font-heading)" }}>
                {t.timeline.title}
              </h3>
              
              <div className="w-full max-w-5xl">
                <Suspense fallback={<div className="h-40 flex items-center justify-center text-white/50">Loading timeline...</div>}>
                  <Timeline
                    steps={electionSteps}
                    activeStep={activeStep}
                    onStepClick={(step) => {
                      const target = document.getElementById(`step-${step.id}`);
                      if (target) window.lenis?.scrollTo(target);
                    }}
                    isDark={true}
                  />
                </Suspense>
              </div>
              
              <p className="mt-16 text-sm text-white/50 text-center max-w-md uppercase tracking-widest font-semibold border border-white/10 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md">
                {t.timeline.scrollHint}
              </p>
            </motion.div>
          </section>

          {/* Expanded 3D Scroll Sections for each Step */}
          {electionSteps.map((step, index) => (
            <section 
              key={step.id} 
              id={`step-${step.id}`}
              tabIndex="-1"
              className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 motion-safe outline-none focus-visible:ring-2 focus-visible:ring-saffron/50 rounded-3xl"
              style={{ transform: 'translateZ(0)' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="w-full max-w-5xl mx-auto px-6"
              >
                <Suspense fallback={<div className="h-64 rounded-3xl bg-white/5 animate-pulse" />}>
                  <StepDetailCard step={step} />
                </Suspense>
              </motion.div>
            </section>
          ))}

          {/* END SECTION: CHATBOT PROMPT */}
          <section className="relative min-h-[60vh] w-full flex flex-col items-center justify-center py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-[#020408]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="flex flex-col items-center text-center max-w-2xl px-6"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-black border border-saffron/30 shadow-[0_0_30px_rgba(249,115,22,0.2)] flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src={mascot} 
                    alt="Votey" 
                    width="64"
                    height="64"
                    loading="lazy"
                    className="w-16 h-16 object-contain mix-blend-screen contrast-150 brightness-110" 
                    style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 65%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 65%)' }}
                  />
                </div>
                {/* Online Indicator (Placed outside clipped container) */}
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-india-green border-2 border-black animate-pulse z-20 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>{t.chatbot.promptTitle}</h3>
              <p className="text-white/50 mb-8 font-light text-lg">{t.chatbot.promptPara}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatbotOpen(true)}
                aria-label="Open Votey AI Assistant"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-saffron text-white font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(249,115,22,0.4)] outline-none focus:ring-2 focus:ring-saffron/50 focus:ring-offset-2 focus:ring-offset-[#020408]"
              >
                <MessageCircle size={18} />
                {t.chatbot.askVotey}
              </motion.button>
            </motion.div>
          </section>

        </div>

        {/* ── FOOTER ─────────────────────────────────────────── */}
        <footer className="relative z-30 bg-[#010204] border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="ElectED Logo"
                width="40"
                height="40"
                loading="lazy"
                className="w-10 h-10 mix-blend-screen contrast-125 opacity-40 grayscale"
              />
              <span className="text-sm font-bold tracking-widest uppercase text-white/30">
                ElectED Space
              </span>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/20">
              © 2026 · {t.footer.missionControl}
            </p>
          </div>
        </footer>

        {/* ── Floating Chatbot Button (Always Accessible) ── */}
        <Suspense fallback={null}>
          <ElectionBuddy isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} currentStep={activeStep} isDark={true} language={language} />
        </Suspense>
      </div>
    </SmoothScroll>
  );
}

export default App;
