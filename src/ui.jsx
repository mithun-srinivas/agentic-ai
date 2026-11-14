// Small building blocks shared by slides

export function R({ show = true, as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`reveal ${show ? '' : 'off'} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

const KW = new Set([
  'def', 'return', 'if', 'for', 'in', 'else', 'elif', 'import', 'from', 'while',
  'True', 'False', 'None', 'and', 'or', 'not', 'range', 'class', 'with', 'as',
]);

function highlightLine(line) {
  const out = [];
  let rest = line;
  let commentIdx = -1;
  // find a # that is not inside a string
  let inStr = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inStr) {
      if (c === inStr) inStr = null;
    } else if (c === '"' || c === "'") inStr = c;
    else if (c === '#') {
      commentIdx = i;
      break;
    }
  }
  let comment = '';
  if (commentIdx >= 0) {
    rest = line.slice(0, commentIdx);
    comment = line.slice(commentIdx);
  }
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(\d+)\b|\b([A-Za-z_]\w*)\b(\s*\()?/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(rest))) {
    if (m.index > last) out.push(rest.slice(last, m.index));
    if (m[1]) out.push(<span key={k++} className="str">{m[1]}</span>);
    else if (m[2]) out.push(<span key={k++} className="num">{m[2]}</span>);
    else if (KW.has(m[3])) {
      out.push(<span key={k++} className="kw">{m[3]}</span>);
      if (m[4]) out.push(m[4]);
    } else if (m[4]) {
      out.push(<span key={k++} className="fn">{m[3]}</span>);
      out.push(m[4]);
    } else out.push(m[3]);
    last = re.lastIndex;
  }
  if (last < rest.length) out.push(rest.slice(last));
  if (comment) out.push(<span key={k++} className="com">{comment}</span>);
  return out;
}

export function Code({ code, highlight = [], style, fontSize }) {
  const lines = code.replace(/^\n/, '').replace(/\s+$/, '').split('\n');
  return (
    <pre className="code" style={{ ...style, ...(fontSize ? { fontSize } : {}) }}>
      {lines.map((l, i) => (
        <span key={i} className={`ln ${highlight.includes(i + 1) ? 'line-hl' : ''}`}>
          {l ? highlightLine(l) : ' '}
        </span>
      ))}
    </pre>
  );
}

export function Title({ children, sub }) {
  return (
    <div className="title-block">
      <h2 className="h2">{children}</h2>
      {sub && <p className="sub">{sub}</p>}
    </div>
  );
}

export function Glyph({ icon: Icon, tone = '', size = 28, lg = false }) {
  return (
    <span className={`glyph ${tone} ${lg ? 'lg' : ''}`}>
      <Icon size={lg ? size + 8 : size} strokeWidth={1.6} />
    </span>
  );
}

export function Source({ children, style }) {
  return (
    <p className="source" style={style}>
      {children}
    </p>
  );
}
