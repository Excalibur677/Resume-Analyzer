import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ShieldCheck, AlertTriangle, ArrowRight, ArrowLeft, X } from 'lucide-react'

const difficulties = ['Easy', 'Medium', 'Hard']

const mockQuestions = {
  Easy: [
    { q: 'What is the difference between a list and a tuple in Python?', hint: 'Think about mutability.' },
    { q: 'Explain what an API is in simple terms.', hint: 'Think client-server communication.' },
    { q: 'What is the purpose of a foreign key in a database?', hint: 'Think relationships between tables.' },
  ],
  Medium: [
    { q: 'How does async/await work in Python? When would you use it?', hint: 'Think about I/O-bound tasks.' },
    { q: 'Explain the difference between SQL joins: INNER, LEFT, RIGHT.', hint: 'Think about which rows are included.' },
    { q: 'What is REST and what makes an API RESTful?', hint: 'Think statelessness and HTTP methods.' },
  ],
  Hard: [
    { q: 'Design a URL shortener system. What components would you include?', hint: 'Think scalability, hashing, redirects.' },
    { q: 'How would you optimize a slow database query on a table with 10M rows?', hint: 'Think indexing, query plan, caching.' },
    { q: 'Explain how you would implement rate limiting in a FastAPI backend.', hint: 'Think middleware, Redis, token bucket.' },
  ],
}

const TIMER_MAX = 120

function Timer({ seconds, max }) {
  const pct = seconds / max
  const color = pct > 0.5 ? 'var(--success)' : pct > 0.25 ? 'var(--warning)' : 'var(--danger)'
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <div style={{ width: 100, height: 5, background: 'var(--bg-hover)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 10, transition: 'width 1s linear, background 0.5s' }} />
      </div>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color }}>{mm}:{ss}</span>
    </div>
  )
}

