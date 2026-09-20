import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../components/Modal';

const seedMeetings = [
  { id: 1, title: 'Core Committee Sync', date: 'Sep 22, 2026', time: '5:00 PM', attendees: 8, organizer: 'Rudresh Joshi', status: 'Scheduled', notes: 'Review venue, volunteers and event readiness.' },
  { id: 2, title: 'HackQuest Planning Meeting', date: 'Sep 20, 2026', time: '4:00 PM', attendees: 6, organizer: 'Sneha M.', status: 'Completed', notes: 'Discussed registrations, mentors and technical setup.' },
  { id: 3, title: 'Volunteer Coordination', date: 'Sep 18, 2026', time: '6:30 PM', attendees: 10, organizer: 'Dev Patel', status: 'Completed', notes: 'Assigned registration and overnight coverage.' },
];

export default function Meetings() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [meetings, setMeetings] = useState(seedMeetings);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', time: '', attendees: '', notes: '' });

  const openNew = () => { setSelected(null); setForm({ title: '', date: '', time: '', attendees: '', notes: '' }); setModal('edit'); };
  const openEdit = (m) => { setSelected(m); setForm({ title: m.title, date: m.date, time: m.time, attendees: m.attendees, notes: m.notes }); setModal('edit'); };
  const save = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (selected) setMeetings((items) => items.map((m) => m.id === selected.id ? { ...m, ...form, attendees: Number(form.attendees) || 0 } : m));
    else setMeetings((items) => [{ id: Date.now(), ...form, attendees: Number(form.attendees) || 0, organizer: 'Rudresh Joshi', status: 'Scheduled' }, ...items]);
    setModal(null);
  };

  const analyze = (meeting) => {
    const params = new URLSearchParams({ tab: 'meetings', notes: meeting.notes || '', meeting: meeting.title });
    navigate(`/ai?${params.toString()}`);
  };

  const content = useMemo(() => meetings, [meetings]);
  return (
    <div className="flex flex-col gap-space-lg w-full max-w-6xl mx-auto pb-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div><h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Meetings & Minutes</h1><p className="font-body-md text-on-surface-variant mt-1">Capture decisions, action items and follow-ups.</p></div>
        <div className="flex gap-2"><button onClick={openNew} className="px-space-md py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm border border-outline-variant/30">+ Schedule Meeting</button><button onClick={() => navigate('/ai?tab=meetings')} className="flex items-center gap-2 px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md hover:bg-primary-container transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">auto_awesome</span>Analyze with AI</button></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        {[[content.filter(m => m.status === 'Scheduled').length,'Upcoming Meetings'],[content.length,'Meetings This Week'],['18','Action Items Extracted'],['4','Pending Follow-ups']].map(([v,l],i)=><div key={l} className={`p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center justify-center text-center ${i===2?'bg-secondary-container text-on-secondary-container':i===3?'bg-error-container text-on-error-container':'bg-surface-container-lowest'}`}><div className="font-headline-lg font-bold">{v}</div><div className="font-title-sm font-semibold mt-1">{l}</div></div>)}
      </div>
      <div className="flex flex-col gap-space-sm"><h2 className="font-title-lg text-title-lg text-on-surface font-semibold">Meeting Roster</h2>
        {content.map((m)=><div key={m.id} className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1"><h3 className="font-title-md text-on-surface font-semibold">{m.title}</h3><div className="flex flex-wrap gap-3 text-on-surface-variant font-body-sm mt-1"><span>◷ {m.date} at {m.time}</span><span>♟ {m.attendees} attendees</span><span>♙ {m.organizer}</span></div></div>
          <span className={`px-3 py-1.5 rounded-lg text-sm ${m.status==='Scheduled'?'bg-primary-container text-on-primary-container':'bg-surface-container text-on-surface-variant'}`}>{m.status}</span>
          <div className="flex flex-wrap gap-2"><button onClick={() => setModal('view')} className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface">View Minutes</button><button onClick={() => openEdit(m)} className="px-3 py-1.5 rounded-lg border border-outline text-on-surface">Reschedule</button><button onClick={() => analyze(m)} className="px-3 py-1.5 rounded-lg text-secondary hover:bg-secondary-container/20 flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">auto_awesome</span>Analyze with AI</button></div>
        </div>)}
      </div>
      <Modal open={modal === 'edit'} title={selected ? 'Reschedule Meeting' : 'Schedule Meeting'} onClose={() => setModal(null)} footer={<><button onClick={() => setModal(null)} className="px-4 py-2 rounded-lg bg-surface-container">Cancel</button><button form="meeting-form" className="px-4 py-2 rounded-lg bg-primary text-on-primary">{selected ? 'Save Changes' : 'Schedule'}</button></>}>
        <form id="meeting-form" onSubmit={save} className="space-y-4"><label className="block text-sm font-medium">Meeting Title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5 bg-transparent" required /></label><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">Date<input value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label><label className="text-sm font-medium">Time<input value={form.time} onChange={e=>setForm({...form,time:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label></div><label className="block text-sm font-medium">Attendees<input type="number" min="0" value={form.attendees} onChange={e=>setForm({...form,attendees:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label><label className="block text-sm font-medium">Meeting Notes<textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows="5" className="mt-1 w-full rounded-lg border border-outline-variant p-2.5" /></label></form>
      </Modal>
      <Modal open={modal === 'view'} title="Meeting Minutes" onClose={() => setModal(null)} footer={<button onClick={() => setModal(null)} className="px-4 py-2 rounded-lg bg-primary text-on-primary">Close</button>}><p className="text-on-surface-variant">Select a meeting's notes from the roster to review them. Meeting minutes are currently handled in frontend state.</p></Modal>
    </div>
  );
}
