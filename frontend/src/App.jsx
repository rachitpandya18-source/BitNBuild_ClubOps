import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './pages/Overview';
import Events from './pages/Events';
import Tasks from './pages/Tasks';
import AIAssistant from './pages/AIAssistant';
import Meetings from './pages/Meetings';
import Risks from './pages/Risks';
import Announcements from './pages/Announcements';
import Settings from './pages/Settings';
import Volunteers from './pages/Volunteers';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rudresh Joshi',
    email: 'rudresh@example.com',
    role: 'Club President',
    phone: '',
    department: 'Campus Technical Society',
  });

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(true);
    } else {
      setSidebarCollapsed((value) => !value);
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-background overflow-hidden relative">
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar Container */}
        <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <Sidebar onClose={() => setSidebarOpen(false)} collapsed={sidebarCollapsed} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          <Topbar onMenuClick={handleMenuClick} sidebarCollapsed={sidebarCollapsed} profile={profile} />
          
          <div className="flex-1 min-w-0 overflow-auto overflow-x-hidden p-3 sm:p-4 lg:p-space-xl">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/events" element={<Events />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/volunteers" element={<Volunteers />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/risks" element={<Risks />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/ai" element={<AIAssistant />} />
              <Route path="/ai-assistant" element={<Navigate to="/ai" replace />} />
              <Route path="/settings" element={<Settings profile={profile} onProfileChange={setProfile} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
