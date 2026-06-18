import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  )
}