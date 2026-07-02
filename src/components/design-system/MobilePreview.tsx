import { mobileScreens } from '../../data/designSystem';

export function MobilePreview() {
  return (
    <section className="ds-panel col-span-12 lg:col-span-7">
      <h2>移动端组件 <span>Mobile Preview</span></h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mobileScreens.map((screen) => (
          <div key={screen.title} className="rounded-[2rem] border border-[rgba(138,111,90,0.18)] bg-[#fffaf0] p-4">
            <div className={`phone-visual ${screen.image}`} />
            <h3 className="mt-4 font-black">{screen.title}</h3>
            <p className="text-sm text-[#617268]">{screen.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
