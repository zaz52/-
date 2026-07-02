import Lenis from 'lenis';
import { useEffect, useMemo } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { DesignSystem } from './pages/DesignSystem';
import { Home } from './pages/Home';
import './styles/globals.css';

function App() {
  const path = useMemo(() => window.location.pathname, []);
  const isDesignSystem = path === '/design-system';

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[var(--cream)] text-[var(--deep)]">
      <Header currentPath={path} />
      {isDesignSystem ? <DesignSystem /> : <Home />}
      <Footer />
    </div>
  );
}

export default App;
