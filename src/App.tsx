import Lenis from 'lenis';
import { useEffect, useMemo } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Admin } from './pages/Admin';
import { DesignSystem } from './pages/DesignSystem';
import { Home } from './pages/Home';
import { SkillDetail } from './pages/SkillDetail';
import { Skills } from './pages/Skills';
import { trackPageView } from './lib/analytics';
import './styles/globals.css';

function App() {
  const path = useMemo(() => window.location.pathname, []);
  const isDesignSystem = path === '/design-system';
  const isSkills = path === '/skills';
  const skillSlug = path.startsWith('/skills/') ? decodeURIComponent(path.replace('/skills/', '').replace(/\/$/, '')) : null;
  const isAdmin = path === '/admin';

  useEffect(() => {
    trackPageView();
  }, []);

  useEffect(() => {
    if (isAdmin) return undefined;

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
  }, [isAdmin]);

  if (isAdmin) return <Admin />;

  return (
    <div id="top" className="min-h-screen bg-[var(--cream)] text-[var(--deep)]">
      <Header currentPath={path} />
      {isDesignSystem ? <DesignSystem /> : skillSlug ? <SkillDetail slug={skillSlug} /> : isSkills ? <Skills /> : <Home />}
      <Footer />
    </div>
  );
}

export default App;
