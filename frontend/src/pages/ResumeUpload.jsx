import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, CheckCircle2, XCircle } from 'lucide-react'

const mockResult = {
  score: 78,
  strong: ['Python', 'REST APIs', 'FastAPI', 'SQL', 'Git'],
  weak: ['Docker', 'System Design', 'AWS'],
  missing: ['Kubernetes', 'CI/CD', 'Redis'],
  irrelevant: ['Photoshop', 'MS Word'],
  suggestion: 'Your backend skills are solid. Focus on adding cloud deployment experience (AWS/GCP) and containerization (Docker) to significantly improve your match score for this role.',
}

function ScoreRing({ score }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 75 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--danger)'
  return (
    <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--bg-hover)" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease', strokeLinecap: 'round' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color }}>{score}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: -2 }}>/100</span>
      </div>
    </div>
  )
}

function SkillGroup({ title, items, badgeClass }) {
  if (!items.length) return null
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
        {title}
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {items.map(s => (
          <span key={s} className={`badge ${badgeClass}`} style={{ fontSize: 12 }}>{s}</span>
        ))}
      </div>
    </div>
  )
}

export default function ResumeUpload() {
  const [step, setStep] = useState('upload') // upload | result
  const [fresher, setFresher] = useState(true)
  const [years, setYears] = useState(1)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [jd, setJd] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f && f.type === 'application/pdf') setFile(f)
  }

  const handleAnalyze = () => {
    if (!file || !jd.trim()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('result') }, 1800)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>

      {/* NAVBAR */}
      <nav style={{
        padding: '1rem 2.5rem', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--navbar-bg)', backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff' }}>
          Resume<span style={{ color: 'var(--accent)' }}>AI</span>
        </Link>
        <Link to="/dashboard"><button className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>Dashboard</button></Link>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 2rem' }} className="page-enter">

        {step === 'upload' && (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <div className="section-label">Resume Analyzer</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.4px' }}>Upload your resume + job description</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: '0.4rem' }}>
                We'll score your resume against the JD and tell you exactly what to fix.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>

              {/* RESUME UPLOAD */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>Resume (PDF)</div>
                <div
                  onDragOver={e => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('resumeInput').click()}
                  style={{
                    border: `2px dashed ${dragging ? 'var(--accent)' : file ? 'var(--success)' : 'var(--border-hover)'}`,
                    borderRadius: 'var(--radius-lg)', padding: '2.5rem 1.5rem',
                    textAlign: 'center', cursor: 'pointer',
                    background: dragging ? 'var(--accent-soft)' : 'var(--bg-card)',
                    transition: 'all 0.2s', minHeight: 180,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                  }}>
                  <input id="resumeInput" type="file" accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={e => setFile(e.target.files[0])} />
                  {file ? (
                    <>
                      <div style={{ color: 'var(--success)' }}><CheckCircle2 size={28} /></div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>{file.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Click to replace</div>
                    </>
                  ) : (
                    <>
                      <div style={{ color: 'var(--text-secondary)' }}><FileText size={28} /></div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Drag & drop your PDF here</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>or click to browse</div>
                    </>
                  )}
                </div>
              </div>

              {/* JD INPUT */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>Job Description</div>
                <textarea
                  value={jd} onChange={e => setJd(e.target.value)}
                  placeholder="Paste the job description here..."
                  style={{
                    width: '100%', height: 180, padding: '1rem',
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)', color: 'var(--text-primary)',
                    fontSize: 13, resize: 'none', outline: 'none', lineHeight: 1.65,
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>

            {/* FRESHER TOGGLE */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem',
              display: 'flex', alignItems: 'center', gap: '1.5rem',
              marginBottom: '1.5rem', flexWrap: 'wrap',
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Is this a fresher role?</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[true, false].map(v => (
                  <button key={String(v)} onClick={() => setFresher(v)} style={{
                    padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    background: fresher === v ? 'var(--accent)' : 'var(--bg-hover)',
                    color: fresher === v ? '#fff' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                  }}>{v ? 'Yes, fresher' : 'No, experienced'}</button>
                ))}
              </div>
              {!fresher && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Years required:</span>
                  <input type="number" min={1} max={10} value={years}
                    onChange={e => setYears(e.target.value)}
                    style={{
                      width: 60, padding: '6px 10px', borderRadius: 8,
                      background: 'var(--bg-surface)', border: '1px solid var(--border)',
                      color: 'var(--text-primary)', fontSize: 13, outline: 'none', textAlign: 'center',
                    }} />
                </div>
              )}
            </div>

            <button className="btn-primary"
              onClick={handleAnalyze}
              disabled={!file || !jd.trim() || loading}
              style={{
                padding: '13px 32px', fontSize: 15,
                opacity: (!file || !jd.trim()) ? 0.5 : 1,
                cursor: (!file || !jd.trim()) ? 'not-allowed' : 'pointer',
              }}>
              {loading ? 'Analyzing...' : 'Analyze my resume'}
            </button>
          </>
        )}

        {step === 'result' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="section-label">ATS Result</div>
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.4px' }}>Your resume score</h1>
              </div>
              <button className="btn-ghost" onClick={() => setStep('upload')} style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ArrowLeft size={14} />
                Analyze another
              </button>
            </div>

            {/* SCORE + SUMMARY */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '1.75rem',
              display: 'flex', gap: '2rem', alignItems: 'center',
              marginBottom: '1.25rem', flexWrap: 'wrap',
            }}>
              <ScoreRing score={mockResult.score} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {mockResult.score >= 75 ? 'Strong match' : mockResult.score >= 50 ? 'Moderate match' : 'Weak match'}
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {mockResult.suggestion}
                </p>
              </div>
            </div>

            {/* SKILL BREAKDOWN */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '1.75rem',
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
              marginBottom: '1.25rem',
            }}>
              <SkillGroup title="Strong in" items={mockResult.strong} badgeClass="badge-success" />
              <SkillGroup title="Weak or shallow" items={mockResult.weak} badgeClass="badge-warning" />
              <SkillGroup title="Missing keywords" items={mockResult.missing} badgeClass="badge-danger" />
              <SkillGroup title="Irrelevant to this JD" items={mockResult.irrelevant} badgeClass="badge-accent" />
            </div>

            {/* NEXT STEPS */}
            <div style={{
              background: 'var(--accent-soft)', border: '1px solid var(--accent-border)',
              borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Ready to practice for this role?
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Start a mock interview using this exact JD.
                </div>
              </div>
              <Link to="/interview">
                <button className="btn-primary" style={{ fontSize: 13, padding: '9px 20px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Start mock interview
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}