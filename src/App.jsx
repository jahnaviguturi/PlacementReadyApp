import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardShell from './components/DashboardShell';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import History from './pages/History';
import TestChecklist from './pages/prp/TestChecklist';
import Ship from './pages/prp/Ship';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/prp/07-test" element={<TestChecklist />} />
                <Route path="/prp/08-ship" element={<Ship />} />
                <Route path="/app" element={<DashboardShell />}>
                    <Route index element={<Dashboard />} />
                    <Route path="analyze" element={<Analyze />} />
                    <Route path="results" element={<Results />} />
                    <Route path="results/:id" element={<Results />} />
                    <Route path="history" element={<History />} />
                    <Route path="practice" element={<Practice />} />
                    <Route path="assessments" element={<Assessments />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
