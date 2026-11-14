// Hand-built line illustrations and diagrams.
// One visual language everywhere: 1.6px strokes, ink lines, one accent colour.

import { Brain, Eye, Lightbulb, Wrench, Target } from 'lucide-react';

const S = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

/* ENIAC: a row of panels covered in vacuum tubes and dials */
export function EniacFigure({ width = 520 }) {
  const panels = Array.from({ length: 7 }, (_, i) => 16 + i * 70);
  return (
    <svg viewBox="0 0 520 250" width={width} aria-label="Line drawing of the ENIAC computer panels">
      <line x1="4" y1="226" x2="516" y2="226" {...S} stroke="var(--rule)" />
      {panels.map((x, p) => (
        <g key={x}>
          <rect x={x} y="36" width="62" height="190" rx="2" {...S} />
          <line x1={x} y1="50" x2={x + 62} y2="50" {...S} strokeWidth="1" />
          {Array.from({ length: 6 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => (
              <circle
                key={`${r}${c}`}
                cx={x + 13 + c * 12}
                cy={66 + r * 13}
                r="3.4"
                {...S}
                strokeWidth="1.2"
                fill={(r * 4 + c + p) % 7 === 0 ? 'var(--orange)' : 'none'}
                stroke={(r * 4 + c + p) % 7 === 0 ? 'var(--orange)' : 'var(--ink)'}
              />
            )),
          )}
          <circle cx={x + 19} cy="160" r="9" {...S} />
          <line x1={x + 19} y1="160" x2={x + 24} y2="154" {...S} />
          <circle cx={x + 43} cy="160" r="9" {...S} />
          <line x1={x + 43} y1="160" x2={x + 37} y2="155" {...S} />
          {Array.from({ length: 5 }, (_, k) => (
            <line key={k} x1={x + 11 + k * 10} y1="190" x2={x + 11 + k * 10} y2="204" {...S} strokeWidth="1.2" />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* A mechanical desk calculator next to a stack of worksheets */
export function DeskCalculatorFigure({ width = 300 }) {
  return (
    <svg viewBox="0 0 300 250" width={width} aria-label="Line drawing of a desk calculator and paper worksheets">
      <line x1="4" y1="226" x2="296" y2="226" {...S} stroke="var(--rule)" />
      {/* calculator body */}
      <path d="M20 226 L36 120 L170 120 L186 226 Z" {...S} />
      <rect x="52" y="96" width="104" height="24" rx="2" {...S} />
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={62 + i * 12.3} cy="108" r="3.4" {...S} strokeWidth="1.2" />
      ))}
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 7 }, (_, c) => (
          <rect key={`${r}${c}`} x={44 + c * 18 - r * 2} y={136 + r * 20} width="11" height="11" rx="2" {...S} strokeWidth="1.2" />
        )),
      )}
      {/* crank */}
      <line x1="186" y1="170" x2="206" y2="170" {...S} />
      <circle cx="210" cy="170" r="5" {...S} />
      <line x1="210" y1="170" x2="210" y2="146" {...S} />
      <circle cx="210" cy="142" r="4" {...S} fill="var(--orange)" stroke="var(--orange)" />
      {/* worksheets */}
      <g transform="translate(224 150) rotate(-6)">
        <rect x="0" y="0" width="58" height="74" rx="2" {...S} fill="var(--surface)" />
      </g>
      <g transform="translate(230 146) rotate(3)">
        <rect x="0" y="0" width="58" height="74" rx="2" {...S} fill="var(--surface)" />
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1="9" y1={14 + i * 10} x2={i % 2 ? 40 : 49} y2={14 + i * 10} {...S} strokeWidth="1" />
        ))}
      </g>
    </svg>
  );
}

/* The agent loop: Think -> Act -> Observe around a goal */
const NODES = [
  { k: 'think', icon: Lightbulb, t: 'Think', d: 'Decide the next step', tone: 'blue', a: -90 },
  { k: 'act', icon: Wrench, t: 'Act', d: 'Use a tool', tone: 'orange', a: 30 },
  { k: 'obs', icon: Eye, t: 'Observe', d: 'Read the result', tone: 'green', a: 150 },
];

