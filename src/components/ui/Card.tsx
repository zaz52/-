import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: 'cream' | 'green';
};

export function Card({ children, tone = 'cream', className = '', ...props }: CardProps) {
  const toneClass =
    tone === 'green'
      ? 'border-white/10 bg-[rgba(255,244,225,0.08)] text-[var(--cream)]'
      : 'border-[rgba(138,111,90,0.22)] bg-[rgba(255,244,225,0.76)] text-[var(--deep)]';

  return (
    <div className={`hover-card rounded-[2rem] border p-6 backdrop-blur ${toneClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
