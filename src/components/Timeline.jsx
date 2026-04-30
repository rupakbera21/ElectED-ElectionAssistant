import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lightbulb, ListChecks, Sparkles } from "lucide-react";

/* ── HUD Variants ────────────────────────────────────────────── */
const nodeVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.1, filter: "brightness(1.2)" },
  tap: { scale: 0.95 },
};

const hudCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.1 },
  },
  exit: { opacity: 0, scale: 1.05, transition: { duration: 0.2 } },
};

const hudItemVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
};

/* ── Timeline (Minimalist HUD) ──────────────────────────────── */
export default function Timeline({ steps, activeStep, onStepClick }) {
  return (
    <section className="relative w-full">
      <div className="flex items-center justify-center w-full px-2">
        {steps.map((step, idx) => {
          const isActive = activeStep?.id === step.id;
          return (
            <div key={step.id} className="flex items-center flex-1 max-w-[280px]">
              {/* HUD Node */}
              <motion.button
                variants={nodeVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                onClick={() => onStepClick(step)}
                aria-label={`Go to step ${step.id}: ${step.title}`}
                className="group relative flex flex-col items-center gap-6 w-full py-6 transition-all duration-500 outline-none focus:scale-105"
              >
                <div className="relative">
                  <motion.div
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-500 border border-white/20 backdrop-blur-md
                      ${
                        isActive
                          ? "bg-saffron/20 text-white border-saffron"
                          : "bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/40"
                      }`}
                    animate={
                      isActive
                        ? { boxShadow: ["0 0 20px rgba(249,115,22,0.5)", "0 0 60px rgba(249,115,22,0.8)", "0 0 20px rgba(249,115,22,0.5)"] }
                        : { boxShadow: "0 0 0px rgba(0,0,0,0)" }
                    }
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CheckCircle2 size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        </motion.div>
                      ) : (
                        <motion.span key="num" className="font-mono text-2xl tracking-tighter">
                          0{step.id}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Radar Pulse */}
                  {isActive && (
                    <motion.span
                    className="absolute inset-0 rounded-full border border-saffron/50 pointer-events-none motion-safe"
                    animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </div>

                <div className="text-center px-2">
                  <p className={`text-sm md:text-base font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? "text-saffron drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" : "text-white/40 group-hover:text-white/80"}`}>
                    {step.title}
                  </p>
                </div>
              </motion.button>

              {/* Data Link */}
              {idx < steps.length - 1 && (
                <div className="relative w-12 md:w-24 shrink-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-white/10" />
                  <motion.div
                    className="absolute left-0 h-[2px] bg-gradient-to-r from-saffron to-india-green shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                    initial={{ width: "0%" }}
                    animate={{ width: activeStep && activeStep.id > step.id ? "100%" : "0%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  {/* HUD target marker */}
                  <div className="absolute w-2 h-2 rounded-full border border-white/30 bg-[#020408]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── HUD Detail Panel ───────────────────────────────────────── */
export function StepDetailCard({ step }) {
  const [activeTab, setActiveTab] = useState("whatToDo");

  if (!step) return null;

  const tabs = [
    { id: "whatToDo", label: "Protocol", icon: ListChecks },
    { id: "proTips", label: "Intel", icon: Lightbulb },
  ];

  const items = activeTab === "whatToDo" ? step.whatToDo : step.proTips;

  return (
    <motion.div
      key={step.id}
      variants={hudCardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full motion-safe"
    >
      <div className="relative max-w-4xl mx-auto w-full">
        {/* HUD Decorative Corners */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-saffron/40" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-saffron/40" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-india-green/40" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-india-green/40" />
        
        {/* Top HUD Frame */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron via-india-green to-saffron opacity-50" />
        
        {/* Header */}
        <div className="px-8 md:px-12 pt-12 pb-8 border-b border-white/5 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-40 -right-40 w-[300px] h-[300px] bg-saffron/10 rounded-full blur-[80px]" />
          
          <motion.div className="flex items-center gap-3 mb-4" variants={hudItemVariants}>
            <div className="px-3 py-1 rounded-sm border border-saffron/30 bg-saffron/10 flex items-center gap-2 text-saffron uppercase tracking-widest text-[10px] font-bold">
              <Sparkles size={10} />
              Sector {step.id} / 03
            </div>
          </motion.div>
          
          <motion.h2
            variants={hudItemVariants}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {step.title}
          </motion.h2>
          
          <motion.p variants={hudItemVariants} className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl font-light">
            {step.description}
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row min-h-[350px]">
          {/* Side Menu */}
          <div className="w-full md:w-64 border-r border-white/5 p-6 bg-white/[0.01]">
            <div className="flex md:flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={`Switch to ${tab.label} view for ${step.title}`}
                    className={`relative w-full flex items-center gap-3 px-4 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 outline-none
                      ${isTabActive ? "text-saffron bg-saffron/10 border border-saffron/20" : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"}
                    `}
                  >
                    <Icon size={16} />
                    {tab.label}
                    {isTabActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-saffron shadow-[0_0_8px_rgba(249,115,22,1)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data Output */}
          <div className="flex-1 p-8 md:p-12 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="motion-safe"
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-2 h-2 rounded-full bg-india-green animate-pulse" />
                  <h4 className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">
                    {activeTab === "whatToDo" ? "Active Protocol" : "Strategic Intel"}
                  </h4>
                </div>

                <ul className="space-y-6">
                  {items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <span className="mt-1 font-mono text-[10px] text-white/30 group-hover:text-saffron transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="text-white/70 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
