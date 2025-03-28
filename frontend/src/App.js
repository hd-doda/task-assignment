import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import StudentDashboardPage from './pages/StudentDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboardPage />} />
        <Route path="/student-dashboard" element={<StudentDashboardPage />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;