export default function MockInterview() {
  const [step, setStep] = useState('setup') // setup | interview | result
  const [difficulty, setDifficulty] = useState('Medium')
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState('')
  const [timer, setTimer] = useState(TIMER_MAX)
  const [showHint, setShowHint] = useState(false)
  const timerRef = useRef(null)

  const questions = mockQuestions[difficulty]
  const isLast = qIndex === questions.length - 1

  useEffect(() => {
    if (step !== 'interview') return
    setTimer(TIMER_MAX)
    setShowHint(false)
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { handleNext(true); return TIMER_MAX }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [step, qIndex])

  const handleNext = (auto = false) => {
    clearInterval(timerRef.current)
    setAnswers(prev => ({ ...prev, [qIndex]: auto ? '(time expired)' : current }))
    setCurrent('')
    if (isLast) { setStep('result'); return }
    setQIndex(i => i + 1)
  }

  const mockFeedback = [
    { score: 8, label: 'Good', comment: 'Covered the key points well. Could mention real-world usage.' },
    { score: 6, label: 'Needs work', comment: 'Partially correct. Missing depth on async context managers.' },
    { score: 9, label: 'Excellent', comment: 'Very clear explanation with correct terminology.' },
  ]

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
        {step === 'interview' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Question {qIndex + 1} of {questions.length}
            </span>
            <Timer seconds={timer} max={TIMER_MAX} />
          </div>
        )}
        <Link to="/dashboard"><button className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>Dashboard</button></Link>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 2rem' }} className="page-enter">

        {/* SETUP */}
        {step === 'setup' && (
          <>
            <div style={{ marginBottom: '2.5rem' }}>
              <div className="section-label">Mock Interview</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.4px' }}>Practice for your role</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: '0.4rem' }}>
                Questions are generated from your uploaded JD. Answer each within 2 minutes.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '2rem',
              marginBottom: '1.25rem',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Select difficulty
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                {difficulties.map(d => (
                  <button key={d} onClick={() => setDifficulty(d)} style={{
                    flex: 1, padding: '1rem', borderRadius: 'var(--radius-md)',
                    border: `1px solid ${difficulty === d ? 'var(--accent)' : 'var(--border)'}`,
                    background: difficulty === d ? 'var(--accent-soft)' : 'var(--bg-surface)',
                    color: difficulty === d ? '#8AAAFF' : 'var(--text-muted)',
                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', borderRadius: 12, marginBottom: '0.35rem', background: d === 'Easy' ? 'rgba(45,212,160,0.12)' : d === 'Medium' ? 'rgba(245,166,35,0.12)' : 'rgba(255,98,113,0.12)' }}>
                      {d === 'Easy' && <ShieldCheck size={20} color="var(--success)" />}
                      {d === 'Medium' && <Activity size={20} color="var(--warning)" />}
                      {d === 'Hard' && <AlertTriangle size={20} color="var(--danger)" />}
                    </div>
                    {d}
                  </button>
                ))}
              </div>

              <div style={{
                background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.25rem', marginBottom: '1.5rem',
                border: '1px solid var(--border)',
              }}>
                {[
                  `${questions.length} questions — JD-based`,
                  '2 minutes per question with live timer',
                  'Per-answer AI feedback after submission',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.35rem 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--success)', fontSize: 11 }}>✓</span> {t}
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={() => setStep('interview')} style={{ padding: '12px 28px', fontSize: 15, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Start interview
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* INTERVIEW */}
        {step === 'interview' && (
          <>
            {/* PROGRESS BAR */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem' }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 10,
                  background: i < qIndex ? 'var(--accent)' : i === qIndex ? 'var(--accent)' : 'var(--bg-hover)',
                  opacity: i === qIndex ? 1 : i < qIndex ? 0.5 : 0.3,
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>

            {/* QUESTION CARD */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '2rem',
              marginBottom: '1.25rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', gap: '1rem' }}>
                <span className={`badge ${difficulty === 'Easy' ? 'badge-success' : difficulty === 'Medium' ? 'badge-warning' : 'badge-danger'}`}>
                  {difficulty}
                </span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {questions[qIndex].q}
              </h2>

              <textarea
                value={current}
                onChange={e => setCurrent(e.target.value)}
                placeholder="Type your answer here..."
                style={{
                  width: '100%', height: 160, padding: '1rem',
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
                  fontSize: 14, resize: 'none', outline: 'none', lineHeight: 1.7,
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button onClick={() => setShowHint(!showHint)} className="btn-ghost" style={{ fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {showHint ? <X size={14} /> : <Activity size={14} />}
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              <button className="btn-primary" onClick={() => handleNext(false)} style={{ padding: '11px 26px', fontSize: 14 }}>
                {isLast ? 'Submit interview' : 'Next question'}
              </button>
            </div>

            {showHint && (
              <div style={{
                marginTop: '1rem', padding: '0.9rem 1.25rem',
                background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)',
                borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--warning)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                  <AlertTriangle size={16} /> Hint
                </div>
                <div>{questions[qIndex].hint}</div>
              </div>
            )}
          </>
        )}

        {/* RESULT */}
        {step === 'result' && (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <div className="section-label">Interview Complete</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.4px' }}>Your performance</h1>
            </div>

            {/* OVERALL */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '1.5rem',
              marginBottom: '1.25rem', flexWrap: 'wrap',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800, color: 'var(--accent)' }}>
                  {Math.round(mockFeedback.reduce((a, f) => a + f.score, 0) / mockFeedback.length * 10)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>/ 100</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: '0.3rem' }}>Good overall performance</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  You answered {questions.length} questions on {difficulty} difficulty. Review feedback below.
                </div>
              </div>
            </div>

            {/* PER ANSWER FEEDBACK */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {questions.map((q, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', padding: '1.25rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', gap: '1rem' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', flex: 1, lineHeight: 1.5 }}>{q.q}</div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, flexShrink: 0,
                      color: mockFeedback[i].score >= 8 ? 'var(--success)' : mockFeedback[i].score >= 6 ? 'var(--warning)' : 'var(--danger)',
                    }}>{mockFeedback[i].score}/10</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: '0.5rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                    Your answer: {answers[i] || '(skipped)'}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {mockFeedback[i].comment}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => { setStep('setup'); setQIndex(0); setAnswers({}) }} style={{ padding: '11px 24px', fontSize: 14, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Try again
                <ArrowRight size={16} />
              </button>
              <Link to="/quiz"><button className="btn-ghost" style={{ padding: '11px 24px', fontSize: 14, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Take a quiz
                <ArrowRight size={16} />
              </button></Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}