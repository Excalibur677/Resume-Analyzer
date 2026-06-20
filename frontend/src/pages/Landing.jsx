import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { FileText, BarChart3, Mic2, Sparkles, ShieldCheck, MessageSquare, Trophy, Repeat, Building2 } from 'lucide-react'

const tags = [
  { text: 'ATS score' },
  { text: 'Python' },
  { text: 'Mock interview' },
  { text: 'React' },
  { text: 'Skill gap analysis' },
  { text: 'FastAPI' },
  { text: 'DSA practice' },
  { text: 'SQL' },
  { text: 'Leaderboard' },
  { text: 'System design' },
  { text: 'Streak tracker' },
  { text: 'Machine learning' },
  { text: 'Admin reports' },
  { text: 'Node.js' },
]

const steps = [
  {
    num: '01',
    icon: <FileText size={18} />,
    title: 'Upload resume + job description',
    desc: 'Paste or upload the JD. Tell us if it\'s a fresher role or needs experience. We handle the rest.',
  },
  {
    num: '02',
    icon: <BarChart3 size={18} />,
    title: 'Get your ATS score and gaps',
    desc: 'See exactly what\'s strong, what\'s missing, and which keywords to add — a full feedback report, not just a number.',
  },
  {
    num: '03',
    icon: <Mic2 size={18} />,
    title: 'Practice JD-based mock interviews',
    desc: 'Questions generated from your actual JD. Easy, medium, or hard — with per-answer feedback and a live timer.',
  },
]

const features = [
  { icon: <Sparkles size={18} />, title: 'Smart JD parsing', desc: 'Understands role depth, not just keywords.' },
  { icon: <ShieldCheck size={18} />, title: 'ATS scoring', desc: 'Resume vs JD match with clear action points.' },
  { icon: <MessageSquare size={18} />, title: 'Mock interviews', desc: 'Text-based Q&A with timer and voice support.' },
  { icon: <Trophy size={18} />, title: 'Quiz battles', desc: 'DSA and Web Dev quizzes with ranked leaderboards.' },
  { icon: <Repeat size={18} />, title: 'Daily streaks', desc: 'Stay consistent and build momentum.' },
  { icon: <Building2 size={18} />, title: 'Company JD portal', desc: 'Admin uploads real JDs for student practice.' },
]

const stats = [
  { num: '3x', label: 'more interview calls with ATS-optimized resume' },
  { num: '11', label: 'complete modules in one portal' },
  { num: '100%', label: 'JD-specific, never generic questions' },
  { num: '0', label: 'fluff. just preparation that works' },
]

export default function Landing() {
  const trackRef = useRef(null)

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.2rem 2.5rem',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--navbar-bg)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
          Resume<span style={{ color: 'var(--accent)' }}>AI</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login"><button className="btn-ghost" style={{ padding: '8px 18px', fontSize: 13 }}>Log in</button></Link>
          <Link to="/register"><button className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>Get started</button></Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '6rem 2rem 3rem', textAlign: 'center', maxWidth: 820, margin: '0 auto' }} className="page-enter">
        <div className="badge badge-accent" style={{ marginBottom: '1.75rem', color: 'var(--text-primary)', background: 'rgba(155,122,87,0.08)', borderColor: 'rgba(155,122,87,0.18)' }}>
          AI-powered placement preparation
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 58px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          Your resume.<br />Your interview.<br />
          <span style={{ color: 'var(--accent)' }}>Your offer.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 520, margin: '0 auto 2.25rem', lineHeight: 1.75 }}>
          Upload your resume, match it against any job description, practice mock interviews,
          and track your progress — all in one platform built for students.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register">
            <button className="btn-primary" style={{ padding: '13px 28px', fontSize: 15 }}>
              Analyze my resume
            </button>
          </Link>
          <button className="btn-ghost" style={{ padding: '13px 28px', fontSize: 15 }}>
            See how it works
          </button>
        </div>
      </section>

      <section style={{ padding: '2rem 0 3rem', maxWidth: 920, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          {tags.map((tag, i) => (
            <div key={i} style={{
              padding: '0.85rem 1rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontSize: 13,
            }}>{tag.text}</div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '5rem 2rem', maxWidth: 1080, margin: '0 auto' }}>
        <div className="section-label">How it works</div>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-0.8px', marginBottom: '0.75rem' }}>
          From resume to offer in three steps
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14.5, marginBottom: '2.5rem' }}>
          No fluff, no generic advice. Every step is tailored to the job you're targeting.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {steps.map((s) => (
            <div key={s.num} className="step-card" style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              transition: 'border-color 0.25s, transform 0.2s',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: 'var(--accent)', marginBottom: '1rem', opacity: 0.75 }}>
                STEP {s.num}
              </div>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: 'var(--bg-surface)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', marginBottom: '1rem',
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{s.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '0 2rem 5rem', maxWidth: 1080, margin: '0 auto' }}>
        <div className="section-label">Features</div>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-0.8px', marginBottom: '0.75rem' }}>
          Everything to get placement-ready
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14.5, marginBottom: '2.5rem' }}>
          From resume intelligence to gamified quizzes — built for college students.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          {features.map((f) => (
            <div key={f.title} className="feature-cell" style={{
              background: 'var(--bg-base)', padding: '1.75rem 1.5rem',
              transition: 'background 0.2s',
            }}>
              <div style={{ fontSize: 22, marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {stats.map((s) => (
            <div key={s.num}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 800, letterSpacing: '-1px' }}>
                <span style={{ color: 'var(--accent)' }}>{s.num}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </div>

          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: 580, margin: '0 auto',
          background: 'var(--bg-card)',
          border: '1px solid rgba(91,127,255,0.2)',
          borderRadius: 'var(--radius-xl)',
          padding: '3.5rem 2.5rem',
        }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
            Ready to land that placement?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14.5, marginBottom: '2rem', lineHeight: 1.65 }}>
            Upload your resume and find out exactly where you stand — and what to fix — in under two minutes.
          </p>
          <Link to="/register">
            <button className="btn-primary" style={{ padding: '13px 28px', fontSize: 15 }}>
              Start for free
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '1.5rem 2.5rem',
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 13, color: 'var(--text-muted)',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)', fontSize: 15 }}>
          Resume<span style={{ color: 'var(--accent)' }}>AI</span>
        </div>
        <span>Built for college students. Backed by AI.</span>
      </footer>

    </div>
  )
}