import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, Zap } from 'lucide-react'

const tabs = ['Quiz', 'Snippet']

const data = {
  Quiz: [
    { rank: 1, name: 'Riya Sharma', college: 'GPCET', score: 2840, streak: 14, badge: '' },
    { rank: 2, name: 'Karthik M', college: 'GPCET', score: 2610, streak: 11, badge: '' },
    { rank: 3, name: 'Asad Ahmed', college: 'GPCET', score: 2390, streak: 7, badge: '' },
    { rank: 4, name: 'Priya K', college: 'GPCET', score: 2100, streak: 9, badge: '' },
    { rank: 5, name: 'Rahul T', college: 'GPCET', score: 1980, streak: 5, badge: '' },
    { rank: 6, name: 'Sneha R', college: 'GPCET', score: 1820, streak: 3, badge: '' },
    { rank: 7, name: 'Arjun P', college: 'GPCET', score: 1700, streak: 6, badge: '' },
    { rank: 8, name: 'Divya N', college: 'GPCET', score: 1540, streak: 2, badge: '' },
  ],
  Snippet: [
    { rank: 1, name: 'Karthik M', college: 'GPCET', score: 3100, streak: 11, badge: '' },
    { rank: 2, name: 'Asad Ahmed', college: 'GPCET', score: 2750, streak: 7, badge: '' },
    { rank: 3, name: 'Riya Sharma', college: 'GPCET', score: 2500, streak: 14, badge: '' },
    { rank: 4, name: 'Arjun P', college: 'GPCET', score: 2200, streak: 6, badge: '' },
    { rank: 5, name: 'Priya K', college: 'GPCET', score: 1950, streak: 9, badge: '' },
    { rank: 6, name: 'Rahul T', college: 'GPCET', score: 1800, streak: 5, badge: '' },
    { rank: 7, name: 'Sneha R', college: 'GPCET', score: 1600, streak: 3, badge: '' },
    { rank: 8, name: 'Divya N', college: 'GPCET', score: 1400, streak: 2, badge: '' },
  ],
}

const ME = 'Asad Ahmed'

export default function Leaderboard() {
  const [tab, setTab] = useState('Quiz')
  const rows = data[tab]
  const myRow = rows.find(r => r.name === ME)

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

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 2rem' }} className="page-enter">

        <div style={{ marginBottom: '2rem' }}>
          <div className="section-label">Rankings</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.4px' }}>Leaderboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: '0.4rem' }}>
            Ranked by score — faster correct answers earn more points.
          </p>
        </div>

        {/* MY RANK CARD */}
        {myRow && (
          <div style={{
            background: 'var(--accent-soft)', border: '1px solid var(--accent-border)',
            borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--accent)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#fff',
              }}>A</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Your rank — #{myRow.rank}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{myRow.score} points · {myRow.streak} day streak</div>
              </div>
            </div>
            <Link to="/quiz">
              <button className="btn-primary" style={{ fontSize: 12, padding: '7px 16px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>Improve rank
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        )}

        {/* TABS */}
        <div style={{
          display: 'flex', background: 'var(--bg-card)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
          padding: 4, marginBottom: '1.5rem', gap: 4,
        }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '9px', border: 'none', borderRadius: 9,
              background: tab === t ? 'var(--accent)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--text-muted)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>{t}</button>
          ))}
        </div>

        {/* TOP 3 PODIUM */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.75rem', marginBottom: '1.5rem',
        }}>
          {rows.slice(0, 3).map((r, i) => (
            <div key={r.rank} style={{
              background: 'var(--bg-card)', border: `1px solid ${i === 0 ? 'rgba(255,193,7,0.3)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)', padding: '1.25rem',
              textAlign: 'center', order: i === 0 ? 0 : i === 1 ? -1 : 1,
              transform: i === 0 ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.2s',
            }}>
              <div style={{ fontSize: 28, marginBottom: '0.4rem', display: 'flex', justifyContent: 'center' }}>
                <Trophy size={28} color={['#D4AF37', '#C0C0C0', '#CD7F32'][i]} />
            </div>
              <div style={{
                width: 38, height: 38, borderRadius: '50%', margin: '0 auto 0.5rem',
                background: i === 0 ? 'rgba(255,193,7,0.15)' : 'var(--bg-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                color: i === 0 ? '#FFC107' : 'var(--text-secondary)',
              }}>{i + 1}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: r.name === ME ? 'var(--accent)' : 'var(--text-primary)', marginBottom: '0.2rem' }}>
                {r.name === ME ? 'You' : r.name.split(' ')[0]}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: i === 0 ? '#FFC107' : 'var(--text-secondary)' }}>
                {r.score.toLocaleString()}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: '0.2rem' }}>pts</div>
            </div>
          ))}
        </div>

        {/* FULL TABLE */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          {/* HEADER */}
          <div style={{
            display: 'grid', gridTemplateColumns: '40px 1fr 80px 60px',
            padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border)',
            fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
            letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            <span>#</span><span>Student</span><span style={{ textAlign: 'right' }}>Score</span><span style={{ textAlign: 'right' }}>Streak</span>
          </div>

          {rows.map((r, i) => (
            <div key={r.rank} style={{
              display: 'grid', gridTemplateColumns: '40px 1fr 80px 60px',
              padding: '0.9rem 1.25rem',
              borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
              background: r.name === ME ? 'rgba(91,127,255,0.06)' : 'transparent',
              alignItems: 'center',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => { if (r.name !== ME) e.currentTarget.style.background = 'var(--bg-hover)' }}
              onMouseLeave={e => { if (r.name !== ME) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                color: r.rank <= 3 ? ['#FFC107', '#C0C0C0', '#CD7F32'][r.rank - 1] : 'var(--text-muted)',
              }}>{r.rank <= 3 ? r.badge || r.rank : r.rank}</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  background: r.name === ME ? 'var(--accent)' : 'var(--bg-hover)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  color: r.name === ME ? '#fff' : 'var(--text-muted)',
                }}>{r.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: r.name === ME ? 700 : 500, color: r.name === ME ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {r.name === ME ? 'You (Asad)' : r.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.college}</div>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>
                {r.score.toLocaleString()}
              </div>
              <div style={{ textAlign: 'right', fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem', justifyItems: 'flex-end' }}>
                <Zap size={14} />
                {r.streak}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}