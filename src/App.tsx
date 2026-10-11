import React, { useState } from 'react';
import { 
  Check, 
  Search, 
  ChevronDown, 
  Layers, 
  Type, 
  Bell, 
  Sparkles, 
  Github, 
  ExternalLink, 
  Info, 
  TrendingUp,
  Sliders,
  Copy,
  CheckCheck,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function App() {
  const [switchOn, setSwitchOn] = useState(true);
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('react');
  const [clickCount, setClickCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-24 selection:bg-indigo-500 selection:text-white">
      {/* 顶部现代化纯白导航 */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-base tracking-tight">
            <span className="w-5 h-5 bg-indigo-600 rounded-md inline-block shadow-sm"></span>
            <span>WEIYI / UI DESIGN SYSTEM</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
              v3.0 CLEAN LIGHT
            </span>
          </div>
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-600">
            <a href="#tokens" className="hover:text-indigo-600 transition-colors">色彩体系</a>
            <a href="#buttons" className="hover:text-indigo-600 transition-colors">控件组件</a>
            <a href="#cards" className="hover:text-indigo-600 transition-colors">卡片反馈</a>
            <a
              href="#preview"
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all text-xs font-bold"
            >
              实战预览
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-10 space-y-16">
        {/* Hero 区域 */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            LIGHT MODE · ACCESSIBLE
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            现代纯净浅色 UI 设计系统
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
            面向现代生产级 Web 应用的组件库体系。纯白表面、细腻圆角、柔和弥散阴影与电光蓝光晕，打造极低认知负荷与清爽的交互体验。
          </p>

          <div className="flex flex-wrap gap-4 pt-5 mt-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all"
            >
              {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
              {copied ? '规范已复制' : '复制核心设计规范'}
            </button>
            <a
              href="https://github.com/zaz52/-"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 font-bold text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-sm transition-all"
            >
              <Github size={16} /> 仓库源码
            </a>
          </div>
        </section>

        {/* 1. 色彩与设计令牌 Tokens */}
        <section id="tokens" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Layers size={18} className="text-indigo-600" /> 01 / COLOR TOKENS 设计色彩系统
            </h2>
            <span className="text-xs text-slate-500 font-medium">AAA 级无障碍高对比度</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: '电光靛蓝 Brand', hex: '#4F46E5', bg: 'bg-indigo-600', text: 'text-white' },
              { name: '皇家蓝 Accent', hex: '#2563EB', bg: 'bg-blue-600', text: 'text-white' },
              { name: '薄荷绿 Success', hex: '#10B981', bg: 'bg-emerald-500', text: 'text-white' },
              { name: '深石板主字 Text', hex: '#0F172A', bg: 'bg-slate-900', text: 'text-white' },
              { name: '浅石板底板 Slate', hex: '#F1F5F9', bg: 'bg-slate-100', text: 'text-slate-800' },
              { name: '纯白表面 Surface', hex: '#FFFFFF', bg: 'bg-white border border-slate-200', text: 'text-slate-800' },
            ].map((col, idx) => (
              <div key={idx} className="border border-slate-200/80 p-3 bg-white rounded-xl shadow-sm">
                <div className={`h-14 ${col.bg} rounded-lg flex items-end p-2 mb-2`}>
                  <span className={`text-[10px] font-bold ${col.text}`}>{col.hex}</span>
                </div>
                <div className="text-xs font-bold text-slate-800">{col.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 按钮控件体系 Buttons */}
        <section id="buttons" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Sparkles size={18} className="text-indigo-600" /> 02 / BUTTONS 按钮组件体系
            </h2>
            <span className="text-xs text-slate-500 font-medium">支持多态与触感微悬浮反馈</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setClickCount(c => c + 1)}
                className="px-5 py-2.5 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl shadow-sm transition-all"
              >
                主要操作 (点击计数: {clickCount})
              </button>

              <button className="px-5 py-2.5 font-bold text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-sm transition-all">
                次要行动按钮
              </button>

              <button className="px-5 py-2.5 font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5">
                <Check size={16} strokeWidth={2.5} /> 确认并保存
              </button>

              <button className="px-5 py-2.5 font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all">
                幽灵底色按钮
              </button>

              <button className="px-4 py-2 font-bold text-sm bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all">
                危险操作
              </button>

              <button disabled className="px-4 py-2 font-bold text-sm bg-slate-100 text-slate-400 rounded-xl cursor-not-allowed">
                已禁用状态
              </button>
            </div>
          </div>
        </section>

        {/* 3. 表单与输入控件 Form Controls */}
        <section id="inputs" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Sliders size={18} className="text-indigo-600" /> 03 / FORM CONTROLS 表单与输入组件
            </h2>
            <span className="text-xs text-slate-500 font-medium">平滑聚焦环、iOS 质感流体开关</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">文本输入框 (Text Input)</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="在此输入文本试试..."
                className="w-full px-4 py-2.5 font-medium text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
              <span className="text-[11px] text-slate-400 font-medium">当前值: {inputValue || '(空)'}</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">带图标搜索框 (Search Box)</label>
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="搜索组件或设计参数..."
                  className="w-full pl-10 pr-4 py-2.5 font-medium text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">下拉选单 (Select Menu)</label>
              <div className="relative">
                <select
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  className="w-full px-4 py-2.5 font-medium text-sm bg-white border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer shadow-sm text-slate-700"
                >
                  <option value="react">React 18 / 19</option>
                  <option value="tailwind">Tailwind CSS v3 / v4</option>
                  <option value="typescript">TypeScript 5.x</option>
                  <option value="vite">Vite Bundler</option>
                </select>
                <ChevronDown size={18} className="absolute right-3.5 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">选择与切换 (Switch & Checkbox)</label>
              <div className="flex flex-wrap items-center gap-6">
                {/* iOS 质感平滑开关 */}
                <div
                  onClick={() => setSwitchOn(!switchOn)}
                  className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out flex items-center ${
                    switchOn ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out ${
                      switchOn ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-700">自动同步: {switchOn ? '开启' : '关闭'}</span>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-slate-700">
                  <div
                    onClick={() => setCheckedA(!checkedA)}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      checkedA ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    {checkedA && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span>自动编译</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-slate-700">
                  <div
                    onClick={() => setCheckedB(!checkedB)}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      checkedB ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    {checkedB && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span>通知提醒</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 卡片与布局体系 Cards */}
        <section id="cards" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Type size={18} className="text-indigo-600" /> 04 / CARDS & FEEDBACK 卡片与反馈体系
            </h2>
            <span className="text-xs text-slate-500 font-medium">轻盈高质感</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>SYSTEM PERFORMANCE</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[11px] flex items-center gap-1">
                  <TrendingUp size={12} /> +14.2%
                </span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight">99.98%</div>
              <p className="text-xs text-slate-500 font-medium mt-2">
                零布局偏移，极快的光滑首屏加载体验。
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <span className="px-2.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-md">
                FEATURED
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-3">浅色高对比规范</h3>
              <p className="text-xs text-slate-500 font-normal mt-2 leading-relaxed">
                放弃生硬的暗色与粗线，以 1px 精细分界线和柔和漫射阴影打造透气质感。
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                  唯
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">唯一 (Weiyi)</div>
                  <div className="text-xs text-slate-500 font-medium">Frontend & UI Architect</div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded">#UI/UX</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded">#FrontEnd</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 实战界面组装预览 */}
        <section id="preview" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <ExternalLink size={18} className="text-indigo-600" /> 05 / ASSEMBLED WORKSPACE 实战控制台窗口
            </h2>
            <span className="text-xs text-slate-500 font-medium">完整装配预览</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-4 py-3 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <span className="text-xs font-semibold text-slate-500">STUDIO_CONSOLE.TSX</span>
              <span className="text-xs font-bold text-emerald-600">● ONLINE</span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">开发控制台</h3>
                  <p className="text-xs text-slate-500 font-medium">统一监控组件状态与各项设计令牌参数</p>
                </div>
                <button className="px-4 py-2 font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all">
                  + 新增组件实例
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-100 p-4 bg-slate-50/60 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500">无障碍对比度检测</span>
                  <div className="text-2xl font-bold mt-1 text-emerald-600">16.5:1 (AAA Pass)</div>
                  <div className="text-[11px] text-slate-500 mt-1">清晰易读，符合国际 WCAG 2.1 规范</div>
                </div>

                <div className="border border-slate-100 p-4 bg-slate-50/60 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500">已就绪组件</span>
                  <div className="text-2xl font-bold mt-1 text-indigo-600">28 个标准控件</div>
                  <div className="text-[11px] text-slate-500 mt-1">涵盖按钮、表单、提示与布局</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 底部版权 */}
        <footer className="border-t border-slate-200 pt-8 pb-4 text-center">        
          <h3 className="text-sm font-bold text-slate-900">WEIYI UI DESIGN SYSTEM</h3>
          <p className="text-xs text-slate-500 mt-1">
            Crafted with Modern Clean Light UI & React 18
          </p>
        </footer>
      </main>
    </div>
  );
}
