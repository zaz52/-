import React, { useState } from 'react';
import { 
  Check, 
  Search, 
  Layers, 
  Type, 
  Sparkles, 
  Github, 
  ExternalLink, 
  TrendingUp, 
  Sliders, 
  Copy, 
  CheckCheck,
  Activity,
  Zap,
  Volume2
} from 'lucide-react';

const TABS = [
  { id: 'preview', label: '预览' },
  { id: 'motion', label: '动效' },
  { id: 'code', label: '代码' },
] as const;

export default function App() {
  const [switchOn, setSwitchOn] = useState(true);
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'motion' | 'code'>('preview');
  const [isBeating, setIsBeating] = useState(true);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTabIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-24 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* 嵌入原生关键帧动画样式 */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 22s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes equalizer {
          0%, 100% { height: 6px; }
          50% { height: 26px; }
        }
        .animate-eq-1 { animation: equalizer 1.1s ease-in-out infinite; }
        .animate-eq-2 { animation: equalizer 0.8s ease-in-out infinite 0.2s; }
        .animate-eq-3 { animation: equalizer 1.4s ease-in-out infinite 0.4s; }
        .animate-eq-4 { animation: equalizer 0.9s ease-in-out infinite 0.1s; }
        .animate-eq-5 { animation: equalizer 1.2s ease-in-out infinite 0.3s; }
        /* 流动边框光效：悬浮时边框有微光流转 */
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .flow-border { position: relative; }
        .flow-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          padding: 2px;
          background: linear-gradient(115deg, #4F46E5, #22d3ee, #a78bfa, #f472b6, #4F46E5);
          background-size: 280% 280%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
          animation: border-flow 3.5s linear infinite;
          pointer-events: none;
        }
        .flow-border:hover::before { opacity: 1; }
        .flow-border-xl::before { border-radius: 20px; }
      `}</style>

      {/* 背景动态呼吸微光斑 */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-96 left-[-100px] w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* 顶部现代化纯白导航 */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-base tracking-tight">
            <span className="w-5 h-5 bg-indigo-600 rounded-md inline-block shadow-sm animate-bounce"></span>
            <span>WEIYI / MOTION UI</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
              LIVE MOTION v3.5
            </span>
          </div>
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-600">
            <a href="#marquee" className="hover:text-indigo-600 transition-colors">流动流</a>
            <a href="#buttons" className="hover:text-indigo-600 transition-colors">动态控件</a>
            <a href="#cards" className="hover:text-indigo-600 transition-colors">交互卡片</a>
            <a
              href="#preview"
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-lg shadow-sm transition-all text-xs font-bold"
            >
              实战控制台
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-10 space-y-14 relative z-10">
        {/* Hero 区域 */}
        <section className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            60FPS FLUID MICRO-INTERACTIONS
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            灵动流体浅色 UI 设计系统
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
            融入弹性动力学、丝滑跑马灯流、跳动波形与实时微交互。在纯净浅色的通透基底上，让每一个按钮、开关与卡片都充满“活着”的动感。
          </p>

          <div className="flex flex-wrap gap-4 pt-5 mt-1">
            <button
              onClick={handleCopy}
              className="flow-border flex items-center gap-2 px-5 py-2.5 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:shadow-lg active:scale-90 text-white rounded-xl shadow-sm transition-all duration-200"
            >
              {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
              {copied ? '动效规范已复制' : '复制核心交互规范'}
            </button>
            <a
              href="https://github.com/zaz52/-"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 font-bold text-sm bg-white hover:bg-slate-50 hover:shadow-md active:scale-95 text-slate-700 border border-slate-200 rounded-xl shadow-sm transition-all"
            >
              <Github size={16} /> 仓库源码
            </a>
          </div>
        </section>

        {/* 动态亮点 1：无限平滑水平跑马灯 (Infinite Marquee) */}
        <section id="marquee" className="bg-white border border-slate-200/80 rounded-2xl py-3.5 px-2 overflow-hidden shadow-sm">
          <div className="animate-marquee gap-4">
            {[
              { text: '⚡ 弹性按压按钮', bg: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
              { text: '✦ iOS 流体开关', bg: 'bg-amber-50 text-amber-700 border-amber-100' },
              { text: '▲ 实时波形均衡器', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { text: '● 聚焦光晕输入框', bg: 'bg-purple-50 text-purple-700 border-purple-100' },
              { text: '★ 平滑选项卡滑块', bg: 'bg-sky-50 text-sky-700 border-sky-100' },
              { text: '■ 动态微悬浮卡片', bg: 'bg-rose-50 text-rose-700 border-rose-100' },
              { text: '⚡ 弹性按压按钮', bg: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
              { text: '✦ iOS 流体开关', bg: 'bg-amber-50 text-amber-700 border-amber-100' },
              { text: '▲ 实时波形均衡器', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { text: '● 聚焦光晕输入框', bg: 'bg-purple-50 text-purple-700 border-purple-100' },
              { text: '★ 平滑选项卡滑块', bg: 'bg-sky-50 text-sky-700 border-sky-100' },
              { text: '■ 动态微悬浮卡片', bg: 'bg-rose-50 text-rose-700 border-rose-100' },
            ].map((item, idx) => (
              <span
                key={idx}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border ${item.bg} shadow-xs cursor-default hover:scale-105 transition-transform`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </section>

        {/* 1. 色彩与设计令牌 Tokens */}
        <section id="tokens" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Layers size={18} className="text-indigo-600" /> 01 / COLOR TOKENS 设计色彩系统
            </h2>
            <span className="text-xs text-slate-500 font-medium">通透高亮色阶</span>
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
              <div key={idx} className="border border-slate-200/80 p-3 bg-white rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
                <div className={`h-14 ${col.bg} rounded-lg flex items-end p-2 mb-2`}>
                  <span className={`text-[10px] font-bold ${col.text}`}>{col.hex}</span>
                </div>
                <div className="text-xs font-bold text-slate-800">{col.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 动态按钮控件体系 Buttons */}
        <section id="buttons" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Sparkles size={18} className="text-indigo-600" /> 02 / BUTTONS 动态弹性按钮体系
            </h2>
            <span className="text-xs text-slate-500 font-medium">支持点击缩放与触感回弹</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setClickCount(c => c + 1)}
                className="px-5 py-2.5 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-90 text-white rounded-xl shadow-sm hover:shadow-indigo-200 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Zap size={16} /> 弹性按压 (触发计数: {clickCount})
              </button>

              <button className="px-5 py-2.5 font-bold text-sm bg-white hover:bg-slate-50 hover:scale-105 active:scale-95 text-slate-700 border border-slate-200 rounded-xl shadow-sm transition-all">
                微悬浮提升按钮
              </button>

              <button className="px-5 py-2.5 font-bold text-sm bg-emerald-600 hover:bg-emerald-700 hover:scale-105 active:scale-95 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5">
                <Check size={16} strokeWidth={2.5} /> 成功保存态
              </button>

              <button className="px-5 py-2.5 font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all">
                幽灵底色按钮
              </button>

              <button className="px-4 py-2 font-bold text-sm bg-rose-50 text-rose-600 hover:bg-rose-100 active:scale-95 border border-rose-200 rounded-xl transition-all">
                危险操作
              </button>

              <button disabled className="px-4 py-2 font-bold text-sm bg-slate-100 text-slate-400 rounded-xl cursor-not-allowed">
                已禁用状态
              </button>
            </div>
          </div>
        </section>

        {/* 3. 动态表单与实时跳动波形 Form Controls */}
        <section id="inputs" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Sliders size={18} className="text-indigo-600" /> 03 / FORM CONTROLS 动效输入与实时音波
            </h2>
            <span className="text-xs text-slate-500 font-medium">平滑聚焦环、实时波形均衡器</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">发光聚焦输入框</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="在此输入文本试试..."
                className="w-full px-4 py-2.5 font-medium text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
              <span className="text-[11px] text-slate-400 font-medium">当前值: {inputValue || '(空)'}</span>
            </div>

            {/* 带实时音波波形图的模块 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">实时音频 / 信号波形条</label>
                <button 
                  onClick={() => setIsBeating(!isBeating)}
                  className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <Volume2 size={12} /> {isBeating ? '暂停跳动' : '开启跳动'}
                </button>
              </div>
              <div className="h-[42px] border border-slate-200 bg-slate-50/80 rounded-xl px-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isBeating ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`}></span>
                  AUDIO SPECTRUM:
                </span>
                <div className="flex items-center gap-1 h-7">
                  <div className={`w-1.5 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-1' : 'h-3'}`}></div>
                  <div className={`w-1.5 bg-indigo-500 rounded-full ${isBeating ? 'animate-eq-2' : 'h-4'}`}></div>
                  <div className={`w-1.5 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-3' : 'h-2'}`}></div>
                  <div className={`w-1.5 bg-indigo-500 rounded-full ${isBeating ? 'animate-eq-4' : 'h-5'}`}></div>
                  <div className={`w-1.5 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-5' : 'h-2'}`}></div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">带图标搜索框</label>
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="搜索动态组件..."
                  className="w-full pl-10 pr-4 py-2.5 font-medium text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">选择与切换</label>
              <div className="flex flex-wrap items-center gap-6">
                <div
                  onClick={() => setSwitchOn(!switchOn)}
                  className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out flex items-center ${
                    switchOn ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                      switchOn ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-700">实时广播: {switchOn ? '运行中' : '已暂停'}</span>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-slate-700">
                  <div
                    onClick={() => setCheckedA(!checkedA)}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      checkedA ? 'bg-indigo-600 border-indigo-600 text-white scale-105' : 'bg-white border-slate-300'
                    }`}
                  >
                    {checkedA && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span>自动推流</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-slate-700">
                  <div
                    onClick={() => setCheckedB(!checkedB)}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      checkedB ? 'bg-indigo-600 border-indigo-600 text-white scale-105' : 'bg-white border-slate-300'
                    }`}
                  >
                    {checkedB && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span>震动反馈</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 动态卡片与选项卡 Tabs */}
        <section id="cards" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Type size={18} className="text-indigo-600" /> 04 / CARDS & TABS 动态卡片与交互选项卡
            </h2>
            <span className="text-xs text-slate-500 font-medium">平滑滑块与微悬浮</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flow-border flow-border-xl bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>THROUGHPUT METRIC</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <TrendingUp size={12} /> +28.4%
                </span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight">1,420 rps</div>
              <p className="text-xs text-slate-500 font-medium mt-2">
                实时网络吞吐量，GPU 硬件加速渲染。
              </p>
            </div>

            <div className="flow-border flow-border-xl bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300">
              {/* 平滑布局滑块：背景胶囊跟随滑动 */}
              <div className="relative flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-bold">
                <div
                  aria-hidden
                  className="absolute left-1 top-1 bottom-1 rounded-lg bg-white shadow-xs transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{
                    width: 'calc((100% - 0.5rem) / 3)',
                    transform: `translateX(${activeTabIndex * 100}%)`,
                  }}
                />
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`relative z-10 flex-1 py-1.5 rounded-lg transition-colors duration-200 ${
                      activeTab === t.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-medium text-slate-700">
                {activeTab === 'preview' && '🟢 当前处于组件预览模式，无缝响应事件。'}
                {activeTab === 'motion' && '⚡ 开启弹簧物理动画，提供 60fps 微交互。'}
                {activeTab === 'code' && '💻 纯净 React 18 + Tailwind，零多余依赖。'}
              </div>
            </div>

            <div className="flow-border flow-border-xl bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center animate-pulse">
                  唯
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">唯一 (Weiyi)</div>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Activity size={12} className="text-emerald-500" /> Motion & UI Engineer
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 rounded">#Motion</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 rounded">#Spring</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 动态实战控制台窗口 */}
        <section id="preview" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <ExternalLink size={18} className="text-indigo-600" /> 05 / ASSEMBLED WORKSPACE 动态控制台实战窗口
            </h2>
            <span className="text-xs text-slate-500 font-medium">完整动态装配</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="border-b border-slate-200 px-4 py-3 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <span className="text-xs font-semibold text-slate-500">MOTION_STUDIO.TSX</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> 
                ● LIVE
              </span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">交互动力学控制中心</h3>
                  <p className="text-xs text-slate-500 font-medium">统一监控组件帧率、物理弹簧与动画事件</p>
                </div>
                <button 
                  onClick={() => alert('已成功发送模拟信号事件！')}
                  className="px-4 py-2 font-bold text-xs bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-lg shadow-sm transition-all"
                >
                  + 发送模拟信号事件
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-100 p-4 bg-slate-50/60 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500">渲染帧率表现</span>
                  <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
                    60 FPS <span className="text-xs font-normal text-slate-400">(GPU 硬件加速)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">零多余动画库体积，极速流畅</div>
                </div>

                <div className="border border-slate-100 p-4 bg-slate-50/60 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500">动态组件实例</span>
                  <div className="text-2xl font-bold mt-1 text-indigo-600">32 个动态控件</div>
                  <div className="text-[11px] text-slate-500 mt-1">涵盖跑马灯、弹性按钮、波形与滑动切换</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 底部版权 */}
        <footer className="border-t border-slate-200 pt-8 pb-4 text-center">
          <h3 className="text-sm font-bold text-slate-900">WEIYI MOTION UI DESIGN SYSTEM</h3>
          <p className="text-xs text-slate-500 mt-1">
            Crafted with Fluid Motion Light UI & React 18
          </p>
        </footer>
      </main>
    </div>
  );
}
