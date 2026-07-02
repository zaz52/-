import { ButtonSystem } from '../components/design-system/ButtonSystem';
import { CardSystem } from '../components/design-system/CardSystem';
import { ColorSystem } from '../components/design-system/ColorSystem';
import { FormSystem } from '../components/design-system/FormSystem';
import { IconSystem } from '../components/design-system/IconSystem';
import { MobilePreview } from '../components/design-system/MobilePreview';
import { SpacingSystem } from '../components/design-system/SpacingSystem';
import { TypographySystem } from '../components/design-system/TypographySystem';

export function DesignSystem() {
  return (
    <main className="bg-[#f7efdf] px-6 pb-24 pt-32 md:px-16 lg:px-24">
      <section className="mx-auto max-w-[1380px]">
        <div className="mb-12 rounded-[3rem] border border-[rgba(138,111,90,0.2)] bg-[#fff4e1] p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[var(--green)]">Design System</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-tight tracking-[-0.05em] text-[var(--deep)] md:text-7xl">
            复古科技、青春自然的界面规范。
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#617268]">
            这里保留设计系统展示内容，但不再挤占首页。模块按 12 栅格组织，便于查阅颜色、字体、按钮、表单、卡片、图标、移动端组件和间距圆角。
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <ColorSystem />
          <TypographySystem />
          <ButtonSystem />
          <FormSystem />
          <CardSystem />
          <IconSystem />
          <MobilePreview />
          <SpacingSystem />
        </div>
      </section>
    </main>
  );
}
