import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '../../data/site';

type HeaderProps = {
  currentPath: string;
};

export function Header({ currentPath }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(11,61,46,0.12)] bg-[rgba(255,244,225,0.74)] backdrop-blur-2xl">
      <nav className="mx-auto flex h-18 max-w-[1280px] items-center justify-between px-6 md:px-12 lg:px-16">
        <a href="/" className="flex items-center gap-3 text-[var(--deep)]">
          <span className="grid size-11 place-items-center rounded-full border border-[rgba(47,143,91,0.28)] bg-[#ecf3dc] text-sm font-black">NFY</span>
          <span className="font-black tracking-tight">Weiyi</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === currentPath ||
              (item.href === '/skills' && currentPath.startsWith('/skills')) ||
              (currentPath === '/' && item.href !== '/design-system' && item.href !== '/skills' && item.href !== '/');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-black transition hover:text-[var(--coral)] ${active ? 'text-[var(--green)]' : 'text-[#37594f]'}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-2xl border border-[rgba(11,61,46,0.16)] bg-white/45 lg:hidden"
          aria-label="打开导航菜单"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[rgba(11,61,46,0.12)] bg-[var(--cream)] px-6 py-4 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 font-black text-[var(--deep)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
