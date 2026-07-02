import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { aboutStats } from '../../data/site';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => spring.on('change', (latest) => setDisplay(Math.round(latest))), [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="min-h-[88vh] bg-[#fff9ec] px-6 py-28 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionTitle
            eyebrow="About"
            title="不是展示规范，而是建立一个有记忆点的个人品牌。"
            description="我把自然气息、复古质感和轻科技交互结合起来，让个人网页不只是信息集合，而是一个可被记住的体验。"
          />
          <Card className="mt-10 p-8 md:p-10">
            <p className="text-xl font-black leading-9 text-[var(--deep)]">
              我关注的是页面的第一印象、滚动节奏、作品可信度和联系转化。视觉要有性格，但交互必须清楚；动效要有生命力，但不能抢走内容。
            </p>
            <p className="mt-6 text-base leading-8 text-[#617268]">
              当前网站围绕“复古科技、青春自然”构建：大标题、复古电脑、植物贴纸、奶油纸张和高留白共同组成品牌识别。
            </p>
          </Card>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {aboutStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="min-h-44">
                <div className="text-5xl font-black text-[var(--green)]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-5 text-lg font-black">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
