import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type FloatingStickerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FloatingSticker({ children, className = '', delay = 0 }: FloatingStickerProps) {
  return (
    <motion.div
      className={`floating-sticker ${className}`}
      animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 5.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
