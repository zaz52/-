import { motion } from 'framer-motion';
import { services } from '../../data/site';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';

export function Services() {
  return (
    <section id="services" className="min-h-screen bg-[#fff9ec] px-6 py-28 md:px-16 lg:px-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionTitle
          eyebrow="Skills / Services"
          title="只展示真正能提供价值的能力。"
          description="这里不再堆 UI 控件，而是把能力转成可理解的服务方向。"
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-110px' }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="group min-h-72 overflow-hidden p-7">
                <div className="grid size-14 place-items-center rounded-2xl bg-[#e2efd7] text-[var(--green)] transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <service.icon size={28} />
                </div>
                <h3 className="mt-8 text-2xl font-black tracking-[-0.03em]">{service.title}</h3>
                <p className="mt-4 min-h-16 leading-7 text-[#617268]">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => <span key={tag} className="rounded-full bg-[#eef4df] px-3 py-1 text-xs font-black text-[var(--green)]">{tag}</span>)}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
