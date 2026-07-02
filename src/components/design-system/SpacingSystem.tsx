import { radiusTokens, spacingTokens } from '../../data/designSystem';

export function SpacingSystem() {
  return (
    <section className="ds-panel col-span-12">
      <h2>间距、圆角、阴影 <span>Spacing / Radius / Shadow</span></h2>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="min-w-0">
          <h3 className="font-black">Spacing</h3>
          <div className="mt-4 flex max-w-full items-end gap-4 overflow-x-auto pb-2">
            {spacingTokens.map((space) => (
              <div key={space} className="text-center text-xs font-bold text-[#8a6f5a]">
                <div className="mx-auto rounded bg-[#ffd0b9]" style={{ width: space, height: space }} />
                <span>{space}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="font-black">Radius</h3>
          <div className="mt-4 flex max-w-full gap-4 overflow-x-auto pb-2">
            {radiusTokens.map((radius) => (
              <div key={radius} className="text-center text-xs font-bold text-[#8a6f5a]">
                <div className="size-14 border border-[#bba88f] bg-[#fff7e8]" style={{ borderRadius: radius }} />
                <span>{radius}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
