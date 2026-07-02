export function TypographySystem() {
  return (
    <section className="ds-panel col-span-12 lg:col-span-5">
      <h2>字体系统 <span>Typography</span></h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-black text-[#8a6f5a]">中文标题</p>
          <div className="mt-2 text-4xl font-black">思源黑体</div>
          <p className="mt-3 text-sm leading-6 text-[#617268]">大标题厚重，强化复古海报感。</p>
        </div>
        <div>
          <p className="text-sm font-black text-[#8a6f5a]">English</p>
          <div className="mt-2 text-4xl font-black">Inter</div>
          <p className="mt-3 text-sm leading-6 text-[#617268]">英文保持现代、清洁、科技。</p>
        </div>
      </div>
    </section>
  );
}
