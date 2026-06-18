import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialJDs = [
  { id: 1, company: 'TCS', role: 'Software Engineer', type: 'Fresher', deadline: '2026-06-25', tags: ['Python', 'SQL', 'OOPs'], jd: 'Looking for fresh graduates with strong Python and SQL fundamentals...' },
  { id: 2, company: 'Infosys', role: 'Systems Engineer', type: 'Fresher', deadline: '2026-06-30', tags: ['Java', 'DSA', 'DBMS'], jd: 'Candidates should have knowledge of Java and data structures...' },
  { id: 3, company: 'Wipro', role: 'Full Stack Developer', type: '1 yr exp', deadline: '2026-07-05', tags: ['React', 'Node.js', 'MongoDB'], jd: 'Experience with React and Node.js required for this role...' },
]

export default function CompanyJD() {
  const [jds, setJDs] = useState(initialJDs)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ company: '', role: '', type: 'Fresher', deadline: '', tags: '', jd: '' })
  const [expanded, setExpanded] = useState(null)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = () => {
    if (!form.company || !form.role || !form.jd) return
    setJDs(prev => [...prev, {
      id: Date.now(), ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }])
    setForm({ company: '', role: '', type: 'Fresher', deadline: '', tags: '', jd: '' })
    setShowForm(false)
  }

  const handleDelete = (id) => setJDs(prev => prev.filter(j => j.id !== id))

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
        <Link to="/admin"><button className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>← Dashboard</button></Link>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 2rem' }} className="page-enter">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-label">Company JD Portal</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.4px' }}>Manage Job Descriptions</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: '0.3rem' }}>
              JDs posted here appear on every student's dashboard.
            </p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)} style={{ padding: '10px 22px', fontSize: 14 }}>
            {showForm ? '✕ Cancel' : '+ Post new JD'}
          </button>
        </div>

        {/* ADD FORM */}
        {showForm && (
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--accent-border)',
            borderRadius: 'var(--radius-lg)', padding: '1.75rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>New Job Description</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { name: 'company', label: 'Company name', placeholder: 'e.g. Google' },
                { name: 'role', label: 'Role', placeholder: 'e.g. Software Engineer' },
              ].map(f => (
                <div key={f.name}>
                  <label style={labelStyle}>{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handle}
                    placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Role type</label>
                <select name="type" value={form.type} onChange={handle} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="Fresher">Fresher</option>
                  <option value="1 yr exp">1 yr exp</option>
                  <option value="2 yr exp">2 yr exp</option>
                  <option value="3+ yr exp">3+ yr exp</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Application deadline</label>
                <input name="deadline" type="date" value={form.deadline} onChange={handle} style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Skill tags <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(comma separated)</span></label>
              <input name="tags" value={form.tags} onChange={handle}
                placeholder="Python, SQL, DSA" style={inputStyle} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Job Description</label>
              <textarea name="jd" value={form.jd} onChange={handle}
                placeholder="Paste the full job description here..."
                style={{ ...inputStyle, height: 120, resize: 'none', lineHeight: 1.65 }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <button className="btn-primary" onClick={handleAdd} style={{ padding: '11px 26px', fontSize: 14 }}>
              Post JD →
            </button>
          </div>
        )}

        {/* JD LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {jds.map(jd => (
            <div key={jd.id} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}>
              <div style={{
                padding: '1.1rem 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '0.75rem', cursor: 'pointer',
              }} onClick={() => setExpanded(expanded === jd.id ? null : jd.id)}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{jd.company}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>— {jd.role}</span>
                    <span className="badge badge-accent" style={{ fontSize: 11 }}>{jd.type}</span>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {jd.deadline && (
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      Deadline: {new Date(jd.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(jd.id) }} style={{
                    background: 'rgba(255,95,95,0.08)', border: '1px solid rgba(255,95,95,0.2)',
                    color: 'var(--danger)', borderRadius: 7, padding: '5px 12px',
                    fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  }}>Delete</button>
                  <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>{expanded === jd.id ? '▲' : '▼'}</span>
                </div>
              </div>
              {expanded === jd.id && (
                <div style={{
                  padding: '1rem 1.5rem 1.25rem',
                  borderTop: '1px solid var(--border)',
                  fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75,
                  background: 'var(--bg-surface)',
                }}>
                  {jd.jd}
                </div>
              )}
            </div>
          ))}
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
  fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
}