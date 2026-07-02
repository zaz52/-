import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { FloatingSticker } from '../ui/FloatingSticker';
import { SectionTitle } from '../ui/SectionTitle';

export function MotionPreview() {
  return (
    <section id="motion" className="min-h-[88vh] bg-[#f4ead6] px-6 py-28 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionTitle
            eyebrow="Motion Preview"
            title="动效应该像呼吸，不像炫技。"
            description="滚动入场、屏幕发光、贴纸漂浮、按钮高光和界面切换都保持柔和，让页面有生命力。"
          />
          <div className="mt-8">
            <Button href="/design-system" variant="secondary">查看设计系统</Button>
          </div>
        </div>

        <div className="relative rounded-[2.5rem] border border-[rgba(138,111,90,0.18)] bg-[var(--cream)] p-5 shadow-[0_30px_80px_rgba(11,61,46,0.16)]">
          <FloatingSticker className="-left-4 top-8">floating leaf</FloatingSticker>
          <FloatingSticker className="right-6 top-5 bg-[#e8f1db]" delay={1.1}>scanline glow</FloatingSticker>
          <div className="motion-window">
            <div className="motion-sidebar">
              <span />
              <span />
              <span />
            </div>
            <div className="motion-content">
              <motion.div
                className="motion-phone"
                animate={{ x: [0, 24, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="phone-screen">
                  <motion.div className="phone-card" animate={{ y: [0, -12, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }} />
                  <motion.div className="phone-line" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity }} />
                  <motion.div className="phone-line short" animate={{ opacity: [1, 0.45, 1] }} transition={{ duration: 2.4, repeat: Infinity }} />
                </div>
              </motion.div>
              <motion.div className="glow-orbit" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
