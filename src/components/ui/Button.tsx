import { ArrowRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'dark';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  showArrow?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--green)] text-[var(--cream)] shadow-[0_18px_45px_rgba(11,61,46,0.24)]',
  secondary: 'border border-[rgba(11,61,46,0.22)] bg-[rgba(255,244,225,0.72)] text-[var(--deep)]',
  dark: 'bg-[var(--deep)] text-[var(--cream)]',
};

export function Button({ children, variant = 'primary', showArrow = true, className = '', ...props }: ButtonProps) {
  return (
    <a className={`btn-flow group ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      {showArrow && <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" size={18} />}
    </a>
  );
}
