import { useState } from 'react';
import { formOptions } from '../../data/designSystem';

export function FormSystem() {
  const [value, setValue] = useState(formOptions[0]);
  const [enabled, setEnabled] = useState(true);

  return (
    <section className="ds-panel col-span-12 lg:col-span-4">
      <h2>表单控件 <span>Forms</span></h2>
      <div className="mt-6 grid gap-4">
        <input className="ds-input" placeholder="搜索灵感、作品、工具..." />
        <select className="ds-input" value={value} onChange={(event) => setValue(event.target.value)}>
          {formOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
        <label className="flex items-center gap-3 font-black">
          <input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
          启用自然动效
        </label>
      </div>
    </section>
  );
}