export function AgentLoop({ active = -1, all = false, size = 540, showText = true }) {
  const c = size / 2;
  const r = size * 0.36;
  const node = size * 0.3;
  const pt = (deg, rad = r) => [c + rad * Math.cos((deg * Math.PI) / 180), c + rad * Math.sin((deg * Math.PI) / 180)];
  const arc = (from, to) => {
    const gap = 30;
    const [x1, y1] = pt(from + gap);
    const [x2, y2] = pt(to - gap);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <marker id="loop-ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M1,1 L9,5 L1,9" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
          </marker>
        </defs>
        <path d={arc(-90, 30)} {...S} markerEnd="url(#loop-ah)" />
        <path d={arc(30, 150)} {...S} markerEnd="url(#loop-ah)" />
        <path d={arc(150, 270)} {...S} markerEnd="url(#loop-ah)" />
      </svg>
      {NODES.map((n, i) => {
        const [x, y] = pt(n.a);
        const on = all || active === i;
        const Icon = n.icon;
        return (
          <div
            key={n.k}
            style={{
              position: 'absolute', left: x - node / 2, top: y - node / 2, width: node, height: node,
              borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: on ? `var(--${n.tone}-tint)` : 'var(--surface)',
              border: `1.5px solid ${on ? `var(--${n.tone})` : 'var(--rule)'}`,
              color: on ? `var(--${n.tone})` : 'var(--ink)', transition: 'all 0.3s', textAlign: 'center',
            }}
          >
            <Icon size={size * 0.06} strokeWidth={1.6} />
            <span style={{ fontWeight: 600, fontSize: size * 0.045, marginTop: 6, color: 'var(--ink)' }}>{n.t}</span>
            {showText && <span style={{ fontSize: size * 0.028, color: 'var(--muted)', marginTop: 2, maxWidth: node - 40, lineHeight: 1.3 }}>{n.d}</span>}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: c - 60, top: c - 22, width: 120, textAlign: 'center', color: 'var(--muted)' }}>
        <Target size={size * 0.05} strokeWidth={1.6} />
        <div className="label" style={{ fontSize: size * 0.024, marginTop: 4 }}>Goal</div>
      </div>
    </div>
  );
}

/* Hub: a model in the middle, tools around it */
export function ToolHub({ tools, show = true, width = 560, height = 440 }) {
  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.4;
  const ry = height * 0.4;
  const pos = tools.map((_, i) => {
    const a = (-90 + (360 / tools.length) * i) * (Math.PI / 180);
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });
  return (
    <div style={{ position: 'relative', width, height, flex: 'none' }}>
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        {pos.map(([x, y], i) => (
          <line
            key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--rule)" strokeWidth="1.4"
            strokeDasharray="4 5" style={{ opacity: show ? 1 : 0, transition: 'opacity 0.4s' }}
          />
        ))}
      </svg>
      <div
        style={{
          position: 'absolute', left: cx - 70, top: cy - 70, width: 140, height: 140, borderRadius: '50%',
          background: 'var(--ink)', color: 'var(--paper)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Brain size={40} strokeWidth={1.5} />
        <span style={{ fontWeight: 600, fontSize: 20, marginTop: 6 }}>LLM</span>
      </div>
      {tools.map(([Icon, label], i) => (
        <div
          key={label}
          style={{
            position: 'absolute', left: pos[i][0] - 60, top: pos[i][1] - 34, width: 120, textAlign: 'center',
            opacity: show ? 1 : 0, transform: show ? 'none' : 'scale(0.9)', transition: `all 0.35s ease ${i * 50}ms`,
          }}
        >
          <span className="glyph orange" style={{ width: 48, height: 48, background: 'var(--surface)', border: '1px solid var(--rule)' }}>
            <Icon size={22} strokeWidth={1.6} />
          </span>
          <div style={{ fontSize: 16, marginTop: 6, color: 'var(--ink-2)' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

/* Org-chart style tree with elbow connectors */
export function Tree({ root, children, show = true, width = 1376 }) {
  const n = children.length;
  const colW = width / n;
  const xs = children.map((_, i) => colW * i + colW / 2);
  return (
    <div style={{ width }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>{root}</div>
      <svg width={width} height="60" style={{ display: 'block', opacity: show ? 1 : 0, transition: 'opacity 0.4s' }}>
        <line x1={width / 2} y1="0" x2={width / 2} y2="30" {...S} stroke="var(--faint)" />
        <line x1={xs[0]} y1="30" x2={xs[n - 1]} y2="30" {...S} stroke="var(--faint)" />
        {xs.map((x) => (
          <line key={x} x1={x} y1="30" x2={x} y2="60" {...S} stroke="var(--faint)" />
        ))}
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 20, opacity: show ? 1 : 0, transition: 'opacity 0.4s' }}>
        {children}
      </div>
    </div>
  );
}

/* Horizontal bar comparison for two durations */
export function TimeBars({ show }) {
  return (
    <div className="col" style={{ gap: 26 }}>
      <div>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="body">Person with a desk calculator</span>
          <span className="mono" style={{ fontSize: 22 }}>≈ 20 hours</span>
        </div>
        <div style={{ height: 26, background: 'var(--ink)', marginTop: 10, borderRadius: 2 }} />
      </div>
      <div className={`reveal ${show ? '' : 'off'}`}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="body">ENIAC, 1946</span>
          <span className="mono blue" style={{ fontSize: 22 }}>≈ 30 seconds</span>
        </div>
        <div style={{ height: 26, marginTop: 10, borderRadius: 2, background: 'var(--tint)', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'var(--blue)' }} />
        </div>
        <p className="small muted mt8">About 2,400 times faster. Drawn to scale, this bar would be less than one pixel wide.</p>
      </div>
    </div>
  );
}
