import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import ResumeUpload from './pages/ResumeUpload'
import MockInterview from './pages/MockInterview'
import Quiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import StudentReports from './pages/admin/StudentReports'
import CompanyJD from './pages/admin/CompanyJD'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle dark mode"
      >
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>

      <Routes>
        <Route path="/"                    element={<Landing />} />
        <Route path="/login"               element={<Login />} />
        <Route path="/register"            element={<Register />} />
        <Route path="/dashboard"           element={<StudentDashboard />} />
        <Route path="/resume"              element={<ResumeUpload />} />
        <Route path="/interview"           element={<MockInterview />} />
        <Route path="/quiz"                element={<Quiz />} />
        <Route path="/leaderboard"         element={<Leaderboard />} />
        <Route path="/admin"               element={<AdminDashboard />} />
        <Route path="/admin/reports"       element={<StudentReports />} />
        <Route path="/admin/company-jd"    element={<CompanyJD />} />

        <Route path="/StudentDashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/ResumeUpload" element={<Navigate to="/resume" replace />} />
        <Route path="/MockInterview" element={<Navigate to="/interview" replace />} />
        <Route path="/admin/AdminDashboard" element={<Navigate to="/admin" replace />} />
        <Route path="/admindashboard" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/StudentReports" element={<Navigate to="/admin/reports" replace />} />
        <Route path="/admin/admin/StudentReports" element={<Navigate to="/admin/reports" replace />} />
        <Route path="/admin/CompanyJD" element={<Navigate to="/admin/company-jd" replace />} />
        <Route path="/admin/admin/CompanyJD" element={<Navigate to="/admin/company-jd" replace />} />
        <Route path="/CompanyJD" element={<Navigate to="/admin/company-jd" replace />} />
      </Routes>
    </BrowserRouter>
  )
}