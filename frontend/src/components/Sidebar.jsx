import { NavLink } from 'react-router-dom';

const items = [
  ['/', 'grid_view', 'Dashboard'],
  ['/events', 'calendar_month', 'Events', '4 Live'],
  ['/tasks', 'check_circle', 'Tasks', '12'],
  ['/volunteers', 'group', 'Volunteers'],
  ['/meetings', 'groups', 'Meetings'],
  ['/risks', 'warning', 'Risks', '2 High'],
  ['/announcements', 'campaign', 'Announcements'],
  ['/ai', 'auto_awesome', 'AI Assistant', 'Copilot', true],
  ['/settings', 'settings', 'Settings'],
];

export default function Sidebar({ onClose, collapsed = false }) {
  return (
    <aside
      className={`${collapsed ? 'w-[72px]' : 'w-[228px]'} shrink-0 h-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col select-none transition-[width] duration-200 ease-in-out overflow-hidden`}
      aria-label="Primary navigation"
    >
      <div className="flex flex-col min-h-0 h-full">
        <div className={`${collapsed ? 'px-3 justify-center' : 'px-space-md justify-between'} h-16 flex items-center bg-surface-container-lowest shrink-0`}>
          <div className="flex items-center gap-space-sm min-w-0">
            <img src="/logo.png" alt="ClubOps AI Logo" className="w-9 h-9 object-contain shrink-0" />
            {!collapsed && <span className="font-headline-md text-headline-md text-on-surface tracking-tight whitespace-nowrap">ClubOps AI</span>}
          </div>
          {!collapsed && <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">v2.4</span>}
        </div>

        <div className={`${collapsed ? 'px-2' : 'px-space-md'} py-space-sm overflow-y-auto overflow-x-hidden`}>
          {!collapsed && (
            <div className="px-space-sm py-1 mb-space-xs">
              <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Operations Hub</span>
            </div>
          )}
          <nav className="flex flex-col gap-1">
            {items.map(([to, icon, label, badge, isAI]) => (
              <NavLink
                key={to}
                className={({ isActive }) => `flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-space-sm'} py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary-container text-on-primary font-semibold shadow-[0_1px_3px_rgba(79,70,229,0.3)]' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
                to={to}
                onClick={onClose}
                title={collapsed ? label : undefined}
              >
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-space-sm'} min-w-0`}>
                  <span className={`material-symbols-outlined text-[20px] shrink-0 ${isAI ? 'text-secondary' : ''}`}>{icon}</span>
                  {!collapsed && <span className="font-body-md text-body-md whitespace-nowrap">{label}</span>}
                </div>
                {!collapsed && badge && (
                  <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm shrink-0 ${isAI ? 'bg-secondary-fixed text-on-secondary-fixed' : label === 'Risks' ? 'bg-error-container text-on-error-container' : label === 'Events' ? 'bg-surface-container-highest text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
