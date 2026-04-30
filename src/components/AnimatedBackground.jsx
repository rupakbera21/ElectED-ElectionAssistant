import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, memo } from "react";

/* ── Warp Speed Stars ──────────────────────────────────────── */
const WarpStar = memo(({ style, scrollYProgress }) => {
  // Create parallax effect on stars as we scroll
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 3]);
  const y = useTransform(scrollYProgress, [0, 1], [style.initialY, style.initialY - 1500]);
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none bg-white"
      style={{
        left: style.left,
        top: style.top,
        width: style.size,
        height: style.size,
        scale,
        y,
        opacity: style.opacity,
        boxShadow: `0 0 ${style.size * 2}px rgba(255,255,255,0.8)`,
        transform: 'translateZ(0)',
      }}
      animate={{
        opacity: [style.opacity * 0.2, style.opacity, style.opacity * 0.2],
      }}
      transition={{
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    />
  );
});

/* ── Main cosmic background ─────────────────────────────────── */
export default function AnimatedBackground({ isDark }) {
  const { scrollYProgress } = useScroll();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate static star positions once
    const newStars = Array.from({ length: 80 }, (_, i) => ({
      key: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 150}%`, // Extend beyond screen for scrolling
        initialY: 0,
        size: `${1 + Math.random() * 2.5}px`,
        opacity: 0.3 + Math.random() * 0.7,
      },
    }));
    setStars(newStars);
  }, []);

  // Map scrolling to nebula movement
  const nebula1Y = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const nebula2Y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const nebula3Y = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  
  const nebulaScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-1000 ${isDark ? 'bg-[#020408]' : 'bg-[#0b101e]'}`} style={{ transform: 'translateZ(0)' }}>
      
      {/* ── Deep Space Nebulas ── */}
      <motion.div
        className="absolute top-0 left-[-20%] w-[1200px] h-[1200px] rounded-full blur-[150px] mix-blend-screen opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0) 70%)",
          y: nebula1Y,
          scale: nebulaScale,
          transform: 'translateZ(0)',
        }}
        animate={{ x: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[30%] right-[-20%] w-[1000px] h-[1000px] rounded-full blur-[140px] mix-blend-screen opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.7) 0%, rgba(34,197,94,0) 70%)",
          y: nebula2Y,
          scale: nebulaScale,
          transform: 'translateZ(0)',
        }}
        animate={{ x: [0, -40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[1400px] h-[1400px] rounded-full blur-[160px] mix-blend-screen opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(253,186,116,0.6) 0%, rgba(253,186,116,0) 70%)",
          y: nebula3Y,
          scale: nebulaScale,
          transform: 'translateZ(0)',
        }}
        animate={{ x: [-30, 30, -30] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Cosmic Grid ── */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          y: useTransform(scrollYProgress, [0, 1], [0, -300]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          transformOrigin: "center top",
          transform: 'translateZ(0)',
        }}
      />

      {/* ── Warp Stars ── */}
      {stars.map((p) => (
        <WarpStar key={p.key} style={p.style} scrollYProgress={scrollYProgress} />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,4,8,0.9)_100%)]" style={{ transform: 'translateZ(0)' }} />
    </div>
  );
}
