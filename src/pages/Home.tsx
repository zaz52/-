import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Hero } from '../components/sections/Hero';
import { MotionPreview } from '../components/sections/MotionPreview';
import { Projects } from '../components/sections/Projects';
import { Services } from '../components/sections/Services';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Services />
      <MotionPreview />
      <Contact />
    </>
  );
}
