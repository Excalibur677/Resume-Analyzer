import { Link } from 'react-router-dom'

const stats = [
  { label: 'Last ATS Score', value: '78', unit: '/100', color: 'var(--accent)' },
  { label: 'Interviews Done', value: '5', unit: '', color: 'var(--success)' },
  { label: 'Quiz Rank', value: '#12', unit: '', color: 'var(--warning)' },
  { label: 'Day Streak', value: '7', unit: '🔥', color: '#FF6B6B' },
]

const quickActions = [
  { icon: '📄', label: 'Analyze Resume', desc: 'Upload resume + JD for ATS score', to: '/resume', accent: true },
  { icon: '🎤', label: 'Mock Interview', desc: 'Practice JD-based questions', to: '/interview', accent: false },
  { icon: '🧠', label: 'Take a Quiz', desc: 'DSA or Web Dev — ranked', to: '/quiz', accent: false },
  { icon: '🏆', label: 'Leaderboard', desc: 'See where you rank', to: '/leaderboard', accent: false },
]

const companyJDs = [
  { company: 'TCS', role: 'Software Engineer', type: 'Fresher', deadline: '25 Jun 2026', tags: ['Python', 'SQL', 'OOPs'] },
  { company: 'Infosys', role: 'Systems Engineer', type: 'Fresher', deadline: '30 Jun 2026', tags: ['Java', 'DSA', 'DBMS'] },
  { company: 'Wipro', role: 'Full Stack Developer', type: '1 yr exp', deadline: '5 Jul 2026', tags: ['React', 'Node.js', 'MongoDB'] },
]

const activity = [
  { icon: '📄', text: 'Resume analyzed for TCS Software Engineer', time: '2 hours ago', badge: '78/100', badgeType: 'accent' },
  { icon: '🎤', text: 'Completed mock interview — Medium difficulty', time: 'Yesterday', badge: 'Done', badgeType: 'success' },
  { icon: '🧠', text: 'Quiz: DSA — Trees & Graphs', time: '2 days ago', badge: '#12', badgeType: 'warning' },
]

export default function StudentDashboard() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>

      {/* NAVBAR */}
      <nav style={{
        padding: '1rem 2.5rem', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(15,23,35,0.95)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff' }}>
          Resume<span style={{ color: 'var(--accent)' }}>AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {[
            { label: 'Resume', to: '/resume' },
            { label: 'Interview', to: '/interview' },
            { label: 'Quiz', to: '/quiz' },
            { label: 'Leaderboard', to: '/leaderboard' },
          ].map(l => (
            <Link key={l.to} to={l.to} style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >{l.label}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>7🔥</div>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'var(--accent-soft)', border: '1px solid var(--accent-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'var(--accent)',
          }}>A</div>
        </div>
      </nav>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* GREETING */}
        <div style={{ marginBottom: '2rem' }} className="page-enter">
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.4px', marginBottom: '0.3rem' }}>
            Good morning, Asad 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            You're on a 7-day streak. Keep it going today.
          </p>
        </div>

        {/* STATS ROW */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem', marginBottom: '2.5rem',
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,127,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.5rem' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color: s.color, letterSpacing: '-0.5px' }}>
                {s.value}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>{s.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* QUICK ACTIONS */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.85rem', letterSpacing: '0.2px' }}>
                Quick actions
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {quickActions.map((a) => (
                  <Link to={a.to} key={a.label} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: a.accent ? 'var(--accent-soft)' : 'var(--bg-card)',
                      border: `1px solid ${a.accent ? 'var(--accent-border)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)', padding: '1.25rem',
                      cursor: 'pointer', transition: 'transform 0.18s, border-color 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(91,127,255,0.35)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = a.accent ? 'var(--accent-border)' : 'var(--border)' }}
                    >
                      <div style={{ fontSize: 22, marginBottom: '0.6rem' }}>{a.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{a.label}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{a.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* COMPANY JDs */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                Company JDs — posted by your college
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {companyJDs.map((jd) => (
                  <div key={jd.company} style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', padding: '1.1rem 1.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '1rem', flexWrap: 'wrap',
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{jd.company}</span>
                        <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>— {jd.role}</span>
                        <span className="badge badge-accent" style={{ fontSize: 11, padding: '2px 9px' }}>{jd.type}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {jd.tags.map(t => (
                          <span key={t} style={{
                            fontSize: 11.5, padding: '3px 10px', borderRadius: 100,
                            background: 'var(--bg-hover)', color: 'var(--text-muted)',
                            border: '1px solid var(--border)',
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Deadline: {jd.deadline}</span>
                      <Link to="/resume">
                        <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 12 }}>
                          Practice now →
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — ACTIVITY */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
              Recent activity
            </div>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
            }}>
              {activity.map((a, i) => (
                <div key={i} style={{
                  padding: '1rem 1.25rem',
                  borderBottom: i < activity.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                    background: 'var(--bg-hover)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{a.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: '0.3rem', lineHeight: 1.5 }}>{a.text}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.time}</div>
                  </div>
                  <span className={`badge badge-${a.badgeType}`} style={{ fontSize: 11, flexShrink: 0 }}>{a.badge}</span>
                </div>
              ))}
            </div>

            {/* STREAK CARD */}
            <div style={{
              marginTop: '1rem',
              background: 'var(--bg-card)', border: '1px solid rgba(255,107,107,0.2)',
              borderRadius: 'var(--radius-md)', padding: '1.25rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 36 }}>🔥</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#FF6B6B', margin: '0.25rem 0' }}>7 days</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Complete a quiz or interview today to keep your streak alive</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}