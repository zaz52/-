import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Github, Leaf, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { siteProfile } from '../../data/site';
import { Button } from '../ui/Button';
import { FloatingSticker } from '../ui/FloatingSticker';
import { MagneticCard } from '../ui/MagneticCard';

export function Hero() {
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const smoothX = useSpring(glowX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(glowY, { stiffness: 70, damping: 20 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      glowX.set((event.clientX / window.innerWidth) * 100);
      glowY.set((event.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [glowX, glowY]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--cream)] px-6 pt-24 md:px-16 lg:px-24">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(40,199,183,0.22), transparent 26%)`,
        }}
      />
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
        <div className="relative z-10">
          <motion.div
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-[rgba(47,143,91,0.2)] bg-white/50 px-5 py-2 text-sm font-black uppercase tracking-[0.22em] text-[var(--green)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="size-2 rounded-full bg-[var(--turquoise)]" />
            {siteProfile.label}
          </motion.div>

          <h1 className="max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[var(--deep)] md:text-6xl lg:text-6xl">
            {siteProfile.headlineLines.map((line, index) => (
              <motion.span
                key={line}
                className={`block xl:whitespace-nowrap ${index === 1 ? 'text-[var(--coral)]' : ''}`}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-2xl text-lg leading-8 text-[#52675d] md:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            {siteProfile.intro}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82 }}
          >
            <Button href="#projects">查看作品</Button>
            <Button href="#contact" variant="secondary">联系我</Button>
          </motion.div>

          <motion.div
            className="mt-8 flex w-fit items-center gap-4 rounded-[1.6rem] border border-[rgba(47,143,91,0.18)] bg-white/58 p-3 pr-5 shadow-[0_18px_48px_rgba(11,61,46,0.12)] backdrop-blur"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.96 }}
          >
            <img
              src={siteProfile.avatar}
              alt={`${siteProfile.name} 头像`}
              className="size-16 rounded-[1.15rem] object-cover ring-4 ring-[#fff4e1]"
            />
            <div>
              <div className="text-sm font-black uppercase tracking-[0.22em] text-[var(--green)]">Designer</div>
              <div className="mt-1 text-xl font-black text-[var(--deep)]">{siteProfile.name}</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.94, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticCard className="relative mx-auto max-w-[560px]">
            <motion.div
              className="hero-machine"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="crt-window">
                <span>Hello<br />Future.</span>
                <Leaf className="absolute bottom-10 right-16 text-[#8fe29d]" size={56} />
              </div>
              <div className="flex items-center justify-between px-5 pb-5 pt-3 text-xs font-black text-[#755e49]">
                <span>NFY-2026</span>
                <span className="h-4 w-12 rounded-full bg-gradient-to-r from-[var(--coral)] to-[var(--turquoise)]" />
              </div>
            </motion.div>
            <FloatingSticker className="-left-8 top-8" delay={0.3}>BOTANICAL UI</FloatingSticker>
            <FloatingSticker className="right-0 top-0 bg-[#eaf2d9]" delay={1.2}><Sparkles size={16} /> soft motion</FloatingSticker>
            <FloatingSticker className="-bottom-4 right-16 bg-[#fff0d4]" delay={0.7}><Github size={16} /> open source</FloatingSticker>
          </MagneticCard>
        </motion.div>
      </div>
    </section>
  );
}
