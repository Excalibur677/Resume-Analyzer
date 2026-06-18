import { Link } from 'react-router-dom'

const stats = [
  { label: 'Total Students', value: '142', icon: '👥', color: 'var(--accent)' },
  { label: 'Active Today', value: '38', icon: '🟢', color: 'var(--success)' },
  { label: 'Resumes Analyzed', value: '89', icon: '📄', color: 'var(--warning)' },
  { label: 'Interviews Done', value: '54', icon: '🎤', color: '#FF6B6B' },
]

const students = [
  { name: 'Riya Sharma', id: '21CS001', status: 'Active', ats: 88, interviews: 6, streak: 14 },
  { name: 'Karthik M', id: '21CS002', status: 'Active', ats: 82, interviews: 5, streak: 11 },
  { name: 'Asad Ahmed', id: '21CS003', status: 'Active', ats: 78, interviews: 5, streak: 7 },
  { name: 'Priya K', id: '21CS004', status: 'Inactive', ats: 61, interviews: 2, streak: 0 },
  { name: 'Rahul T', id: '21CS005', status: 'Active', ats: 74, interviews: 4, streak: 5 },
  { name: 'Sneha R', id: '21CS006', status: 'Inactive', ats: 55, interviews: 1, streak: 0 },
  { name: 'Arjun P', id: '21CS007', status: 'Active', ats: 70, interviews: 3, streak: 6 },
]

const statusColor = (s) => s === 'Active' ? 'badge-success' : 'badge-danger'

export default function AdminDashboard() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>

      {/* NAVBAR */}
      <nav style={{
        padding: '1rem 2.5rem', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(15,23,35,0.95)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff' }}>
          Resume<span style={{ color: 'var(--accent)' }}>AI</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginLeft: 8 }}>Admin</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/reports"><button className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>Reports</button></Link>
          <Link to="/admin/company-jd"><button className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>Company JDs</button></Link>
          <Link to="/login"><button className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>Log out</button></Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '2.5rem 2rem' }} className="page-enter">

        <div style={{ marginBottom: '2rem' }}>
          <div className="section-label">Admin Panel</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.4px' }}>Student Activity Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: '0.3rem' }}>G. Pullaiah College of Engineering — Batch 2026</p>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem',
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{s.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK NAV */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
          <Link to="/admin/reports" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
              cursor: 'pointer', transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,127,255,0.35)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ fontSize: 28 }}>📊</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>AI Student Reports</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Auto-generated performance reports</div>
              </div>
            </div>
          </Link>
          <Link to="/admin/company-jd" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
              cursor: 'pointer', transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,127,255,0.35)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ fontSize: 28 }}>🏢</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Company JD Portal</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Upload JDs for students to practice</div>
              </div>
            </div>
          </Link>
        </div>

        {/* STUDENT TABLE */}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
          All students
        </div>
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          {/* TABLE HEADER */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 100px 80px 80px 60px',
            padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border)',
            fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
            letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            <span>Student</span>
            <span style={{ textAlign: 'center' }}>Status</span>
            <span style={{ textAlign: 'center' }}>ATS Score</span>
            <span style={{ textAlign: 'center' }}>Interviews</span>
            <span style={{ textAlign: 'center' }}>Streak</span>
          </div>

          {students.map((s, i) => (
            <div key={s.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 100px 80px 80px 60px',
              padding: '0.9rem 1.5rem', alignItems: 'center',
              borderBottom: i < students.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--bg-hover)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
                }}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.id}</div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span className={`badge ${statusColor(s.status)}`} style={{ fontSize: 11 }}>{s.status}</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
                  color: s.ats >= 75 ? 'var(--success)' : s.ats >= 60 ? 'var(--warning)' : 'var(--danger)',
                }}>{s.ats}</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)' }}>{s.interviews}</div>
              <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>{s.streak > 0 ? `${s.streak}🔥` : '—'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}