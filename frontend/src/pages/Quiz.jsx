import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Globe2, Brain, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

const categories = ['DSA', 'Web Dev']

const questions = {
  DSA: [
    { q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1 },
    { q: 'Which data structure uses LIFO order?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], answer: 1 },
    { q: 'What traversal visits root first?', options: ['Inorder', 'Postorder', 'Preorder', 'BFS'], answer: 2 },
    { q: 'Best case time complexity of QuickSort?', options: ['O(n²)', 'O(n)', 'O(n log n)', 'O(log n)'], answer: 2 },
  ],
  'Web Dev': [
    { q: 'Which HTTP method is used to update a resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], answer: 2 },
    { q: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], answer: 1 },
    { q: 'Which hook manages state in React?', options: ['useEffect', 'useRef', 'useState', 'useContext'], answer: 2 },
    { q: 'What status code means "Not Found"?', options: ['200', '301', '403', '404'], answer: 3 },
  ],
}

const QUESTION_TIME = 20

export default function Quiz() {
  const [step, setStep] = useState('setup')
  const [category, setCategory] = useState('DSA')
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [timer, setTimer] = useState(QUESTION_TIME)
  const [results, setResults] = useState([])
  const [score, setScore] = useState(0)
  const timerRef = useRef(null)

  const qs = questions[category]
  const current = qs[qIndex]
  const isLast = qIndex === qs.length - 1

  useEffect(() => {
    if (step !== 'quiz') return
    setTimer(QUESTION_TIME)
    setSelected(null)
    setLocked(false)
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { handleAnswer(null, true); return QUESTION_TIME }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [step, qIndex])

  const handleAnswer = (idx, auto = false) => {
    clearInterval(timerRef.current)
    if (locked) return
    setSelected(idx)
    setLocked(true)
    const correct = idx === current.answer
    if (correct) setScore(s => s + (timer * 5))
    setResults(r => [...r, { q: current.q, selected: idx, correct: current.answer, isCorrect: correct, time: QUESTION_TIME - timer }])
    setTimeout(() => {
      if (isLast) { setStep('result'); return }
      setQIndex(i => i + 1)
    }, 900)
  }

  const reset = () => { setStep('setup'); setQIndex(0); setResults([]); setScore(0) }

  const optionStyle = (i) => {
    let bg = 'var(--bg-surface)', border = 'var(--border)', color = 'var(--text-secondary)'
    if (locked) {
      if (i === current.answer) { bg = 'rgba(45,212,160,0.1)'; border = 'rgba(45,212,160,0.4)'; color = 'var(--success)' }
      else if (i === selected && i !== current.answer) { bg = 'rgba(255,95,95,0.1)'; border = 'rgba(255,95,95,0.3)'; color = 'var(--danger)' }
    } else if (selected === i) { bg = 'var(--accent-soft)'; border = 'var(--accent)'; color = '#8AAAFF' }
    return { bg, border, color }
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
        {step === 'quiz' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Q {qIndex + 1}/{qs.length}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 80, height: 5, background: 'var(--bg-hover)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{
                  width: `${(timer / QUESTION_TIME) * 100}%`, height: '100%', borderRadius: 10,
                  background: timer > 10 ? 'var(--success)' : timer > 5 ? 'var(--warning)' : 'var(--danger)',
                  transition: 'width 1s linear, background 0.3s',
                }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                color: timer > 10 ? 'var(--success)' : timer > 5 ? 'var(--warning)' : 'var(--danger)',
              }}>{timer}s</span>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--accent)' }}>
              {score} pts
            </span>
          </div>
        )}
        <Link to="/dashboard"><button className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>Dashboard</button></Link>
      </nav>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2.5rem 2rem' }} className="page-enter">

        {/* SETUP */}
        {step === 'setup' && (
          <>
            <div style={{ marginBottom: '2.5rem' }}>
              <div className="section-label">Quiz</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.4px' }}>Test your knowledge</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: '0.4rem' }}>
                Faster correct answers earn more points. Rankings update in real time.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '2rem',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>Choose category</div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)} style={{
                    flex: 1, padding: '1rem', borderRadius: 'var(--radius-md)',
                    border: `1px solid ${category === c ? 'var(--accent)' : 'var(--border)'}`,
                    background: category === c ? 'var(--accent-soft)' : 'var(--bg-surface)',
                    color: category === c ? '#8AAAFF' : 'var(--text-muted)',
                    fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    <div style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 14, marginBottom: '0.4rem', background: c === 'DSA' ? 'rgba(91,127,255,0.12)' : 'rgba(129,140,248,0.12)' }}>
                      {c === 'DSA' ? <Brain size={22} color="var(--accent)" /> : <Globe2 size={22} color="var(--accent)" />}
                    </div>
                    {c}
                  </button>
                ))}
              </div>

              <div style={{
                background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.25rem', marginBottom: '1.5rem',
                border: '1px solid var(--border)',
              }}>
                {[
                  `${qs.length} questions — 20 seconds each`,
                  'Faster answers earn bonus points',
                  'Score goes to the leaderboard',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.6rem', padding: '0.3rem 0', fontSize: 13, color: 'var(--text-secondary)', alignItems: 'center' }}>
                    <span style={{ color: 'var(--success)', fontSize: 11 }}>✓</span> {t}
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={() => setStep('quiz')} style={{ padding: '12px 28px', fontSize: 15, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Start quiz
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* QUIZ */}
        {step === 'quiz' && (
          <>
            {/* PROGRESS DOTS */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem' }}>
              {qs.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 10,
                  background: i < qIndex ? 'var(--accent)' : i === qIndex ? 'var(--accent)' : 'var(--bg-hover)',
                  opacity: i < qIndex ? 0.5 : 1, transition: 'all 0.3s',
                }} />
              ))}
            </div>

            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '2rem',
            }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <span className="badge badge-accent" style={{ fontSize: 11 }}>{category}</span>
              </div>
              <h2 style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.5, marginBottom: '1.75rem', color: 'var(--text-primary)' }}>
                {current.q}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {current.options.map((opt, i) => {
                  const s = optionStyle(i)
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={locked} style={{
                      padding: '0.9rem 1.1rem', borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${s.border}`,
                      background: s.bg, color: s.color,
                      fontSize: 14, fontWeight: 500, textAlign: 'left',
                      cursor: locked ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                      <span>{opt}</span>
                      {locked && i === current.answer && <CheckCircle2 size={16} color="var(--success)" />}
                      {locked && i === selected && i !== current.answer && <XCircle size={16} color="var(--danger)" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* RESULT */}
        {step === 'result' && (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <div className="section-label">Quiz Complete</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.4px' }}>Your results</h1>
            </div>

            {/* SCORE CARD */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--accent-border)',
              borderRadius: 'var(--radius-lg)', padding: '1.75rem',
              display: 'flex', alignItems: 'center', gap: '1.5rem',
              marginBottom: '1.25rem', flexWrap: 'wrap',
            }}>
              <div style={{ textAlign: 'center', minWidth: 80 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, color: 'var(--accent)' }}>{score}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>points</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: '0.3rem' }}>
                  {results.filter(r => r.isCorrect).length}/{qs.length} correct
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Category: {category} — faster answers earned you bonus points
                </div>
              </div>
            </div>

            {/* ANSWER REVIEW */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {results.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)', border: `1px solid ${r.isCorrect ? 'rgba(45,212,160,0.2)' : 'rgba(255,95,95,0.15)'}`,
                  borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                }}>
                  <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', color: r.isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                    {r.isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{r.q}</div>
                    {!r.isCorrect && (
                      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                        Correct: <span style={{ color: 'var(--success)' }}>{qs[i].options[r.correct]}</span>
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{r.time}s</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={reset} style={{ padding: '11px 24px', fontSize: 14 }}>Try again</button>
              <Link to="/leaderboard"><button className="btn-ghost" style={{ padding: '11px 24px', fontSize: 14, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>View leaderboard
                <ArrowRight size={16} />
              </button></Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}