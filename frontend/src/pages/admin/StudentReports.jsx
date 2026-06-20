import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'

const reports = [
  {
    name: 'Riya Sharma', id: '21CS001', category: 'High Skilled',
    ats: 88, interviews: 6, streak: 14, quizScore: 2840,
    summary: 'Consistently high performer. Strong in Python, React, and DSA. Ready for top-tier placements.',
    skills: ['Python', 'React', 'DSA', 'SQL'], gaps: ['System Design', 'AWS'],
  },
  {
    name: 'Karthik M', id: '21CS002', category: 'High Skilled',
    ats: 82, interviews: 5, streak: 11, quizScore: 2610,
    summary: 'Strong backend skills. Excels in code snippet challenges. Needs improvement in frontend concepts.',
    skills: ['FastAPI', 'PostgreSQL', 'Docker'], gaps: ['React', 'CSS'],
  },
  {
    name: 'Asad Ahmed', id: '21CS003', category: 'Active',
    ats: 78, interviews: 5, streak: 7, quizScore: 2390,
    summary: 'Regular engagement across all modules. Good ATS score. Improving steadily in mock interviews.',
    skills: ['Python', 'FastAPI', 'Git'], gaps: ['Docker', 'AWS'],
  },
  {
    name: 'Priya K', id: '21CS004', category: 'Inactive',
    ats: 61, interviews: 2, streak: 0, quizScore: 2100,
    summary: 'Low engagement in the past 2 weeks. Resume score below average. Needs immediate attention.',
    skills: ['Java', 'SQL'], gaps: ['DSA', 'System Design', 'Projects'],
  },
  {
    name: 'Rahul T', id: '21CS005', category: 'Active',
    ats: 74, interviews: 4, streak: 5, quizScore: 1980,
    summary: 'Consistent quiz participation. ATS score needs improvement. Mock interview performance is decent.',
    skills: ['C++', 'DSA', 'DBMS'], gaps: ['Web Dev', 'Cloud'],
  },
]

const catColor = (c) => c === 'High Skilled' ? 'badge-success' : c === 'Active' ? 'badge-accent' : 'badge-danger'

export default function StudentReports() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'High Skilled', 'Active', 'Inactive']
  const filtered = filter === 'All' ? reports : reports.filter(r => r.category === filter)

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
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginLeft: 8 }}>Admin</span>
        </Link>
        <Link to="/admin"><button className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>Dashboard</button></Link>
      </nav>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '2.5rem 2rem' }} className="page-enter">

        <div style={{ marginBottom: '2rem' }}>
          <div className="section-label">Reports</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.4px' }}>AI-Generated Student Reports</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: '0.3rem' }}>
            Auto-analyzed based on resume scores, interview performance, quizzes, and streaks.
          </p>
        </div>

        {/* FILTER TABS */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '7px 18px', borderRadius: 100,
              border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
              background: filter === f ? 'var(--accent-soft)' : 'transparent',
              color: filter === f ? '#8AAAFF' : 'var(--text-muted)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
            }}>{f}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1.25rem', alignItems: 'start' }}>

          {/* REPORT LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map(r => (
              <div key={r.id} onClick={() => setSelected(selected?.id === r.id ? null : r)}
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${selected?.id === r.id ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: selected?.id === r.id ? 'rgba(91,127,255,0.05)' : 'var(--bg-card)',
                }}
                onMouseEnter={e => { if (selected?.id !== r.id) e.currentTarget.style.borderColor = 'rgba(91,127,255,0.25)' }}
                onMouseLeave={e => { if (selected?.id !== r.id) e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--bg-hover)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: 'var(--text-muted)',
                    }}>{r.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.id}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={`badge ${catColor(r.category)}`} style={{ fontSize: 11 }}>{r.category}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>ATS: <b style={{ color: r.ats >= 75 ? 'var(--success)' : r.ats >= 60 ? 'var(--warning)' : 'var(--danger)' }}>{r.ats}</b></span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{r.streak > 0 ? `${r.streak} days` : '—'}</span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.6 }}>{r.summary}</p>
              </div>
            ))}
          </div>

          {/* DETAIL PANEL */}
          {selected && (
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--accent-border)',
              borderRadius: 'var(--radius-lg)', padding: '1.5rem',
              position: 'sticky', top: 80,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{selected.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.id}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{
                  background: 'none', border: 'none', color: 'var(--text-muted)',
                  fontSize: 18, cursor: 'pointer', lineHeight: 1,
                }}><X size={18} /></button>
              </div>

              {/* METRICS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'ATS Score', value: `${selected.ats}/100`, color: selected.ats >= 75 ? 'var(--success)' : 'var(--warning)' },
                  { label: 'Interviews', value: selected.interviews, color: 'var(--accent)' },
                  { label: 'Quiz Score', value: selected.quizScore.toLocaleString(), color: 'var(--warning)' },
                  { label: 'Streak', value: selected.streak > 0 ? `${selected.streak} days` : 'None', color: '#FF6B6B' },
                ].map(m => (
                  <div key={m.label} style={{
                    background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)',
                    padding: '0.85rem', border: '1px solid var(--border)',
                  }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{m.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Strong skills</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {selected.skills.map(s => <span key={s} className="badge badge-success" style={{ fontSize: 11 }}>{s}</span>)}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Skill gaps</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {selected.gaps.map(g => <span key={g} className="badge badge-danger" style={{ fontSize: 11 }}>{g}</span>)}
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '10px' }}>
                Download report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}