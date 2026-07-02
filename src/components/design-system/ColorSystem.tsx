import { colorTokens } from '../../data/designSystem';

export function ColorSystem() {
  return (
    <section className="ds-panel col-span-12 lg:col-span-7">
      <h2>色彩系统 <span>Color Palette</span></h2>
      <p>主色围绕深森林绿、自然绿、松石青和青春珊瑚展开，奶油纸色负责大面积背景。</p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {colorTokens.map((color) => (
          <div key={color.hex}>
            <div className={`h-24 rounded-3xl border border-black/10 ${color.className}`} />
            <div className="mt-3 text-sm font-black">{color.name}</div>
            <div className="text-xs text-[#7b7468]">{color.hex}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
