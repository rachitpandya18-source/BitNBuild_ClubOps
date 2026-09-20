import { useState } from 'react';
import Modal from '../components/Modal';
import { createEvent } from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Overview() {
  const [eventFilter, setEventFilter] = useState('All');
  const [createOpen, setCreateOpen] = useState(false);
  const [eventForm, setEventForm] = useState({ name:'', description:'', event_type:'', start_date:'', start_time:'', end_date:'', end_time:'', venue:'', expected_participants:'', owner:'', priority:'medium', notes:'' });
  const [eventSaving, setEventSaving] = useState(false);

  const navigate = useNavigate();

  return (
    <main className="relative pt-16 w-full px-space-lg bg-background flex-1"><div className="flex flex-col w-full">

<div className="relative w-full overflow-hidden pb-space-xl">
<div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
<div className="absolute top-48 left-12 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

<div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md pt-space-md mb-space-lg">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-space-xs">
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Good morning, Rudresh</h1>
<span className="text-2xl animate-bounce">👋</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
<span>Here's what's happening with your club today.</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
            2 urgent risk alerts require review before HackQuest '26
          </span>
</p>
</div>

<div className="flex items-center flex-wrap gap-space-xs">
<button onClick={() => navigate('/ai?tab=meetings')} className="group relative flex items-center gap-space-xs px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all duration-200" type="button">
<span className="material-symbols-outlined text-secondary text-[18px] group-hover:scale-110 transition-transform">bolt</span>
<span className="font-label-md text-label-md font-medium">Quick Meeting Scan</span>
<span className="font-code-sm text-code-sm text-outline ml-1 bg-surface-container px-1 py-0.5 rounded">AI</span>
</button>
<button onClick={() => navigate('/announcements?action=new')} className="group flex items-center gap-space-xs px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all duration-200" type="button">
<span className="material-symbols-outlined text-tertiary-container text-[18px] group-hover:rotate-12 transition-transform">campaign</span>
<span className="font-label-md text-label-md font-medium">Instant Announcement</span>
</button>
<button onClick={() => setCreateOpen(true)} className="flex items-center gap-space-xs px-4 py-2 rounded-lg bg-primary text-on-primary shadow-sm hover:bg-primary-container hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" type="button">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span className="font-label-md text-label-md font-semibold">Create Event</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">

<div className="group p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
<div className="flex items-start justify-between">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">calendar_today</span>
</div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Upcoming Events</span>
</div>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">trending_up</span>+2 this mo
          </span>
</div>
<div className="mt-space-md flex items-baseline justify-between">
<div>
<div className="font-display-lg text-display-lg text-on-surface tracking-tight leading-none">4</div>
<div className="font-label-sm text-label-sm text-on-surface-variant mt-1 font-medium">Scheduled &amp; Approved</div>
</div>

<div className="relative w-12 h-12 flex items-center justify-center">
<svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-primary transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<span className="absolute font-code-sm text-[10px] font-semibold text-primary">3d</span>
</div>
</div>
<div className="mt-space-sm pt-2 bg-surface-container-low/50 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-on-surface-variant">
<span className="font-body-sm text-body-sm truncate">Next: <strong className="text-on-surface font-semibold">HackQuest '26</strong></span>
<span className="font-label-sm text-label-sm text-primary font-semibold shrink-0">In 3 days</span>
</div>
</div>

<div className="group p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
<div className="flex items-start justify-between">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined text-[20px]">task_alt</span>
</div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Action Matrix</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
            5 Due Today
          </span>
</div>
<div className="mt-space-md flex items-baseline justify-between">
<div>
<div className="font-display-lg text-display-lg text-on-surface tracking-tight leading-none">19</div>
<div className="font-label-sm text-label-sm text-on-surface-variant mt-1 font-medium">Pending Execution</div>
</div>

<div className="flex items-end gap-1 h-8 w-14 pb-0.5">
<div className="w-2.5 bg-primary rounded-t h-4/6" title="Backlog"></div>
<div className="w-2.5 bg-secondary-container rounded-t h-full" title="In Progress"></div>
<div className="w-2.5 bg-surface-container-highest rounded-t h-3/6" title="Review"></div>
<div className="w-2.5 bg-primary-fixed-dim rounded-t h-5/6" title="Complete"></div>
</div>
</div>
<div className="mt-space-sm pt-2 bg-surface-container-low/50 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-on-surface-variant">
<span className="font-body-sm text-body-sm truncate">8 In Progress · 6 Done</span>
<span className="material-symbols-outlined text-[16px] text-outline">arrow_forward</span>
</div>
</div>

<div className="group p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
<div className="flex items-start justify-between">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">badge</span>
</div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Field Crew</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold">
            94% Responsive
          </span>
</div>
<div className="mt-space-md flex items-baseline justify-between">
<div>
<div className="font-display-lg text-display-lg text-on-surface tracking-tight leading-none">42</div>
<div className="font-label-sm text-label-sm text-on-surface-variant mt-1 font-medium">Active Volunteers</div>
</div>
<div className="flex -space-x-2 overflow-hidden">
<div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-[10px] font-bold">AP</div>
<div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-[10px] font-bold">DP</div>
<div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-label-sm text-[10px] font-bold">+8</div>
</div>
</div>
<div className="mt-space-sm pt-2 bg-surface-container-low/50 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-on-surface-variant">
<span className="font-body-sm text-body-sm"><strong className="text-on-surface">8 Leads</strong> on active standby</span>
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
</div>

<div className="group p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
<div className="flex items-start justify-between">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-lg bg-error-container/60 flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[20px]">warning</span>
</div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Risk Engine</span>
</div>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[13px]">auto_awesome</span> AI Flagged
          </span>
</div>
<div className="mt-space-md flex items-baseline justify-between">
<div>
<div className="font-display-lg text-display-lg text-error tracking-tight leading-none">3</div>
<div className="font-label-sm text-label-sm text-on-surface-variant mt-1 font-medium">Critical / High Alerts</div>
</div>
<div className="flex gap-1 items-center">
<span className="w-2.5 h-6 rounded bg-error" title="1 Critical"></span>
<span className="w-2.5 h-4 rounded bg-secondary" title="1 High"></span>
<span className="w-2.5 h-2.5 rounded bg-surface-container-highest" title="1 Low"></span>
</div>
</div>
<div className="mt-space-sm pt-2 bg-surface-container-low/50 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-on-surface-variant">
<span className="font-body-sm text-body-sm">1 Critical · 1 High · 1 Low</span>
<span className="font-label-sm text-label-sm text-error font-semibold">Needs Action</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">

<div className="xl:col-span-8 flex flex-col gap-space-lg">

<section className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[22px]">event_seat</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Flagship Timelines &amp; Operations</h2>
</div>

<div className="inline-flex p-1 rounded-lg bg-surface-container-low self-start sm:self-auto">
  <button onClick={() => setEventFilter('All')} className={eventFilter === 'All' ? "px-3 py-1 rounded-md bg-surface-container-lowest text-primary shadow-xs font-label-sm text-label-sm font-semibold transition-all" : "px-3 py-1 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"} type="button">All Events (4)</button>
  <button onClick={() => setEventFilter('Flagship')} className={eventFilter === 'Flagship' ? "px-3 py-1 rounded-md bg-surface-container-lowest text-primary shadow-xs font-label-sm text-label-sm font-semibold transition-all" : "px-3 py-1 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"} type="button">Flagship (2)</button>
  <button onClick={() => setEventFilter('Workshops')} className={eventFilter === 'Workshops' ? "px-3 py-1 rounded-md bg-surface-container-lowest text-primary shadow-xs font-label-sm text-label-sm font-semibold transition-all" : "px-3 py-1 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"} type="button">Workshops (1)</button>
  <button onClick={() => setEventFilter('Social')} className={eventFilter === 'Social' ? "px-3 py-1 rounded-md bg-surface-container-lowest text-primary shadow-xs font-label-sm text-label-sm font-semibold transition-all" : "px-3 py-1 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"} type="button">Social (1)</button>
  </div>
</div>
<div className="flex flex-col gap-space-md">

{['All', 'Flagship'].includes(eventFilter) && (
<div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md flex flex-col gap-space-md hover:shadow-md transition-all duration-200">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
<div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm pl-2">
<div className="flex items-start gap-space-sm">
<div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 shadow-xs">
<img className="w-full h-full object-cover" data-alt="University hackathon banner with high energy students coding with vibrant purple and indigo ambient stage lighting, dynamic collegiate tech showcase" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaOXzcoUtGTytzMcHI0B0BrzD2uQ_unrZCg8D3q8wUngNCzx4hBRmZGZhFgRb7lMifLIcusmErkVTaL9E7kn002MjIymJy4OpC4MjvA2Hu5MKxB68olHWeQH5i5PzolxRsp8SVBanLkOdlkgmlKo-8_7jg_eJfUd1WJuYIYEmgKOf-uzY6em5djOws6BHNHcJVjETXf_bSCGSFPG0-ta1PCutaJpwSllxQOeIRHGA"  />
</div>
<div className="flex flex-col">
<div className="flex items-center flex-wrap gap-2">
<h3 className="font-title-lg text-title-lg text-on-surface font-bold">HackQuest 2026</h3>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Ready / Final Review
                      </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Annual 36-hour Flagship Hackathon · Tech Chapter Alliance</p>
</div>
</div>
<div className="flex items-center gap-2 self-end md:self-auto">
<button onClick={() => navigate('/ai-assistant')} className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-[16px] text-secondary">auto_awesome</span>
<span>AI Insights</span>
</button>
<button onClick={() => navigate('/events')} className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-sm text-label-sm font-semibold flex items-center gap-1" type="button">
<span>Open Hub</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-2 text-on-surface-variant font-body-sm text-body-sm">
<div className="flex items-center gap-1.5 bg-surface-container-lowest px-2.5 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-outline text-[16px]">calendar_month</span>
<span>March 28–30, 2026</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container-lowest px-2.5 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-outline text-[16px]">schedule</span>
<span>09:00 AM – 09:00 PM</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container-lowest px-2.5 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-outline text-[16px]">location_on</span>
<span className="truncate">Auditorium &amp; Lab 4</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container-lowest px-2.5 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-outline text-[16px]">groups</span>
<span>24 Assigned Staff</span>
</div>
</div>

<div className="pl-2 flex flex-col gap-1.5">
<div className="flex items-center justify-between text-body-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Milestones Completed (34/40 items)</span>
<div className="flex items-center gap-3 font-code-sm text-code-sm">
<span className="text-on-surface-variant"><strong className="text-on-surface font-semibold">320</strong> / 350 RSVPs</span>
<span className="text-primary font-bold">85% Complete</span>
</div>
</div>
<div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{width: '85%'}}></div>
</div>
</div>
</div>
)}

{['All', 'Workshops'].includes(eventFilter) && (
<div className="relative rounded-xl bg-surface-container-low p-space-md flex flex-col gap-space-sm hover:shadow-md transition-all duration-200">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">smart_toy</span>
</div>
<div>
<div className="flex items-center gap-2">
<h4 className="font-title-md text-title-md text-on-surface font-semibold">AI &amp; Agentic Systems Bootcamp</h4>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">Planning</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Seminar Hall B · Apr 5, 2026 · 02:00 PM – 06:00 PM</p>
</div>
</div>
<div className="flex items-center gap-3">
<div className="text-right">
<span className="font-code-sm text-code-sm font-semibold text-on-surface">45% Pre-Launch</span>
<div className="w-28 h-1.5 rounded-full bg-surface-container-highest mt-1 overflow-hidden">
<div className="h-full bg-secondary-container rounded-full" style={{width: '45%'}}></div>
</div>
</div>
<button className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
)}

{['All', 'Social'].includes(eventFilter) && (
<div className="relative rounded-xl bg-surface-container-low p-space-md flex flex-col gap-space-sm hover:shadow-md transition-all duration-200">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[20px]">handshake</span>
</div>
<div>
<div className="flex items-center gap-2">
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Sponsor &amp; Alumni Networking Dinner</h4>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Pending Venue Approval</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Faculty Club Annex · Apr 12, 2026 · Evening</p>
</div>
</div>
<div className="flex items-center gap-3">
<div className="text-right">
<span className="font-code-sm text-code-sm font-semibold text-on-surface">30% Progress</span>
<div className="w-28 h-1.5 rounded-full bg-surface-container-highest mt-1 overflow-hidden">
<div className="h-full bg-surface-tint rounded-full" style={{width: '30%'}}></div>
</div>
</div>
<button className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
)}
</div>
</section>

<section className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span>Task Execution Matrix</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-normal">Sprint #4</span>
</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Critical milestones slated for pre-hackathon execution</p>
</div>
<button className="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center gap-1" type="button">
<span>View All 19 Tasks</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</button>
</div>

<div className="flex flex-col gap-2">
<div className="w-full h-3 rounded-full bg-surface-container-highest flex overflow-hidden p-0.5 gap-0.5">
<div className="h-full bg-primary rounded-l-full transition-all duration-500" style={{width: '48%'}} title="Completed: 48%"></div>
<div className="h-full bg-secondary-container transition-all duration-500" style={{width: '28%'}} title="In Progress: 28%"></div>
<div className="h-full bg-surface-tint transition-all duration-500" style={{width: '16%'}} title="Pending: 16%"></div>
<div className="h-full bg-error rounded-r-full transition-all duration-500" style={{width: '8%'}} title="Overdue: 8%"></div>
</div>
<div className="flex items-center justify-between text-label-sm font-label-sm flex-wrap gap-2 text-on-surface-variant pt-1">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span>Completed (48%)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
<span>In Progress (28%)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-surface-tint"></span>
<span>Pending (16%)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span>Overdue (8%)</span>
</div>
</div>
</div>

<div className="flex flex-col gap-2 pt-space-xs">

<div className="group flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-3">
<input className="w-4 h-4 rounded text-primary bg-surface-container-lowest focus:ring-0 cursor-pointer" type="checkbox" />
<div className="flex flex-col">
<span className="font-body-md text-body-md text-on-surface font-medium group-hover:text-primary transition-colors">Finalize Food Vendor MoU for 400 attendees</span>
<div className="flex items-center gap-2 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="inline-flex items-center gap-1 text-error font-medium">
<span className="material-symbols-outlined text-[13px]">alarm</span> Due in 4 hrs
                    </span>
<span>·</span>
<span>Assigned: <strong className="text-on-surface">Ananya S.</strong> (Logistics)</span>
</div>
</div>
</div>
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">High Priority</span>
<button className="p-1 rounded text-outline hover:text-on-surface" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>

<div className="group flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-3">
<input className="w-4 h-4 rounded text-primary bg-surface-container-lowest focus:ring-0 cursor-pointer" type="checkbox" />
<div className="flex flex-col">
<span className="font-body-md text-body-md text-on-surface font-medium group-hover:text-primary transition-colors">Test WiFi Subnet in Hall 3 with Campus IT Director</span>
<div className="flex items-center gap-2 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="text-secondary font-medium">Due Tomorrow, 10:00 AM</span>
<span>·</span>
<span>Assigned: <strong className="text-on-surface">Dev Patel</strong> (Infrastructure)</span>
</div>
</div>
</div>
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">Critical</span>
<button className="p-1 rounded text-outline hover:text-on-surface" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>

<div className="group flex items-center justify-between p-3 rounded-lg bg-surface-container-low/60 hover:bg-surface-container transition-colors opacity-80">
<div className="flex items-center gap-3">
<input checked="" className="w-4 h-4 rounded text-primary bg-surface-container-lowest focus:ring-0 cursor-pointer" type="checkbox" />
<div className="flex flex-col">
<span className="font-body-md text-body-md text-on-surface line-through font-medium">Send Badge Printing batch to Student Council Bureau</span>
<div className="flex items-center gap-2 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="text-primary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Completed today
                    </span>
<span>·</span>
<span>Owner: Rahul K. (Ops)</span>
</div>
</div>
</div>
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-surface-container text-outline font-label-sm text-label-sm">Medium</span>
<button className="p-1 rounded text-outline hover:text-on-surface" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
</div>
</section>

<section className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[18px]">radar</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">AI Risk &amp; Anomaly Detection</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Continuous telemetry comparing schedule, room quotas, and facility tickets</p>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
              Live Scanner
            </span>
</div>
<div className="flex flex-col gap-space-sm">

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-start justify-between gap-2">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">report</span>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-semibold">Overcapacity in Lab 4 during Keynote Session</span>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-code-sm text-[11px] font-bold uppercase">Critical</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      RSVPs exceed 250 while Lab 4 holds 180 max. AI suggests allocating live overflow stream to Room 202.
                    </p>
</div>
</div>
<span className="font-code-sm text-code-sm text-outline shrink-0">12m ago</span>
</div>

<div className="mt-2 p-2.5 rounded-lg bg-surface-container-lowest flex items-center justify-between flex-wrap gap-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[18px]">auto_awesome</span>
<span className="font-body-sm text-body-sm text-on-surface"><strong className="font-semibold">AI Recommendation:</strong> Reserve Room 202 &amp; route AV broadcast</span>
</div>
<div className="flex items-center gap-2">
<button className="px-3 py-1 rounded-md bg-secondary text-on-secondary hover:bg-secondary-container transition-colors font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs" type="button">
<span>Apply Mitigation</span>
</button>
<button className="px-2.5 py-1 rounded-md text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm" type="button">
                    Dismiss
                  </button>
</div>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-start justify-between gap-2">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">local_shipping</span>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-semibold">Sponsor Swag Delivery Delayed by 24 Hours</span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-code-sm text-[11px] font-bold uppercase">High</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Shipment tracking indicates warehouse hold. Suggested action: Notify Logistics Lead Aarav to reroute courier via express campus delivery.
                    </p>
</div>
</div>
<span className="font-code-sm text-code-sm text-outline shrink-0">1h ago</span>
</div>
<div className="mt-1 flex items-center justify-end gap-2">
<button onClick={() => navigate('/ai-assistant')} className="px-3 py-1 rounded-md bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm" type="button">
                  Notify Aarav (WhatsApp / SMS)
                </button>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-start justify-between gap-2">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">volume_up</span>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-semibold">Audio Mixer Malfunction in Hall B</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-sm text-[11px] font-bold uppercase">Medium</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Reported by sound engineer during soundcheck. Suggested: Request backup Yamaha amplifier from Media Cell.
                    </p>
</div>
</div>
<span className="font-code-sm text-code-sm text-outline shrink-0">2h ago</span>
</div>
</div>
</div>
</section>
</div>

<div className="xl:col-span-4 flex flex-col gap-space-lg">

<section className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-b from-surface-container-high/60 via-surface-container-lowest to-surface-container-lowest flex flex-col">

<div className="p-space-md bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-on-secondary shadow-xs">
<span className="material-symbols-outlined text-[16px]">auto_awesome</span>
</div>
<span className="font-headline-md text-title-md text-on-surface font-bold">ClubOps AI Radar</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              Live Copilot
            </span>
</div>
<div className="p-space-md flex flex-col gap-space-md">

<div className="relative">
<input className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-xs" placeholder="Ask AI to draft run-of-show, detect conflicts..." type="text" />
<button className="absolute right-2 top-2 p-1 text-primary hover:text-primary-container" type="button">
<span className="material-symbols-outlined text-[20px]">send</span>
</button>
</div>

<div className="flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Quick Automations</span>
<div className="flex flex-wrap gap-1.5">
<button className="px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm text-left transition-colors" type="button">
                  ⚡ Draft run-of-show
                </button>
<button className="px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm text-left transition-colors" type="button">
                  👥 Rebalance volunteer slots
                </button>
<button className="px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm text-left transition-colors" type="button">
                  📝 Exec summary email
                </button>
</div>
</div>

<div className="p-3 rounded-lg bg-secondary-fixed/30 flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">psychology</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-secondary-fixed font-semibold">Core Comm Meeting Digest</span>
<p className="font-body-sm text-body-sm text-on-secondary-fixed-variant mt-0.5 leading-relaxed">
                  Yesterday’s transcript parsed: <strong>6 action items extracted</strong>, 1 volunteer double-booking flagged for Sat 2 PM.
                </p>
</div>
</div>
</div>
</section>

<section className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Today's Agenda</h3>
</div>
<span className="font-code-sm text-code-sm text-outline">Today, 25 Mar</span>
</div>
<div className="relative pl-6 flex flex-col gap-space-md">

<div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container-highest"></div>

<div className="relative flex flex-col gap-0.5">
<div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-bold">11:30 AM</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">In 45 min</span>
</div>
<span className="font-body-md text-body-md text-on-surface font-semibold">Full AV &amp; Lighting Check</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Main Auditorium · With Campus Tech Team</span>
</div>

<div className="relative flex flex-col gap-0.5">
<div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-outline-variant ring-4 ring-surface-container-lowest"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface font-bold">03:00 PM</span>
<span className="font-label-sm text-label-sm text-outline">Dean Office</span>
</div>
<span className="font-body-md text-body-md text-on-surface font-semibold">Dean of Student Affairs Clearance</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Admin Block 304 · Security &amp; Overnight Stays</span>
</div>

<div className="relative flex flex-col gap-0.5">
<div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-surface-container-lowest"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-secondary font-bold">05:30 PM</span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-semibold">Mandatory</span>
</div>
<span className="font-body-md text-body-md text-on-surface font-semibold">All-Hands Volunteer Rehearsal</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Lab 4 · 42 Crew Members &amp; Station Leads</span>
</div>
</div>
</section>

<section className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-[20px]">history</span>
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Operations Feed</h3>
</div>
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
<div className="flex flex-col gap-3">

<div className="flex items-start gap-2.5">
<div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0">
                AS
              </div>
<div className="flex flex-col min-w-0">
<p className="font-body-sm text-body-sm text-on-surface">
<strong className="font-semibold">Ananya S.</strong> finalized guest speaker travel itinerary &amp; hotel confirmation.
                </p>
<span className="font-code-sm text-code-sm text-outline mt-0.5">12m ago</span>
</div>
</div>

<div className="flex items-start gap-2.5">
<div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[16px]">sync_alt</span>
</div>
<div className="flex flex-col min-w-0">
<p className="font-body-sm text-body-sm text-on-surface">
<strong className="font-semibold">Sponsorship Sync</strong>: 4 action items auto-synced to club backlog.
                </p>
<span className="font-code-sm text-code-sm text-outline mt-0.5">45m ago · Via Meeting AI</span>
</div>
</div>

<div className="flex items-start gap-2.5">
<div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[16px]">ac_unit</span>
</div>
<div className="flex flex-col min-w-0">
<p className="font-body-sm text-body-sm text-on-surface">
<strong className="font-semibold">Lab 4 AC cooling deficit</strong> auto-flagged from campus telemetry logs.
                </p>
<span className="font-code-sm text-code-sm text-outline mt-0.5">2h ago</span>
</div>
</div>

<div className="flex items-start gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container-high text-tertiary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[16px]">send</span>
</div>
<div className="flex flex-col min-w-0">
<p className="font-body-sm text-body-sm text-on-surface">
<strong className="font-semibold">Discord #announcements</strong> blast for volunteer briefing queued.
                </p>
<span className="font-code-sm text-code-sm text-outline mt-0.5">3h ago</span>
</div>
</div>

<div className="flex items-start gap-2.5">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0">
                DP
              </div>
<div className="flex flex-col min-w-0">
<p className="font-body-sm text-body-sm text-on-surface">
<strong className="font-semibold">Dev Patel</strong> accepted role as Technical Desk Lead.
                </p>
<span className="font-code-sm text-code-sm text-outline mt-0.5">5h ago</span>
</div>
</div>
</div>
<button className="w-full py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium transition-colors text-center" type="button">
            View Complete Audit Log
          </button>
</section>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">verified</span>
</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-bold">ACM Chapter Standings</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Tier 1 · Compliant &amp; Active</div>
</div>
</div>
<span className="font-code-sm text-code-sm font-bold text-primary">98/100</span>
</div>
</div>
</div>
</div>
</div><Modal open={createOpen} title="Create Event" onClose={() => setCreateOpen(false)} footer={<><button onClick={() => setCreateOpen(false)} className="px-4 py-2 rounded-lg bg-surface-container">Cancel</button><button form="dashboard-event-form" disabled={eventSaving} className="px-4 py-2 rounded-lg bg-primary text-on-primary">{eventSaving ? 'Creating...' : 'Create Event'}</button></>}>
<form id="dashboard-event-form" onSubmit={async (e) => { e.preventDefault(); if (!eventForm.name.trim()) return; setEventSaving(true); try { await createEvent({...eventForm, expected_participants:Number(eventForm.expected_participants)||0}); setCreateOpen(false); navigate('/events'); } catch(err) { alert(err.message); } finally { setEventSaving(false); } }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<label className="sm:col-span-2 text-sm font-medium">Event Name *<input required value={eventForm.name} onChange={e=>setEventForm({...eventForm,name:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label>
<label className="sm:col-span-2 text-sm font-medium">Description<textarea value={eventForm.description} onChange={e=>setEventForm({...eventForm,description:e.target.value})} rows="2" className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label>
<label className="text-sm font-medium">Event Type<input value={eventForm.event_type} onChange={e=>setEventForm({...eventForm,event_type:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label><label className="text-sm font-medium">Venue<input value={eventForm.venue} onChange={e=>setEventForm({...eventForm,venue:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label>
<label className="text-sm font-medium">Start Date<input type="date" value={eventForm.start_date} onChange={e=>setEventForm({...eventForm,start_date:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label><label className="text-sm font-medium">Start Time<input type="time" value={eventForm.start_time} onChange={e=>setEventForm({...eventForm,start_time:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label>
<label className="text-sm font-medium">Expected Participants<input type="number" min="0" value={eventForm.expected_participants} onChange={e=>setEventForm({...eventForm,expected_participants:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label><label className="text-sm font-medium">Owner<input value={eventForm.owner} onChange={e=>setEventForm({...eventForm,owner:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label>
</form></Modal>
</main>
  );
}
