import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function ButtonSystem() {
  return (
    <section className="ds-panel col-span-12 lg:col-span-4">
      <h2>按钮系统 <span>Buttons</span></h2>
      <p>只展示真实可点击样式，不保留误导用户的假按钮。</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="#projects">主按钮</Button>
        <Button href="#contact" variant="secondary">次按钮</Button>
        <Button href="/" variant="dark">深色按钮 <ArrowRight size={16} /></Button>
      </div>
    </section>
  );
}
