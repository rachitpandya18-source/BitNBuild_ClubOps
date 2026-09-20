import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Topbar({ onMenuClick, sidebarCollapsed = false, profile = { name: 'Rudresh Joshi', role: 'Club President' } }) {
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) setNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Overview';
      case '/events': return 'Events';
      case '/tasks': return 'Tasks';
      case '/ai':
      case '/ai-assistant': return 'AI Assistant';
      case '/meetings': return 'Meetings';
      case '/risks': return 'Risks';
      case '/announcements': return 'Announcements';
      case '/settings': return 'Settings';
      case '/volunteers': return 'Volunteers';
      default: return 'ClubOps AI';
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-3 sm:px-4 lg:px-space-lg flex items-center shrink-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div className="h-7 w-px bg-outline-variant/40 hidden sm:block" />
        <div className="min-w-0">
          <p className="font-title-md text-title-md text-on-surface font-semibold truncate">{getPageTitle()}</p>
          <p className="hidden md:block font-label-sm text-label-sm text-on-surface-variant truncate">ClubOps AI · Events Hub</p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-space-sm shrink-0 ml-3">
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative w-10 h-10 inline-flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-1.5rem))] bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden flex flex-col z-50">
              <div className="px-4 py-3 border-b border-outline-variant/20">
                <span className="font-title-sm font-semibold text-on-surface">Notifications</span>
              </div>
              <div className="flex flex-col max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b border-outline-variant/10 hover:bg-surface-container-low cursor-pointer flex flex-col gap-1">
                  <span className="font-label-sm text-on-surface font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-error">warning</span> Venue confirmation deadline approaching</span>
                  <span className="font-body-sm text-on-surface-variant">Please confirm the auditorium booking before EOD.</span>
                </div>
                <div className="px-4 py-3 border-b border-outline-variant/10 hover:bg-surface-container-low cursor-pointer flex flex-col gap-1">
                  <span className="font-label-sm text-on-surface font-semibold">2 tasks due today</span>
                  <span className="font-body-sm text-on-surface-variant">Check your task list to complete pending operations.</span>
                </div>
                <div className="px-4 py-3 border-b border-outline-variant/10 hover:bg-surface-container-low cursor-pointer flex flex-col gap-1">
                  <span className="font-label-sm text-on-surface font-semibold">New volunteer assigned</span>
                  <span className="font-body-sm text-on-surface-variant">Aarav has been added to the Logistics crew.</span>
                </div>
                <div className="px-4 py-3 hover:bg-surface-container-low cursor-pointer flex flex-col gap-1">
                  <span className="font-label-sm text-on-surface font-semibold">Risk alert detected</span>
                  <span className="font-body-sm text-on-surface-variant">AI detected a potential scheduling conflict.</span>
                </div>
              </div>
              <div className="px-4 py-3 bg-surface-container-lowest border-t border-outline-variant/20 text-center cursor-pointer hover:bg-surface-container-low text-primary font-label-sm font-semibold">
                View all notifications
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-outline-variant/40 mx-1 hidden sm:block" />

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-1.5 py-1 rounded-xl cursor-pointer group select-none hover:bg-surface-container transition-colors max-w-[11rem]"
            aria-expanded={profileOpen}
          >
            <img alt="Profile" className="w-8 h-8 rounded-full object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbJ-8HUpDM7Hkd3zE7AqOMx6WX6L9o7pX4upfZgTRSF8aClUc3XV0pYuZ8HaQ4nqWDQ3yY8R1wjXGwFk_U846_Bp9U3J3nQBUcLOlpJmK6kdpFeeWEtMkT-kn4mSO94sGzk5YsiaeS6RpnGN127ggfi8q0rUq-TboNZ-oHFyprUqi1H3JuZQ0oJqVLu1q4hRlqSP_v74-AztK4IROepvi2WApOzqyFYYkiVDHTJVU" />
            <div className="hidden sm:flex flex-col text-left leading-tight min-w-0">
              <span className="font-label-md text-label-md text-on-surface font-semibold truncate">{profile.name}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">{profile.role}</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px] group-hover:text-on-surface transition-colors">expand_more</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden flex flex-col z-50 py-1">
              <div className="px-4 py-3 border-b border-outline-variant/20 sm:hidden">
                <span className="font-label-md text-on-surface font-semibold block">{profile.name}</span>
                <span className="font-label-sm text-on-surface-variant">{profile.role}</span>
              </div>
              <Link to="/settings" onClick={() => setProfileOpen(false)} className="px-4 py-2 hover:bg-surface-container-low text-on-surface font-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">person</span> Profile
              </Link>
              <Link to="/settings" onClick={() => setProfileOpen(false)} className="px-4 py-2 hover:bg-surface-container-low text-on-surface font-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">settings</span> Settings
              </Link>
              <a href="#" onClick={(e) => { e.preventDefault(); setProfileOpen(false); }} className="px-4 py-2 hover:bg-surface-container-low text-on-surface font-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">help</span> Help & Documentation
              </a>
              <div className="border-t border-outline-variant/20 my-1" />
              <a href="#" onClick={(e) => { e.preventDefault(); setProfileOpen(false); }} className="px-4 py-2 hover:bg-surface-container-low text-error font-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">logout</span> Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
