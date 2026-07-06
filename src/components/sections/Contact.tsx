import { Download, RotateCcw, Send } from 'lucide-react';
import { contacts } from '../../data/site';
import { Button } from '../ui/Button';
import { FloatingSticker } from '../ui/FloatingSticker';
import { Reveal } from '../ui/Reveal';

export function Contact() {
  return (
    <section id="contact" className="bg-[var(--forest)] px-6 py-28 md:px-16 lg:px-24">
      <Reveal className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#fff4e1,#e8f0d9)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.22)] md:p-14">
          <FloatingSticker className="right-10 top-10 bg-white/75">LET'S CREATE</FloatingSticker>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.32em] text-[var(--green)]">Contact</p>
              <h2 className="max-w-3xl text-5xl font-black leading-tight tracking-[-0.05em] text-[var(--deep)] md:text-7xl">
                如果你想了解我，先从这些作品开始。
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#617268]">
                我会继续把 AI 工具、自动化项目、移动端界面和个人品牌实验整理到这里。如果你喜欢这种复古、自然、科技和青春感融合的方向，可以直接联系我。
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href="mailto:1845779520@qq.com"><Send size={18} />发送邮件</Button>
                <Button href="/resume.pdf" variant="secondary"><Download size={18} />下载简历</Button>
                <Button href="#top" variant="dark"><RotateCcw size={18} />返回顶部</Button>
              </div>
            </div>

            <div className="grid gap-3">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-3xl border border-[rgba(11,61,46,0.12)] bg-white/42 p-5 transition hover:-translate-y-1 hover:border-[var(--green)]"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#e3efd7] text-[var(--green)]"><contact.icon size={22} /></span>
                  <span>
                    <span className="block text-sm font-black text-[#8a6f5a]">{contact.label}</span>
                    <span className="block break-all text-lg font-black text-[var(--deep)]">{contact.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
