import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slides from './slides/index.js';

const W = 1600;
const H = 900;

function readHash() {
  const m = window.location.hash.match(/^#\/(\d+)(?:\/(\d+))?/);
  if (!m) return { idx: 0, step: 0 };
  const idx = Math.min(Math.max(parseInt(m[1], 10) - 1, 0), slides.length - 1);
  const step = Math.min(parseInt(m[2] || '0', 10), slides[idx].steps || 0);
  return { idx, step };
}

function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return scale;
}

function fmt(sec) {
  const s = Math.max(0, Math.floor(sec));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

// planned time (in minutes) at the start of each slide
const plannedStart = slides.reduce((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + (slides[i - 1].minutes || 1));
  return acc;
}, []);
const totalPlanned = plannedStart[slides.length - 1] + (slides[slides.length - 1].minutes || 1);

export default function App() {
  const [{ idx, step }, setPos] = useState(readHash);
  const [showNotes, setShowNotes] = useState(false);
  const [overview, setOverview] = useState(false);
  const [dark, setDark] = useState(false);
  const [t0, setT0] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const scale = useScale();

  const slide = slides[Math.min(idx, slides.length - 1)];
  const Comp = slide.Component;

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const h = `#/${idx + 1}${step ? `/${step}` : ''}`;
    if (window.location.hash !== h) window.history.replaceState(null, '', h);
  }, [idx, step]);

  useEffect(() => {
    const onHash = () => setPos(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  const next = useCallback(() => {
    setPos(({ idx, step }) => {
      const max = slides[idx].steps || 0;
      if (step < max) return { idx, step: step + 1 };
      if (idx < slides.length - 1) return { idx: idx + 1, step: 0 };
      return { idx, step };
    });
  }, []);

  const prev = useCallback(() => {
    setPos(({ idx, step }) => {
      if (step > 0) return { idx, step: step - 1 };
      if (idx > 0) return { idx: idx - 1, step: slides[idx - 1].steps || 0 };
      return { idx, step };
    });
  }, []);

  const go = useCallback((i, s = 0) => {
    setPos({ idx: Math.min(Math.max(i, 0), slides.length - 1), step: s });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
        if (e.key === 'Escape') e.target.blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(slides.length - 1);
          break;
        case 'n':
        case 'N':
          setShowNotes((v) => !v);
          break;
        case 'o':
        case 'O':
        case 'Escape':
          setOverview((v) => (e.key === 'Escape' ? false : !v));
          break;
        case 'l':
        case 'L':
          setDark((v) => !v);
          break;
        case 't':
        case 'T':
          setT0(Date.now());
          break;
        case 'f':
        case 'F':
          if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
          else document.exitFullscreen?.();
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go]);

  const elapsed = (now - t0) / 1000;
  const planned = plannedStart[idx] * 60;
  const drift = elapsed - planned;

  const sections = useMemo(() => {
    const out = [];
    slides.forEach((s, i) => {
      const last = out[out.length - 1];
      if (!last || last.name !== s.section) out.push({ name: s.section, items: [] });
      out[out.length - 1].items.push({ ...s, i });
    });
    return out;
  }, []);

  return (
    <div className="viewport">
      <div
        className="stage"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
      >
        <div className={`slide ${slide.className || ''}`} key={slide.id}>
          {slide.section && !slide.hideChrome && (
            <div className="chapter-tag">
              <b>{slide.section.split(' ')[0]}</b>
              {slide.section.split(' ').slice(1).join(' ')}
            </div>
          )}
          <Comp step={step} go={go} />
        </div>

        {!slide.hideFooter && (
          <div className="footer">
            <div className="footer-progress" style={{ width: `${((idx + 1) / slides.length) * 100}%` }} />
            <span>Agentic AI: from concepts to real-world applications</span>
            <span>
              {String(idx + 1).padStart(2, '0')} / {slides.length}
            </span>
          </div>
        )}
        <div className="nav-buttons">
          <button onClick={prev} aria-label="Previous"><ChevronLeft size={18} /></button>
          <button onClick={next} aria-label="Next"><ChevronRight size={18} /></button>
        </div>

        {showNotes && (
          <div className="notes">
            <div className="notes-head">
              <span>Speaker notes · slide {idx + 1}</span>
              <span className="notes-time">
                {fmt(elapsed)} elapsed · plan {fmt(planned)} ·{' '}
                <b className={drift > 60 ? 'behind' : drift < -60 ? 'ahead' : 'ontrack'}>
                  {drift > 60 ? `${fmt(drift)} behind` : drift < -60 ? `${fmt(-drift)} ahead` : 'on track'}
                </b>{' '}
                · this slide ~{slide.minutes || 1} min · total {totalPlanned} min
              </span>
            </div>
            <div className="notes-body">{slide.notes}</div>
            <div className="notes-keys">→/Space next · ← back · N notes · O overview · F fullscreen · L dark/light · T reset timer</div>
          </div>
        )}

        {overview && (
          <div className="overview" onClick={() => setOverview(false)}>
            <div className="overview-inner" onClick={(e) => e.stopPropagation()}>
              <h2>Jump to a slide</h2>
              <div className="overview-cols">
                {sections.map((sec) => (
                  <div key={sec.name} className="overview-sec">
                    <h3>{sec.name}</h3>
                    {sec.items.map((s) => (
                      <button
                        key={s.id}
                        className={s.i === idx ? 'active' : ''}
                        onClick={() => {
                          go(s.i);
                          setOverview(false);
                        }}
                      >
                        <span>{s.i + 1}</span> {s.title}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
