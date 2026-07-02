import { projects } from '../../data/projects';

export function CardSystem() {
  return (
    <section className="ds-panel col-span-12 lg:col-span-8">
      <h2>卡片组件 <span>Cards</span></h2>
      <p>卡片保持大圆角、轻阴影、充足留白，hover 时边框高亮。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <a key={project.href} href={project.href} target="_blank" rel="noopener noreferrer" className="hover-card rounded-[2rem] border border-[rgba(138,111,90,0.22)] bg-[#fffaf0] p-5">
            <div className="project-cover h-36 rounded-[1.5rem]" />
            <h3 className="mt-5 text-xl font-black">{project.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[#617268]">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
