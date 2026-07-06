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
            title="我是唯一，正在把想法做成可以被打开的作品。"
            description="我关注 AI 工具、个人品牌网站、移动端界面和视觉系统，也在持续把自己的项目、审美和学习过程整理成一个长期生长的个人空间。"
          />
          <Card className="mt-10 p-8 md:p-10">
            <p className="text-xl font-black leading-9 text-[var(--deep)]">
              我不是只想做一个“能放链接”的作品集，而是想把每个项目背后的想法、风格和使用场景讲清楚。这个网站是我的个人品牌入口，也是我的作品档案、实验记录和能力展示。
            </p>
            <p className="mt-6 text-base leading-8 text-[#617268]">
              我喜欢复古电脑的秩序感、自然植物的生命力、青春感的明亮节奏，以及轻科技界面的效率。现在的视觉方向围绕“复古科技、青春自然”构建：大标题、复古电脑、植物贴纸、奶油纸张、高留白和柔和动效共同形成记忆点。
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {['AI 工具与自动化', '个人品牌网站', '移动端与视觉系统'].map((item) => (
                <div key={item} className="rounded-2xl bg-[#eef4df] px-4 py-3 text-sm font-black text-[var(--green)]">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-base leading-8 text-[#617268]">
              如果你正在看我的作品，可以从这里了解我能做什么：把一个想法整理成产品入口，把一个链接升级成完整展示页，把零散项目变成更可信、更好浏览的个人品牌资产。
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
