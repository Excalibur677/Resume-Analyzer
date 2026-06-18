import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', collegeId: '', collegeCode: '', password: '', confirm: ''
  })

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
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>Log in</Link>
        </span>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="page-enter" style={{ width: '100%', maxWidth: 460 }}>

          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.4rem' }}>
              Create your account
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              Start your placement prep journey today
            </p>
          </div>

          {/* FORM CARD */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '1.75rem',
            display: 'flex', flexDirection: 'column', gap: '1.1rem',
          }}>

            {/* Row — name + college ID */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Full name</label>
                <input name="name" value={form.name} onChange={handle}
                  placeholder="Asad Ahmed" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>College ID</label>
                <input name="collegeId" value={form.collegeId} onChange={handle}
                  placeholder="21CS001" style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email address</label>
              <input name="email" type="email" value={form.email} onChange={handle}
                placeholder="you@college.edu" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>
                College code{' '}
                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional — leave empty for general access)</span>
              </label>
              <input name="collegeCode" value={form.collegeCode} onChange={handle}
                placeholder="e.g. GPCET2024" style={inputStyle} />
            </div>

            {/* Row — password + confirm */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Password</label>
                <input name="password" type="password" value={form.password} onChange={handle}
                  placeholder="••••••••" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Confirm password</label>
                <input name="confirm" type="password" value={form.confirm} onChange={handle}
                  placeholder="••••••••" style={inputStyle} />
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '0.25rem' }}>
              Create account
            </button>

          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: '1.25rem', lineHeight: 1.6 }}>
            By signing up you agree to our{' '}
            <a href="#" style={{ color: 'var(--accent)' }}>Terms of Service</a>{' '}and{' '}
            <a href="#" style={{ color: 'var(--accent)' }}>Privacy Policy</a>.
          </p>

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