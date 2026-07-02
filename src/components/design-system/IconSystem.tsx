import { iconSet } from '../../data/designSystem';

export function IconSystem() {
  return (
    <section className="ds-panel col-span-12 lg:col-span-5">
      <h2>图标系统 <span>Icons</span></h2>
      <div className="mt-6 grid grid-cols-6 gap-3 sm:grid-cols-8">
        {iconSet.map((Icon, index) => (
          <div key={index} className="grid size-12 place-items-center rounded-2xl border border-[rgba(138,111,90,0.22)] bg-[#fffaf0] text-[var(--green)]">
            <Icon size={22} />
          </div>
        ))}
      </div>
    </section>
  );
}
