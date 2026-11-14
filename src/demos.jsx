import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Play, Shuffle, RotateCcw, Lightbulb, Wrench, Eye, Check, Search, Calculator, CloudSun, UserCheck, Ticket,
  MessageSquare, Workflow, Target,
} from 'lucide-react';
import { R } from './ui.jsx';

/* ------------------------------------------------------------------ */
/* 1. Autocomplete: a tiny next-word model trained on 25 sentences     */
/* ------------------------------------------------------------------ */

export const CORPUS = [
  'i am going to the library to study',
  'i am going to the canteen with my friends',
  'i am going to the gym after class',
  'i love coding in python',
  'i love the food in the canteen',
  'my friends are going to the fest tonight',
  'the exam is on monday morning',
  'the fest is going to be amazing',
  'we are going to build an ai agent',
  'we are learning about agentic ai today',
  'agentic ai can plan and take actions',
  'ai can write code and fix bugs',
  'the professor said the exam is easy',
  'i need to submit the assignment today',
  'i need to study for the exam',
  'my laptop is very slow today',
  'the wifi in the hostel is very slow',
  'let us go to the canteen for chai',
  'i think ai is going to change everything',
  'python is the best language to learn ai',
  'the canteen has the best chai',
  'my friends love the fest',
  'i want to learn ai this year',
  'we need to study for the exam on monday',
  'the agent can book a ticket for me',
];

function buildModel(corpus) {
  const next = new Map();
  const vocab = new Set();
  for (const s of corpus) {
    const w = s.split(' ');
    w.forEach((x) => vocab.add(x));
    for (let i = 0; i < w.length - 1; i++) {
      if (!next.has(w[i])) next.set(w[i], new Map());
      const m = next.get(w[i]);
      m.set(w[i + 1], (m.get(w[i + 1]) || 0) + 1);
    }
  }
  return { next, vocab: [...vocab] };
}

function predictions(model, word) {
  const m = model.next.get(word);
  if (!m) return [];
  const total = [...m.values()].reduce((a, b) => a + b, 0);
  return [...m.entries()]
    .map(([w, c]) => ({ w, c, p: c / total }))
    .sort((a, b) => b.c - a.c || a.w.localeCompare(b.w));
}

