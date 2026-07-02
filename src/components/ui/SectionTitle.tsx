import { motion } from 'framer-motion';

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
};

export function SectionTitle({ eyebrow, title, description, align = 'left', light = false }: SectionTitleProps) {
  return (
    <motion.div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className={`mb-4 text-sm font-black uppercase tracking-[0.32em] ${light ? 'text-[#9de8c2]' : 'text-[var(--green)]'}`}>{eyebrow}</p>
      <h2 className={`text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl ${light ? 'text-[var(--cream)]' : 'text-[var(--deep)]'}`}>{title}</h2>
      {description && <p className={`mt-5 text-lg leading-8 ${light ? 'text-[#d8eadf]' : 'text-[#5f7068]'}`}>{description}</p>}
    </motion.div>
  );
}
