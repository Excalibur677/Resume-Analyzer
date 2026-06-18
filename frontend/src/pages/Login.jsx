import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const [role, setRole] = useState('student')
  const [form, setForm] = useState({ email: '', password: '', collegeCode: '' })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <nav style={{
        padding: '1.2rem 2.5rem', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/">
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff' }}>
            Resume<span style={{ color: 'var(--accent)' }}>AI</span>
          </div>
        </Link>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 500 }}>Sign up</Link>
        </span>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="page-enter" style={{ width: '100%', maxWidth: 420 }}>

          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.4rem' }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              Log in to continue your placement prep
            </p>
          </div>

          {/* ROLE TOGGLE */}
          <div style={{
            display: 'flex', background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            padding: 4, marginBottom: '1.75rem', gap: 4,
          }}>
            {['student', 'admin'].map((r) => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: '9px', border: 'none', borderRadius: 9,
                background: role === r ? 'var(--accent)' : 'transparent',
                color: role === r ? '#fff' : 'var(--text-muted)',
                fontSize: 13, fontWeight: 600,
                transition: 'background 0.2s, color 0.2s',
                textTransform: 'capitalize',
              }}>{r}</button>
            ))}
          </div>

          {/* FORM CARD */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '1.75rem',
          }}>

            {/* College code — student only */}
            {role === 'student' && (
              <div style={{ marginBottom: '1.1rem' }}>
                <label style={labelStyle}>College code <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                <input
                  name="collegeCode" value={form.collegeCode} onChange={handle}
                  placeholder="e.g. GPCET2024"
                  style={inputStyle}
                />
              </div>
            )}

            <div style={{ marginBottom: '1.1rem' }}>
              <label style={labelStyle}>Email address</label>
              <input
                name="email" type="email" value={form.email} onChange={handle}
                placeholder="you@college.edu"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={labelStyle}>Password</label>
                <a href="#" style={{ fontSize: 12, color: 'var(--accent)' }}>Forgot password?</a>
              </div>
              <input
                name="password" type="password" value={form.password} onChange={handle}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              Log in as {role}
            </button>

          </div>

          {/* BOTTOM NOTE for general user */}
          {role === 'student' && (
            <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text-muted)', marginTop: '1.25rem', lineHeight: 1.6 }}>
              Leave college code empty to log in as a general user.
            </p>
          )}

        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 500,
  color: 'var(--text-secondary)', marginBottom: 6,
}

const inputStyle = {
  width: '100%', padding: '10px 13px',
  background: 'var(--bg-surface)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
  fontSize: 14, outline: 'none',
  transition: 'border-color 0.2s',
}