export function AutocompleteDemo() {
  const model = useMemo(() => buildModel(CORPUS), []);
  const [text, setText] = useState('i am ');
  const [showData, setShowData] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const endsWithSpace = text === '' || /\s$/.test(text);
  const words = text.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const partial = endsWithSpace ? '' : words[words.length - 1] || '';
  const prevWord = endsWithSpace ? words[words.length - 1] : words[words.length - 2];

  let preds = prevWord ? predictions(model, prevWord) : [];
  if (partial) {
    preds = preds.filter((p) => p.w.startsWith(partial));
    if (preds.length === 0) {
      preds = model.vocab.filter((v) => v.startsWith(partial)).slice(0, 3).map((w) => ({ w, p: 0 }));
    }
  }
  const top = preds.slice(0, 3);
  const barsFor = prevWord ? predictions(model, prevWord).slice(0, 5) : [];

  const accept = (w) => {
    setText((t) => {
      const base = /\s$/.test(t) || t === '' ? t : t.replace(/\S+$/, '');
      return `${base}${w} `;
    });
  };

  const autoWrite = (mode) => {
    clearInterval(timer.current);
    let n = 0;
    timer.current = setInterval(() => {
      n++;
      setText((t) => {
        const ws = t.trim().split(/\s+/);
        const p = predictions(model, ws[ws.length - 1]);
        if (!p.length || n > 14) {
          clearInterval(timer.current);
          return t;
        }
        let pick = p[0].w;
        if (mode === 'random') {
          let r = Math.random();
          for (const x of p) {
            r -= x.p;
            if (r <= 0) {
              pick = x.w;
              break;
            }
          }
        }
        return `${t.replace(/\s*$/, ' ')}${pick} `;
      });
    }, 420);
  };

  return (
    <div className="row" style={{ gap: 56, alignItems: 'flex-start' }}>
      <div className="col" style={{ gap: 16 }}>
        <div className="phone">
          <div className="phone-screen">
            <div className="phone-msg">
              {text}
              <span className="cursor-blink" />
            </div>
            <input
              className="phone-input"
              value={text}
              placeholder="Type here"
              onChange={(e) => {
                clearInterval(timer.current);
                setText(e.target.value);
              }}
            />
            <div className="suggest">
              {[0, 1, 2].map((i) => (
                <button key={i} onClick={() => top[i] && accept(top[i].w)} disabled={!top[i]}>
                  {top[i]?.w || ''}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn primary" onClick={() => autoWrite('greedy')}><Play size={16} /> Always pick the top word</button>
          <button className="btn" onClick={() => autoWrite('random')}><Shuffle size={16} /> Pick at random</button>
          <button className="btn" onClick={() => { clearInterval(timer.current); setText(''); }} aria-label="Clear"><RotateCcw size={16} /></button>
        </div>
      </div>

      <div className="col fill" style={{ gap: 22 }}>
        <div className="card">
          <div className="label">Next-word probabilities</div>
          <h3 className="mt8">
            After “<span className="blue">{prevWord || '…'}</span>”
          </h3>
          {barsFor.length ? (
            <div className="bars mt16">
              {barsFor.map((p, i) => (
                <div className={`bar-row ${i === 0 ? 'pick' : ''}`} key={p.w}>
                  <span className="w">{p.w}</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${p.p * 100}%` }} /></div>
                  <span className="p">{Math.round(p.p * 100)}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt16">{prevWord ? 'This word never appeared in the training text, so the model has no guess.' : 'Start typing.'}</p>
          )}
        </div>
        <div className="card">
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="label">How it was trained</div>
            <button className="btn" style={{ fontSize: 14, padding: '6px 12px' }} onClick={() => setShowData((v) => !v)}>
              {showData ? 'Hide training text' : 'Show training text'}
            </button>
          </div>
          {showData ? (
            <div className="mono mt16" style={{ fontSize: 14, color: 'var(--muted)', columns: 2, lineHeight: 1.6 }}>
              {CORPUS.map((s) => <div key={s}>{s}</div>)}
            </div>
          ) : (
            <p className="mt16">
              It read <b>{CORPUS.length} sentences</b> and counted which word follows which. There are no grammar rules and
              no dictionary.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Next-token prediction (illustrative numbers)                     */
/* ------------------------------------------------------------------ */

const NT_PROMPT = 'The best thing about agentic AI is that it can'.split(' ');
const NT_STEPS = [
  { pick: 'take', cands: [['take', 0.34], ['help', 0.21], ['plan', 0.15], ['actually', 0.12], ['learn', 0.08]] },
  { pick: 'action', cands: [['action', 0.46], ['over', 0.19], ['care', 0.13], ['notes', 0.07], ['the', 0.06]] },
  { pick: 'on', cands: [['on', 0.41], ['without', 0.22], ['for', 0.14], ['.', 0.11], ['by', 0.05]] },
  { pick: 'your', cands: [['your', 0.58], ['its', 0.17], ['behalf', 0.1], ['real', 0.06], ['our', 0.04]] },
  { pick: 'behalf.', cands: [['behalf.', 0.81], ['own', 0.07], ['computer', 0.05], ['data', 0.03], ['phone', 0.02]] },
];

export function NextTokenDemo({ step }) {
  const chosen = NT_STEPS.slice(0, step).map((s) => s.pick);
  const cur = NT_STEPS[step];
  return (
    <div className="grid2" style={{ gridTemplateColumns: '1.1fr 1fr', gap: 40, alignItems: 'stretch' }}>
      <div className="card" style={{ minHeight: 380 }}>
        <div className="label">Text so far · step {step} of {NT_STEPS.length}</div>
        <div className="token-line mt16">
          {NT_PROMPT.map((w, i) => <span key={i} className="token">{w}</span>)}
          {chosen.map((w, i) => <span key={`c${i}`} className="token gen">{w}</span>)}
          {cur && <span className="cursor-blink" />}
        </div>
      </div>
      <div className="card" style={{ minHeight: 380 }}>
        {cur ? (
          <>
            <div className="label">Model’s estimate for the next word</div>
            <div className="bars mt24">
              {cur.cands.map(([w, p]) => (
                <div className={`bar-row ${w === cur.pick ? 'pick' : ''}`} key={w}>
                  <span className="w">{w}</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${p * 100}%` }} /></div>
                  <span className="p">{Math.round(p * 100)}%</span>
                </div>
              ))}
            </div>
            <p className="small faint mt24">Illustrative numbers. Press → to add the chosen word.</p>
          </>
        ) : (
          <div className="col vcenter" style={{ height: '100%' }}>
            <div className="label">That is the whole process</div>
            <p className="lead mt8" style={{ fontSize: 30 }}>
              Estimate the next word, add it, repeat. Everything an LLM writes is produced this way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Chatbot vs Agent                                                 */
/* ------------------------------------------------------------------ */

export function ChatVsAgent({ step }) {
  const ask = 'My order #4521 hasn’t arrived and I need it by Saturday.';
  return (
    <div className="grid2 vs" style={{ gap: 32, alignItems: 'start' }}>
      <div className="card">
        <div className="chat-head"><span className="glyph" style={{ width: 40, height: 40 }}><MessageSquare size={20} strokeWidth={1.6} /></span> Chatbot</div>
        <div className="chat mt8">
          <div className="bubble user">{ask}</div>
          <R show={step >= 1} className="bubble bot">
            Sorry to hear that. You can check the tracking page in your account or contact customer support at
            1800-XXX-XXXX.
          </R>
          <R show={step >= 1} className="small muted">The customer still has to do everything.</R>
        </div>
      </div>
      <div className="card em">
        <div className="chat-head"><span className="glyph blue" style={{ width: 40, height: 40 }}><Workflow size={20} strokeWidth={1.6} /></span> Agent</div>
        <div className="chat mt8">
          <div className="bubble user">{ask}</div>
          <R show={step >= 2} className="bubble tool">
            lookup_order(4521)<span className="res">→ held at Pune hub for 3 days</span>
          </R>
          <R show={step >= 3} className="bubble tool">
            check_stock(item, near=&quot;Bangalore&quot;)<span className="res">→ 12 in stock, delivery Friday</span>
          </R>
          <R show={step >= 4} className="bubble bot">
            Your parcel is held in Pune. I can send a new one from Bangalore that arrives Friday and cancel the old one.
            Should I go ahead?
          </R>
          <R show={step >= 5} className="bubble user">Yes, please.</R>
          <R show={step >= 5} className="bubble tool">
            create_replacement(4521)<span className="res">→ done, tracking #BLR-88213</span>
          </R>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Agent trace                                                      */
/* ------------------------------------------------------------------ */

const TRACE = [
  {
    think: 'I need transport and a place to stay, within budget. Start with transport.',
    act: 'search_transport(from="Bangalore", to="Goa", date="Fri night")',
    obs: 'Sleeper bus ₹1,100 · Train 3AC ₹1,450 (waitlisted)',
    tool: 'search',
  },
  {
    think: 'The train is waitlisted, which is risky for four people. The bus fits. Now find a stay.',
    act: 'search_stays(area="Anjuna", guests=4, nights=2)',
    obs: 'Hostel ₹650 per person per night (4.5★) · Villa ₹9,000 per night',
    tool: 'search',
  },
  {
    think: 'The villa is ₹2,250 per person per night, too expensive. Choose the hostel and check the total.',
    act: 'calculator("2*1100 + 2*650 + 2*1200")   # bus + stay + food',
    obs: '5,900',
    tool: 'calc',
  },
  {
    think: '₹5,900 is within the ₹6,000 budget. Check the weather before confirming.',
    act: 'get_weather(city="Goa", when="next weekend")',
    obs: 'Sunny, 31°C, low chance of rain',
    tool: 'weather',
  },
  {
    think: 'The plan works. Booking spends money, so ask the person first.',
    act: 'ask_user("Book bus and hostel for 4? Total ₹23,600")',
    obs: 'User: “Yes, go ahead.”',
    tool: 'human',
  },
  {
    think: 'Approved. Make the bookings.',
    act: 'book(bus="KSRTC-Fri-2130", stay="Anjuna Hostel", people=4)',
    obs: 'Confirmed · ref #GOA-4821',
    tool: 'book',
  },
];

const TOOLS = [
  ['search', Search, 'Search'],
  ['calc', Calculator, 'Calculator'],
  ['weather', CloudSun, 'Weather'],
  ['human', UserCheck, 'Ask person'],
  ['book', Ticket, 'Booking'],
];

export function AgentTraceDemo({ step }) {
  const shown = TRACE.slice(0, Math.min(step, TRACE.length));
  const done = step > TRACE.length;
  const used = new Set(shown.map((s) => s.tool));

  return (
    <div className="row fill" style={{ gap: 28, minHeight: 0 }}>
      <div className="col fill" style={{ minHeight: 0, gap: 12 }}>
        <div className="card tinted" style={{ padding: '16px 22px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <Target size={26} strokeWidth={1.6} className="blue" style={{ flex: 'none' }} />
          <div>
            <div className="label">Goal</div>
            <div style={{ fontSize: 21, fontWeight: 500, marginTop: 2 }}>
              Plan a 2-day Goa trip for 4 friends from Bangalore next weekend. Budget ₹6,000 per person.
            </div>
          </div>
        </div>
        <div className="trace">
          {shown.map((s, i) =>
            i < shown.length - 1 || done ? (
              <div key={i} className="trace-step mini">
                <Check size={16} className="green" />
                <span className="mono">{s.act.split('(')[0]}</span>
                <span>{s.obs}</span>
              </div>
            ) : (
              <div key={i} className="trace-step latest">
                <div className="trace-line"><span className="k think"><Lightbulb size={15} /> Think</span><span className="v">{s.think}</span></div>
                <div className="trace-line"><span className="k act"><Wrench size={15} /> Act</span><span className="v mono">{s.act}</span></div>
                <div className="trace-line"><span className="k obs"><Eye size={15} /> Observe</span><span className="v">{s.obs}</span></div>
              </div>
            ),
          )}
          {done && (
            <div className="trace-step done">
              <div className="label green">Result</div>
              <div style={{ fontSize: 20, lineHeight: 1.5, marginTop: 4 }}>
                Bus on Friday at 9:30 PM, two nights at a hostel in Anjuna, bus back on Sunday night. ₹5,900 per person.
                Booking ref #GOA-4821.
              </div>
            </div>
          )}
          {step === 0 && <p className="body faint mt8">Press → to run one loop at a time.</p>}
        </div>
      </div>

      <div className="col" style={{ width: 340, flex: 'none', gap: 16 }}>
        <div className="card">
          <div className="label">Loop</div>
          <div className="stat mt8" style={{ fontSize: 52 }}>
            {Math.min(step, TRACE.length)}<span className="faint" style={{ fontSize: 26 }}> / {TRACE.length}</span>
          </div>
          <p className="note">{done ? 'Goal met, so the agent stops.' : 'Think, act, observe, then repeat.'}</p>
        </div>
        <div className="card">
          <div className="label">Tools available</div>
          <div className="col mt16" style={{ gap: 10 }}>
            {TOOLS.map(([k, Icon, l]) => (
              <div key={k} className="row" style={{ gap: 12, alignItems: 'center', fontSize: 18, color: used.has(k) ? 'var(--ink)' : 'var(--faint)', transition: 'color 0.3s' }}>
                <Icon size={19} strokeWidth={1.6} className={used.has(k) ? 'orange' : ''} /> {l}
                {used.has(k) && <Check size={16} className="green" style={{ marginLeft: 'auto' }} />}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="label">Cost per person</div>
          <div className="stat mt8" style={{ fontSize: 40 }}>
            <span className={step >= 3 ? 'green' : 'faint'}>{step >= 3 ? '₹5,900' : '—'}</span>
            <span className="faint" style={{ fontSize: 20 }}> of ₹6,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const TRACE_STEPS = TRACE.length + 1;

/* ------------------------------------------------------------------ */
/* 5. Compounding errors                                               */
/* ------------------------------------------------------------------ */

export function CompoundingDemo() {
  const [acc, setAcc] = useState(95);
  const [n, setN] = useState(10);
  const success = Math.pow(acc / 100, n) * 100;
  const boxes = 100;
  const good = Math.round(success);
  return (
    <div className="card" style={{ padding: '28px 32px' }}>
      <div className="slider-row">
        <span>Accuracy per step</span>
        <input type="range" min="80" max="99.9" step="0.1" value={acc} onChange={(e) => setAcc(+e.target.value)} />
        <b>{acc.toFixed(1)}%</b>
      </div>
      <div className="slider-row mt16">
        <span>Steps in the task</span>
        <input type="range" min="1" max="50" step="1" value={n} onChange={(e) => setN(+e.target.value)} />
        <b>{n}</b>
      </div>
      <div className="row mt32" style={{ alignItems: 'center', gap: 40 }}>
        <div style={{ width: 230, flex: 'none' }}>
          <div className={`stat ${success > 80 ? 'green' : success > 50 ? 'orange' : 'red'}`} style={{ fontSize: 76 }}>
            {success.toFixed(success < 10 ? 1 : 0)}%
          </div>
          <div className="stat-label">of runs finish with no mistakes</div>
        </div>
        <div className="fill">
          <div className="runs">
            {Array.from({ length: boxes }, (_, i) => <span key={i} className={i < good ? '' : 'f'} />)}
          </div>
          <p className="small muted mt8">100 runs of the same task. Red runs contain at least one wrong step.</p>
        </div>
      </div>
      <p className="mono small faint mt16">{(acc / 100).toFixed(3)}^{n} = {(success / 100).toFixed(3)}</p>
    </div>
  );
}
