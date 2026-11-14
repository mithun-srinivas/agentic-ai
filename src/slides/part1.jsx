import {
  Cpu, FileCode2, ChartScatter, Keyboard, MessageSquareText, Wrench, Workflow, Building2, Monitor, MemoryStick,
  Cat, MessageSquareQuote, Mic, Languages, PlaySquare, ScanFace, Navigation, MailX, CreditCard, Hand,
  CalendarClock, CircleHelp, History, ArrowRight, Check, X,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { R, Code, Title, Glyph, Source } from '../ui.jsx';
import { AutocompleteDemo, NextTokenDemo } from '../demos.jsx';
import { EniacFigure, DeskCalculatorFigure, AgentLoop, TimeBars } from '../illustrations.jsx';

const S0 = '00 Introduction';
const S1 = '01 Computers';
const S2 = '02 Programming';
const S3 = '03 Machine learning';
const S4 = '04 Language models';

export const JOURNEY = [
  [Cpu, 'Computers', 'Follow instructions very fast'],
  [FileCode2, 'Programming', 'People write the instructions'],
  [ChartScatter, 'Machine learning', 'Rules learned from examples'],
  [Keyboard, 'Autocomplete', 'Predict the next word'],
  [MessageSquareText, 'Language models', 'Next-word prediction at scale'],
  [Wrench, 'Tools', 'Models that can take actions'],
  [Workflow, 'Agents', 'Work towards a goal on their own'],
  [Building2, 'In industry', 'Where agents are used today'],
];

export function Journey({ style }) {
  return (
    <div className="journey" style={style}>
      {JOURNEY.map(([Icon, l, d], i) => (
        <div key={l} className={`journey-stop ${i === 6 ? 'goal' : ''}`}>
          <div className="node"><Icon size={30} strokeWidth={1.5} /></div>
          <div className="num">{String(i + 1).padStart(2, '0')}</div>
          <div className="lbl">{l}</div>
          <div className="desc">{d}</div>
        </div>
      ))}
    </div>
  );
}

export default [
  /* ------------------------------------------------------------ */
  {
    id: 'title',
    section: S0,
    title: 'Title',
    hideChrome: true,
    hideFooter: true,
    minutes: 0.5,
    notes:
      'Welcome everyone. Introduce yourself in one line. No prior knowledge is needed. By the end, everyone should be able to explain what an AI agent is, how it works, and where companies use them today.',
    Component: () => (
      <div className="row fill" style={{ alignItems: 'center', gap: 60 }}>
        <div className="fill">
          <h1 className="h1">Agentic AI</h1>
          <p className="lead mt24" style={{ fontSize: 36, color: 'var(--ink)' }}>From concepts to real-world applications</p>
          <p className="sub mt24" style={{ maxWidth: 760 }}>
            How we got from room-sized calculating machines to software that can plan a task and carry it out.
          </p>
          <div className="mt48" style={{ borderTop: '1px solid var(--rule)', paddingTop: 24, width: 520 }}>
            <div style={{ fontSize: 26, fontWeight: 600 }}>Mithun S</div>
            <div className="muted" style={{ fontSize: 20, marginTop: 4 }}>SDE2, Cisco</div>
          </div>
          <div className="row mt48" style={{ gap: 40 }}>
            {['Fundamentals', 'How agents work', 'Live demos', 'Industry examples'].map((t, i) => (
              <div key={t}>
                <div className="mono faint" style={{ fontSize: 14 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 19, fontWeight: 500, marginTop: 4 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
        <AgentLoop size={520} all showText={false} />
      </div>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'about',
    section: S0,
    title: 'About me',
    minutes: 1,
    notes:
      'Introduce yourself briefly: SDE2 at Cisco working on AI and voice engineering, M.Tech in AI from IISc, and you write about how tech systems and careers work. Invite students to scan the QR code and connect on LinkedIn; leave it up for a few seconds so people can scan.',
    Component: () => (
      <>
        <Title>About me</Title>
        <div className="row fill" style={{ gap: 56, alignItems: 'center', minHeight: 0 }}>
          <div className="fill" style={{ minWidth: 0 }}>
            <img
              src="/linkedin-profile.png"
              alt="LinkedIn profile of Mithun S: SDE2 at Cisco, MTech (AI) at IISc"
              style={{ width: '100%', maxWidth: 940, display: 'block', borderRadius: 6, border: '1px solid var(--rule)', boxShadow: '0 12px 40px rgba(20, 20, 30, 0.08)' }}
            />
          </div>
          <div className="col" style={{ width: 300, flex: 'none', alignItems: 'center', gap: 16 }}>
            <div className="card" style={{ padding: 20, lineHeight: 0 }}>
              <QRCodeSVG value="https://www.linkedin.com/in/yesmithun/" size={240} fgColor="#17171a" bgColor="#ffffff" level="M" marginSize={0} />
            </div>
            <div className="label">Scan to connect</div>
            <div className="mono" style={{ fontSize: 17, color: 'var(--ink-2)' }}>linkedin.com/in/yesmithun</div>
          </div>
        </div>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'poll',
    section: S0,
    title: 'Two questions',
    steps: 2,
    minutes: 1,
    notes:
      'Ask for a show of hands for each question. Most people will raise hands for the first. Far fewer for the second. That gap, between answering and doing, is what this session is about.',
    Component: ({ step }) => (
      <>
        <Title>Two questions to start</Title>
        <div className="rule-list" style={{ borderTop: '1px solid var(--rule)' }}>
          <div className="row" style={{ gap: 40, alignItems: 'baseline', padding: '30px 0', borderBottom: '1px solid var(--rule)' }}>
            <span className="mono faint" style={{ fontSize: 22 }}>01</span>
            <span style={{ fontSize: 36, fontWeight: 500 }}>Who has used ChatGPT, Gemini or Claude this week?</span>
          </div>
          <R show={step >= 1}>
            <div className="row" style={{ gap: 40, alignItems: 'baseline', padding: '30px 0', borderBottom: '1px solid var(--rule)' }}>
              <span className="mono faint" style={{ fontSize: 22 }}>02</span>
              <span style={{ fontSize: 36, fontWeight: 500 }}>Who has had an AI complete a task for them, such as booking, buying or sending something?</span>
            </div>
          </R>
        </div>
        <R show={step >= 2} className="mt48">
          <p className="lead" style={{ fontSize: 32, maxWidth: 1200 }}>
            Today’s question: how did we get from machines that <span className="muted">calculate</span> to software that can{' '}
            <span className="mark">plan and act</span>?
          </p>
        </R>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'roadmap',
    section: S0,
    title: 'Outline',
    minutes: 0.5,
    notes:
      'This is the outline. Each step fixes a problem the previous one could not. Agentic AI is the latest step in an 80-year story, not a sudden invention.',
    Component: () => (
      <>
        <Title sub="Each step solves a problem the previous step could not.">Outline</Title>
        <div className="col fill vcenter" style={{ paddingBottom: 40 }}><Journey /></div>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'human-computers',
    section: S1,
    title: 'Why computers were built',
    steps: 1,
    minutes: 1.5,
    notes:
      'Before machines, "computer" was a job title: people, very often women mathematicians, who did calculations by hand. During the Second World War the US Army needed artillery firing tables, which meant thousands of trajectory calculations. One trajectory took a person about 20 hours with a desk calculator. ENIAC, completed in 1945 and shown publicly in 1946, did it in about 30 seconds. That is why computers were built: long, repetitive, exact work, done fast.',
    Component: ({ step }) => (
      <>
        <Title sub="In the 1940s, “computer” was a job title. People did long calculations by hand.">
          Why computers were built
        </Title>
        <div className="grid2" style={{ gap: 48, gridTemplateColumns: '1fr 1.15fr' }}>
          <div className="col" style={{ gap: 28 }}>
            <div className="label">Time to calculate one artillery trajectory</div>
            <TimeBars show={step >= 1} />
          </div>
          <div className="col" style={{ gap: 20 }}>
            <div className="row" style={{ alignItems: 'flex-end', gap: 24 }}>
              <div>
                <DeskCalculatorFigure width={225} />
                <div className="label mt8">Desk calculator</div>
              </div>
              <R show={step >= 1}>
                <EniacFigure width={445} />
                <div className="label mt8">ENIAC</div>
              </R>
            </div>
            <R show={step >= 1} className="grid3" style={{ gap: 16 }}>
              <div><div className="stat" style={{ fontSize: 40 }}>5,000</div><div className="stat-label">additions per second</div></div>
              <div><div className="stat" style={{ fontSize: 40 }}>~18,000</div><div className="stat-label">vacuum tubes</div></div>
              <div><div className="stat" style={{ fontSize: 40 }}>~27 t</div><div className="stat-label">total weight</div></div>
            </R>
          </div>
        </div>
        <div className="spacer" />
        <Source>Penn Engineering and US Army histories of ENIAC. Figures are approximate.</Source>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'what-is-computer',
    section: S1,
    title: 'What a computer does',
    steps: 2,
    minutes: 1,
    notes:
      'Every computer, from ENIAC to your phone, does the same three things: take input, process it, produce output, using memory. The key point: a computer is extremely fast but completely literal. It does exactly what it is told and nothing else. Keep this in mind, because it is the limitation AI eventually addresses.',
    Component: ({ step }) => (
      <>
        <Title>What a computer does</Title>
        <div className="col" style={{ alignItems: 'center', gap: 0 }}>
          <div className="flow">
            <div className="box"><Glyph icon={Keyboard} /> <div>Input<small>keys, sensors, files</small></div></div>
            <ArrowRight className="faint" size={28} />
            <div className="box em"><Glyph icon={Cpu} tone="blue" /> <div>Process<small>follow instructions</small></div></div>
            <ArrowRight className="faint" size={28} />
            <div className="box"><Glyph icon={Monitor} /> <div>Output<small>screen, file, action</small></div></div>
          </div>
          <svg width="2" height="34"><line x1="1" y1="0" x2="1" y2="34" stroke="var(--faint)" strokeDasharray="3 4" /></svg>
          <div className="flow">
            <div className="box"><Glyph icon={MemoryStick} /> <div>Memory<small>stores data and instructions</small></div></div>
          </div>
        </div>
        <div className="grid2 mt48">
          <R show={step >= 1} className="card">
            <div className="label green">Strength</div>
            <p className="mt8">Billions of operations per second, with no fatigue. A phone today is millions of times faster than ENIAC.</p>
          </R>
          <R show={step >= 2} className="card">
            <div className="label red">Limitation</div>
            <p className="mt8">It does exactly what it is told and nothing more. Someone has to write every instruction.</p>
          </R>
        </div>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'programming',
    section: S2,
    title: 'A program is a list of instructions',
    steps: 1,
    minutes: 1,
    notes:
      'How do we tell a computer what to do? We write a program. Think of a recipe for a cook who is very fast but has no common sense. On the left is how you would explain making chai to a friend. On the right is the same thing as code. The "if" line is a decision based on a rule that we wrote.',
    Component: ({ step }) => (
      <>
        <Title sub="Like a recipe, but for a cook who follows every line exactly and has no common sense.">
          A program is a list of instructions
        </Title>
        <div className="grid2" style={{ gap: 40, alignItems: 'stretch' }}>
          <div className="card">
            <div className="label">Making chai, explained to a person</div>
            <ol style={{ fontSize: 24, lineHeight: 1.8, paddingLeft: 30, marginTop: 16, color: 'var(--ink-2)' }}>
              <li>Boil water and milk</li>
              <li>Add tea leaves and ginger</li>
              <li>Wait about three minutes</li>
              <li>Add sugar if they like it sweet</li>
              <li>Strain into a cup</li>
            </ol>
          </div>
          <R show={step >= 1} className="col" style={{ gap: 10 }}>
            <div className="label">The same steps as a program</div>
            <Code
              fontSize={23}
              code={`
def make_chai(likes_sweet):
    boil(water, milk)
    add(tea_leaves, ginger)
    wait(minutes=3)
    if likes_sweet:          # a rule we wrote
        add(sugar)
    strain_into(cup)
    return cup`}
            />
          </R>
        </div>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'spam-rules',
    section: S2,
    title: 'A spam filter written as rules',
    steps: 3,
    minutes: 1.5,
    notes:
      'A real problem: detecting spam. We write some rules. [→] A spammer writes "FR33 M0NEY" and it gets through. [→] Your professor writes "click here for the notes" and it gets blocked. Ask the audience how many rules we would need. Thousands, and they would still fail. Hand-written rules break easily because real data is messy.',
    Component: ({ step }) => (
      <>
        <Title sub="The traditional approach: write the rules by hand.">A spam filter written as rules</Title>
        <div className="grid2" style={{ gap: 40, alignItems: 'start', gridTemplateColumns: '1fr 1.05fr' }}>
          <Code
            fontSize={22}
            code={`
def is_spam(email):
    text = email.lower()
    if "free money" in text:
        return True
    if "you won" in text:
        return True
    if "click here" in text:
        return True
    return False`}
          />
          <div className="col" style={{ gap: 18 }}>
            <div className="inbox">
              <div className="mail">
                <span className="from">promo@win-big.biz</span>
                <span className="subj">You won a free phone</span>
                <span className="res"><span className="tag green"><Check size={13} /> Blocked</span><small>correct</small></span>
              </div>
              <R show={step >= 1} className="mail">
                <span className="from">deals@x9-offers.co</span>
                <span className="subj">FR33 M0NEY, claim n0w</span>
                <span className="res"><span className="tag red"><X size={13} /> Allowed</span><small>should be blocked</small></span>
              </R>
              <R show={step >= 2} className="mail">
                <span className="from">prof.sharma@college.edu</span>
                <span className="subj">Click here for tomorrow’s lab notes</span>
                <span className="res"><span className="tag red"><X size={13} /> Blocked</span><small>should be allowed</small></span>
              </R>
            </div>
            <R show={step >= 3} className="card warm">
              <h3>Rules break easily</h3>
              <p>Every new trick needs another rule, and each rule can block real mail. The list never ends.</p>
            </R>
          </div>
        </div>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'no-recipe',
    section: S2,
    title: 'Tasks that cannot be written as rules',
    steps: 1,
    minutes: 0.5,
    notes:
      'Try to write rules that recognise a cat. Pointed ears? Foxes have those. Whiskers? So do dogs. A three-year-old does it instantly, but nobody can write down how. The philosopher Michael Polanyi described this in 1966: we can know more than we can tell. This limit is what led to machine learning.',
    Component: ({ step }) => (
      <>
        <Title sub="A three-year-old can do these. Nobody can write them down as step-by-step rules.">
          Tasks that cannot be written as rules
        </Title>
        <div className="grid4">
          {[
            [Cat, 'Recognise a cat', 'Pointed ears? Foxes have them. Whiskers? So do dogs.'],
            [MessageSquareQuote, 'Detect sarcasm', '“Great, another exam on Monday.”'],
            [Mic, 'Understand speech', 'Every accent, speed and background noise.'],
            [Languages, 'Translate a joke', 'Hindi to English, and keep it funny.'],
          ].map(([Icon, t, d]) => (
            <div className="card" key={t}>
              <Glyph icon={Icon} />
              <h3 className="mt16">{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <R show={step >= 1} className="mt48">
          <p className="quote">“We can know more than we can tell.”</p>
          <p className="small muted mt8">Michael Polanyi, <i>The Tacit Dimension</i>, 1966</p>
          <p className="lead mt24">So what if the computer could work out the rules itself?</p>
        </R>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'ml-flip',
    section: S3,
    title: 'Machine learning',
    steps: 2,
    minutes: 1,
    notes:
      'This is the main shift. In traditional programming we provide rules and data and get answers. In machine learning we provide data and the correct answers, and the computer works out the rules. For spam: give it a million emails labelled spam or not spam, and it finds the patterns, including ones we would never think of. That is how modern email spam filters work.',
    Component: ({ step }) => (
      <>
        <Title sub="Instead of writing the rules, show examples and let the computer find the rules.">
          Machine learning reverses the process
        </Title>
        <div className="col" style={{ gap: 30 }}>
          <div className="row" style={{ alignItems: 'center', gap: 36 }}>
            <div className="label" style={{ width: 240 }}>Traditional programming</div>
            <div className="flow">
              <div className="box">Rules<small>written by people</small></div>
              <span className="op">+</span>
              <div className="box">Data</div>
              <ArrowRight className="faint" size={28} />
              <div className="box">Answers</div>
            </div>
          </div>
          <R show={step >= 1} className="row" style={{ alignItems: 'center', gap: 36 }}>
            <div className="label blue" style={{ width: 240 }}>Machine learning</div>
            <div className="flow">
              <div className="box">Data</div>
              <span className="op">+</span>
              <div className="box">Answers<small>labelled examples</small></div>
              <ArrowRight className="faint" size={28} />
              <div className="box em">Rules<small>learned, called a model</small></div>
            </div>
          </R>
        </div>
        <R show={step >= 2} className="card tinted mt48">
          <p style={{ fontSize: 23 }}>
            <b>Example.</b> Give it one million emails, each labelled “spam” or “not spam”. It finds the patterns itself,
            including ones people would not think of.
          </p>
        </R>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'ml-everywhere',
    section: S3,
    title: 'Machine learning you already use',
    minutes: 0.5,
    notes:
      'You already use machine learning many times a day. Ask: which of these did you use today? The last one, the keyboard, is the one we care about. It leads directly to ChatGPT.',
    Component: () => (
      <>
        <Title sub="Most people use machine learning many times a day without noticing.">Machine learning you already use</Title>
        <div className="grid3">
          {[
            [PlaySquare, 'Recommendations', 'YouTube, Netflix, Spotify, Instagram'],
            [ScanFace, 'Face unlock', 'Learned what your face looks like'],
            [Navigation, 'Travel time in maps', 'Predicted from millions of past trips'],
            [MailX, 'Spam filters', 'The problem our rules could not solve'],
            [CreditCard, 'Fraud alerts', '“Did you make this payment?”'],
          ].map(([Icon, t, d]) => (
            <div className="card row" key={t} style={{ gap: 18, alignItems: 'flex-start' }}>
              <Glyph icon={Icon} />
              <div><h3>{t}</h3><p>{d}</p></div>
            </div>
          ))}
          <div className="card em row" style={{ gap: 18, alignItems: 'flex-start' }}>
            <Glyph icon={Keyboard} tone="blue" />
            <div><h3>Keyboard suggestions</h3><p>We will look at this one next.</p></div>
          </div>
        </div>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'autocomplete',
    section: S3,
    title: 'Autocomplete',
    steps: 2,
    minutes: 0.5,
    notes:
      'Your phone keyboard contains a small language model. It has seen what people usually type, so after "I am going to the" it suggests "gym", "market" or "office". It does not understand anything; it counts patterns. Remember the idea: predict the next word. It is the starting point for ChatGPT.',
    Component: ({ step }) => (
      <>
        <Title sub="A phone keyboard contains a small language model. Its only job is to predict the next word.">
          Autocomplete predicts the next word
        </Title>
        <div className="row" style={{ gap: 50, alignItems: 'center' }}>
          <div className="phone" style={{ width: 520 }}>
            <div className="phone-screen" style={{ minHeight: 280 }}>
              <div className="phone-msg" style={{ fontSize: 34 }}>
                I am going to the<span className="cursor-blink" />
              </div>
              <R show={step >= 1} className="suggest">
                <button style={{ color: 'var(--blue)', fontWeight: 600 }}>gym</button>
                <button>market</button>
                <button>office</button>
              </R>
            </div>
          </div>
          <R show={step >= 2} className="col fill" style={{ gap: 18 }}>
            <div className="card">
              <div className="label">How</div>
              <p className="mt8">It has seen millions of messages and counts which word usually comes next.</p>
            </div>
            <div className="card em">
              <div className="label blue">Remember this</div>
              <p className="mt8"><b>Predict the next word.</b> The same idea, scaled up, is how ChatGPT works.</p>
            </div>
          </R>
        </div>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'demo-autocomplete',
    section: S3,
    title: 'Demo: a small autocomplete model',
    minutes: 2,
    notes:
      'LIVE DEMO. Click the suggestions to build a sentence. Then press "Always pick the top word": it gets stuck in a loop ("the canteen for the canteen..."), because it only looks at one previous word and has read only 25 sentences. Try "Pick at random": more variety, still nonsense. Ask: what would make it better? More text, and looking further back than one word. That leads to the next slide. Tip: click the text box to type; press Esc to return to slide navigation.',
    Component: () => (
      <>
        <Title>Demo: a small autocomplete model</Title>
        <AutocompleteDemo />
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'scale',
    section: S4,
    title: 'The same idea, much larger',
    steps: 1,
    minutes: 1,
    notes:
      'Our demo read 25 sentences and looked back one word. A large language model reads a large part of the public web, books and code, looks back over thousands of words, and uses a neural network with billions of adjustable numbers, called parameters. The important point: to predict the next word well, the model has to pick up grammar, facts and some reasoning. In the detective example, you can only guess the name if you followed the story.',
    Component: ({ step }) => (
      <>
        <Title sub="A large language model (LLM) uses the same idea as our demo, at a very different scale.">
          The same idea, much larger
        </Title>
        <table className="ctable">
          <thead>
            <tr><th /><th>Our demo</th><th className="em">Large language model</th></tr>
          </thead>
          <tbody>
            <tr><td>Text it learned from</td><td>25 sentences</td><td className="em">Trillions of words: web pages, books, code</td></tr>
            <tr><td>Context it looks at</td><td>1 previous word</td><td className="em">Thousands of previous words or more</td></tr>
            <tr><td>What it is</td><td>A table of word counts</td><td className="em">A neural network with billions of parameters</td></tr>
          </tbody>
        </table>
        <R show={step >= 1} className="card tinted mt32">
          <div className="label">Why scale matters</div>
          <p className="mt8" style={{ fontSize: 28, color: 'var(--ink)' }}>
            “After checking every alibi, the detective said the murderer was ___”
          </p>
          <p className="note">To predict this word you have to follow the story. Learning to predict well forces the model to learn facts and reasoning.</p>
        </R>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'next-token',
    section: S4,
    title: 'How an LLM writes',
    steps: 5,
    minutes: 1,
    notes:
      'Watch the model write, one word (technically a "token") at a time. At each step it estimates a probability for every possible next word, picks one, adds it, and repeats. [Press → five times.] This is how ChatGPT, Gemini and Claude produce every answer. "Temperature" controls how adventurous the choice is: low means it almost always takes the top word.',
    Component: ({ step }) => (
      <>
        <Title sub="One word (a “token”) at a time: estimate, choose, add, repeat.">How an LLM writes</Title>
        <NextTokenDemo step={step} />
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'timeline',
    section: S4,
    title: 'Timeline, 2017 to today',
    minutes: 0.5,
    notes:
      '2017: Google researchers publish the Transformer, the design behind every modern LLM (the T in GPT). 2020: GPT-3 shows that larger models do much more. November 2022: ChatGPT, estimated at 100 million users within about two months. 2023: GPT-4, Claude and Gemini. 2024: models start using tools and operating computers. 2025 onwards: agents in everyday products.',
    Component: () => (
      <>
        <Title sub="From a research paper to everyday software in under ten years.">Timeline, 2017 to today</Title>
        <div className="timeline mt24">
          <div className="tl-item"><div className="yr">2017</div><div className="ev">Transformer</div><div className="ds">The model design behind all modern LLMs</div></div>
          <div className="tl-item"><div className="yr">2020</div><div className="ev">GPT-3</div><div className="ds">175 billion parameters. Scale brings new abilities.</div></div>
          <div className="tl-item"><div className="yr">2022</div><div className="ev">ChatGPT</div><div className="ds">Est. 100 million users in about two months</div></div>
          <div className="tl-item"><div className="yr">2023</div><div className="ev">GPT-4, Claude, Gemini</div><div className="ds">Chat assistants become widespread</div></div>
          <div className="tl-item"><div className="yr">2024</div><div className="ev">Tools and computer use</div><div className="ds">Models call software and operate browsers</div></div>
          <div className="tl-item now"><div className="yr">2025 →</div><div className="ev">Agents</div><div className="ds">Coding, research and business agents</div></div>
        </div>
        <div className="spacer" />
        <Source>Vaswani et al., “Attention Is All You Need” (2017); Brown et al., GPT-3 paper (2020); UBS estimate reported by Reuters (Feb 2023).</Source>
      </>
    ),
  },
  /* ------------------------------------------------------------ */
  {
    id: 'chatbot-limits',
    section: S4,
    title: 'What a chatbot cannot do',
    steps: 2,
    minutes: 1,
    notes:
      'Chatbots are very good at answering. But ask one to book a train and it gives you instructions. On its own it can only produce text. It cannot take actions, its knowledge stops at its training date, it cannot check its own work, and it forgets everything when the chat ends. Agents address these gaps.',
    Component: ({ step }) => (
      <>
        <Title>What a chatbot cannot do on its own</Title>
        <div className="grid2" style={{ gap: 44, alignItems: 'start' }}>
          <div className="card chat">
            <div className="bubble user">Book me the cheapest train to Bangalore this Friday.</div>
            <R show={step >= 1} className="bubble bot">
              I can’t book tickets, but here is how you can:
              <br />1. Open the IRCTC website or app
              <br />2. Enter your source and destination
              <br />3. Select Friday and compare fares
            </R>
          </div>
          <R show={step >= 2} className="col" style={{ gap: 0, borderTop: '1px solid var(--rule)' }}>
            {[
              [Hand, 'Cannot take actions', 'It can only produce text.'],
              [CalendarClock, 'Knowledge has a cut-off', 'It knows nothing after its training date.'],
              [CircleHelp, 'Cannot check its work', 'It can be wrong and sound certain.'],
              [History, 'No memory between chats', 'Each conversation starts from nothing.'],
            ].map(([Icon, t, d]) => (
              <div key={t} className="row" style={{ gap: 18, alignItems: 'center', padding: '18px 0', borderBottom: '1px solid var(--rule)' }}>
                <Glyph icon={Icon} tone="red" size={24} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 600 }}>{t}</div>
                  <div className="body muted" style={{ fontSize: 18 }}>{d}</div>
                </div>
              </div>
            ))}
          </R>
        </div>
      </>
    ),
  },
];
