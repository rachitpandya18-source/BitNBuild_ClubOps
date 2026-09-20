import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../services/api';
export default function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
  return <div className="p-8">Loading events...</div>;
}

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  const event = events[0];

  return (
    <main className="relative pt-16 w-full px-space-lg bg-background flex-1"><div className="flex flex-col w-full pb-space-xl">

<section className="relative rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg mb-space-lg overflow-hidden">
<div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
<div className="absolute right-1/3 -bottom-24 w-64 h-64 rounded-full bg-secondary/5 blur-2xl pointer-events-none"></div>
<div className="relative flex flex-col xl:flex-row xl:items-start justify-between gap-space-lg">
<div className="flex flex-col gap-space-sm max-w-3xl">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold tracking-wide uppercase">Flagship Hackathon</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
<span>Active / In 3 Days</span>
</span>
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">Track: National Circuit</span>
</div>
<div className="flex flex-col">
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
  {event?.name || 'Event'}
</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">36-Hour Continuous Innovation Marathon, Hardware Prototyping &amp; Enterprise Demo Pitches</p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md pt-space-xs">
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
<div className="p-2 rounded-lg bg-surface-container-highest text-primary">
<span className="material-symbols-outlined text-[20px]">calendar_today</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Date &amp; Schedule</span>
<span className="font-title-md text-title-md text-on-surface truncate">{event?.date || 'Date not set'}</span>
<span className="font-code-sm text-code-sm text-on-surface-variant">09:00 AM • 36h Sprint</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
<div className="p-2 rounded-lg bg-surface-container-highest text-primary">
<span className="material-symbols-outlined text-[20px]">pin_drop</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Venue Anchor</span>
<span className="font-title-md text-title-md text-on-surface truncate">{event?.venue || 'Venue not set'}</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">&amp; Computer Lab 4</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
<div className="p-2 rounded-lg bg-surface-container-highest text-primary">
<span className="material-symbols-outlined text-[20px]">how_to_reg</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Registrations</span>
<span className="font-code-sm text-code-sm text-primary font-semibold">97%</span>
</div>
<span className="font-title-md text-title-md text-on-surface">342 / 350 Hackers</span>
<div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-1 overflow-hidden">
<div className="bg-primary h-1.5 rounded-full" style={{width: '97.7%'}}></div>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
<div className="p-2 rounded-lg bg-surface-container-highest text-secondary">
<span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Readiness</span>
<span className="font-code-sm text-code-sm text-secondary font-semibold">88%</span>
</div>
<span className="font-title-md text-title-md text-on-surface">Ops Pre-Flight</span>
<div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-1 overflow-hidden">
<div className="bg-secondary h-1.5 rounded-full" style={{width: '88%'}}></div>
</div>
</div>
</div>
</div>
</div>

<div className="flex flex-col sm:flex-row xl:flex-col gap-space-xs shrink-0 self-start w-full xl:w-auto">
<button onClick={() => navigate("/ai")} className="flex items-center justify-center gap-space-xs px-space-md py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md text-label-md shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-[18px]">auto_awesome</span>
<span>AI Event Copilot</span>
</button>
<div className="grid grid-cols-2 sm:flex xl:grid xl:grid-cols-2 gap-space-xs">
<button onClick={() => navigate("/tasks")} className="flex items-center justify-center gap-space-xs px-space-sm py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">
<span className="material-symbols-outlined text-[18px] text-outline">picture_as_pdf</span>
<span>Run-of-Show</span>
</button>
<button onClick={() => navigate("/announcements")} className="flex items-center justify-center gap-space-xs px-space-sm py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">
<span className="material-symbols-outlined text-[18px] text-error">campaign</span>
<span>Broadcast</span>
</button>
</div>
<button onClick={() => navigate("/events")} className="flex items-center justify-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
<span>Edit Event Spec</span>
</button>
</div>
</div>
</section>

<div className="flex items-center overflow-x-auto gap-space-xs pb-space-sm mb-space-md select-none">
<button onClick={() => navigate("/tasks")} className="px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm flex items-center gap-2 shrink-0" type="button">
<span className="material-symbols-outlined text-[18px]">space_dashboard</span>
<span>Overview &amp; Tasks</span>
</button>
<button onClick={() => navigate("/volunteers")} className="px-space-md py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-2 shrink-0 transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">group</span>
<span>Volunteers &amp; Roles</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-code-sm text-code-sm">24</span>
</button>
<button onClick={() => navigate("/risks")} className="px-space-md py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-2 shrink-0 transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px] text-error">warning</span>
<span>Operational Risks</span>
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-code-sm text-code-sm">3</span>
</button>
<button onClick={() => navigate("/meetings")} className="px-space-md py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-2 shrink-0 transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">description</span>
<span>Minutes &amp; Meetings</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-code-sm text-code-sm">2</span>
</button>
<button onClick={() => navigate("/announcements")} className="px-space-md py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-2 shrink-0 transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">podcasts</span>
<span>Live Announcements</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-code-sm text-code-sm">4</span>
</button>
<button onClick={() => navigate('/ai-assistant')} className="px-space-md py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-secondary font-label-md text-label-md flex items-center gap-2 shrink-0 transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">psychology</span>
<span>AI Insights</span>
</button>
</div>

<div className="flex flex-col gap-space-lg">

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-sm relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Budget Allocated</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-sm text-code-sm">96% Burn</span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">$4,800</span>
<span className="font-body-sm text-body-sm text-outline">/ $5,000 max</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
<div className="bg-primary h-2 rounded-full" style={{width: '96%'}}></div>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Buffer Remaining</span>
<span className="font-semibold text-on-surface">$200 contingency</span>
</div>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Industry Mentors</span>
<span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-code-sm text-code-sm">90% Staffed</span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">18 Confirmed</span>
<span className="font-body-sm text-body-sm text-outline">/ 20 Target</span>
</div>
<div className="flex items-center -space-x-2 overflow-hidden py-0.5">
<img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Portrait photo of a young female software engineer smiling, tech conference attire, clean studio light, soft purple background gradient" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9CUxuH0LjOXaw8gWMFed0whvWInpEl1gGTxTvI1C9xw6SZjf3jaZYb8lANisePjwOi7WsSuALeTKjyrPjhL4DqFApcXiUaTyOjzgRznc_M-lv5oInh0Xupw10O9u3pbaQ_a9UCOvGiOJx6ybOLc2LKqCkan2yfhznPLc55Vc5nbNrcuWLKvGA0vsU5y4UIJLyfc-stSeOifdV4ezjn9Ik-bu6N3MXfNmRD9tX81M"  />
<img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Portrait photo of a male AI researcher with glasses, collegiate modern tech meetup backdrop, natural office light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjY7wsPi9PQB4oklETv2pw3Yj-YC66VSJ6kxhj6fZa-Nl8Z8PG71RvmYcUA7EJ_-yOd6jw1nZfx_SFSTlSlW_74TDWS_-gGsVLnAJY7mFQf3zjL1hMK_grwUjWzmgfxqPBIK1ERd-uV9KoabRL0uWeCrlfBzDnULihtnrrauhEDMs1mXjQSJfSKGMnQ_r-LPGiF7rhTR2oXjpchuJDCadS2UdvK9CV1c-vVnd2gxo"  />
<img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Portrait of an energetic product design mentor with short dark hair, corporate casual, bright neutral lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRK7-9LxhQUXo0KjGAqU3h3YzQHor_8puVBfP6igfc0ILyidh9jWSqvjoaF38lBbYbJjLJuCoUCnbXikEnXf3CjnG2aVEQKEMCecFDVjY3XCYJgcShjim3MFaDT3rNe4x-RHeEi_fnHG2LD5_UNUV7Cy57_Co83RwPXTE5iMpnqzho9q5k3CdGy9L-_7tQY2WSFRxXKfcE8qzffo2NfjTUAm--vIEUGSrBbpCZ4ic"  />
<img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Portrait of a senior developer advocate mentor in navy hoodie, tech hackathon atmosphere, soft focus background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw6thDVBPrt3w8TiIVWRSo-z0QIy359layTjjDG9YIzvMHFyv7R8ufaFivgEmWasXwUn8z1JZTNFguLRNIzc5nzV0gTXxiC8SWYNLZDlHtpAxmrriVihpPSFPsaU8hQlBErLW27AsEhAKbGi8tBriGZf1-9EI-0WV3EsHQO0B1gxJ76jj5XcsM3bCTaTpsr-o0GSyPULSo-pZUKnj508tFapAbZiFqMxjgTJFzFrc"  />
<div className="flex items-center justify-center h-7 w-7 rounded-full bg-surface-container text-on-surface font-code-sm text-code-sm shadow-sm font-semibold">+14</div>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Pending Confirmations</span>
<span className="text-secondary font-semibold">2 Cloud Architects</span>
</div>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Hardware Fleet</span>
<span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-code-sm text-code-sm">Lab 4 Secured</span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">45 IoT Kits</span>
<span className="font-body-sm text-body-sm text-outline">Checked In</span>
</div>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px] text-primary">memory</span>
<span>ESP32, Raspberry Pi 5 &amp; Sensor Packs</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Barcode Audit</span>
<span className="font-semibold text-on-surface">100% Tagged</span>
</div>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Catering Headcount</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-sm text-code-sm">6 Shifts</span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">380 Meals</span>
<span className="font-body-sm text-body-sm text-outline">/ session</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px] text-primary">restaurant</span>
<span>Includes 48 Vegan &amp; 14 Gluten-Free</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Midnight Drop</span>
<span className="font-semibold text-primary">Campus Pizza Co. PO #89</span>
</div>
</div>
</div>

<div className="rounded-2xl bg-gradient-to-r from-surface-container-highest via-surface-container to-secondary-fixed/50 p-space-md shadow-sm relative overflow-hidden">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="p-2.5 rounded-xl bg-secondary text-on-secondary shadow-sm shrink-0">
<span className="material-symbols-outlined text-[24px]">auto_awesome</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs mb-1">
<span className="font-title-md text-title-md text-on-surface">ClubOps AI Event Advisory</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">High Impact Pattern</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              Based on last year's HackQuest, check-in queue peaks between <strong className="text-on-surface font-semibold">08:30 AM and 09:15 AM</strong>. Recommend opening <strong className="text-primary font-semibold">4 separate QR check-in lanes</strong> to prevent auditorium lobby congestion and network throttle.
            </p>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0 self-start md:self-center">
<button onClick={() => navigate('/events')} className="px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-bright text-primary font-label-md text-label-md shadow-sm transition-all" type="button">
            Apply Station Plan
          </button>
<button className="p-2 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Dismiss advice" type="button">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<section className="lg:col-span-7 flex flex-col gap-space-md">
<div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">Active Operation Tasks</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Execution critical path leading up to kickoff</p>
</div>

<div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl" id="taskFilters">
<button className="px-3 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-xs" data-filter="all" type="button">
                All (16)
              </button>
<button className="px-3 py-1 rounded-lg text-outline hover:text-on-surface font-label-sm text-label-sm transition-colors" data-filter="critical" type="button">
                Critical Path (4)
              </button>
<button className="px-3 py-1 rounded-lg text-outline hover:text-on-surface font-label-sm text-label-sm transition-colors" data-filter="completed" type="button">
                Completed (12)
              </button>
</div>
</div>

<div className="flex flex-col gap-space-xs" id="taskContainer">

<div className="group flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all">
<input checked="" className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
<div className="flex-1 min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface font-medium line-through opacity-70">Main Stage AV &amp; Projector Rigging</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">Stage Crew</span>
</div>
<div className="flex items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm mt-1">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                    Done Yesterday
                  </span>
<span>Lead: Aryan Shah</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">Ready</span>
</div>

<div className="group flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-xs hover:bg-surface-container-low transition-all">
<input className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
<div className="flex-1 min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface font-semibold">WiFi Dedicated SSID Provisioning</span>
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">flag</span> Critical Path
                  </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Need 500 simultaneous IPs with subnet isolation in Lab 4 and Auditorium.</p>
<div className="flex items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm mt-2">
<span className="flex items-center gap-1 text-error font-medium">
<span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                    Today, 04:00 PM
                  </span>
<div className="flex items-center gap-1.5">
<img className="w-5 h-5 rounded-full object-cover" data-alt="Close up face of an Asian male university student with headphones in computer science lab" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT7TIDVgMH1_xGw51B6whU5YQfKF-RpqLZw6BpovRP1L_2Kb8wG6wsKS23i9x73Teenpt7L-WXiAViCXPAxAxK-ahItv1lGsol1HRqxQFe4pn61Ov4TT-WoS4xAWPuEEg85bnF2VYXtSMo-mzMxTvBDAm8yEHvEa1WJo20j7VkjOvSejD0sOuzniNbCUDZzXPAgo2rAKmUTbZI-oAMy4cPgkdqVes-mY8DOLZPH_U"  />
<span>Dev Patel (IT Admin)</span>
</div>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">In Progress</span>
</div>

<div className="group flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-xs hover:bg-surface-container-low transition-all">
<input className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
<div className="flex-1 min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface font-semibold">Midnight Energy Drink &amp; Pizza Delivery Confirmed</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">Logistics</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Red Bull student ambassador drop arranged; pizza PO signed for 12:30 AM arrival.</p>
<div className="flex items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm mt-2">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-outline">event</span>
                    Mar 27, 18:00
                  </span>
<div className="flex items-center gap-1.5">
<img className="w-5 h-5 rounded-full object-cover" data-alt="Portrait photo of a young South Asian woman student organizer wearing black university lanyard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkicAXlTd8O_qlBIpNW8CRYiY7AkCQJ5brUE46_cZM9TdgVAMCdGq2ZHjafxhF2oK0Pw-enos0lfBeYwXwO8TLjyWLf3nUcvKORlG4ftY9h0Ifj7VBIFnJAS4KeYSE93V2atc0Dx8_nGkNsA-wh-QYtCKuuVi3le6Q69gb6ZbZfzSU9E5J8Evs0BDDNWU4FU2GJU0rQWJwP5TArmpgUYsCOOeu4gwAGeYEQMnZbDI"  />
<span>Sneha M.</span>
</div>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Awaiting Call</span>
</div>

<div className="group flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-xs hover:bg-surface-container-low transition-all">
<input checked="" className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
<div className="flex-1 min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface font-medium line-through opacity-70">Mentor Welcome Kits Distributed</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">Hospitality</span>
</div>
<div className="flex items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm mt-1">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-outline">done_all</span>
                    18 of 20 Delivered
                  </span>
<span>Ananya S.</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">Completed</span>
</div>
</div>
<button className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>Append New Critical Task</span>
</button>
</div>

<div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-error text-[22px]">warning</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">Embedded Risk Watchlist</h2>
</div>
<span className="font-label-sm text-label-sm text-error font-semibold">2 Active Alerts</span>
</div>
<div className="grid grid-cols-1 gap-space-sm">
<div className="p-space-md rounded-xl bg-error-container/40 flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-error-container font-semibold">Lab 4 High-Power Circuit Overload</span>
<span className="px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-semibold">High Severity</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                45 IoT test benches + soldering stations exceed circuit breaker limit of 32A. Campus facility electrician requested for auxiliary junction box distribution.
              </p>
<div className="flex items-center justify-between pt-1">
<span className="font-code-sm text-code-sm text-on-error-container font-medium">Mitigation: Auxiliary 60A breaker deployed by 2 PM</span>
<span className="font-label-sm text-label-sm text-outline">Owner: Facilities Desk</span>
</div>
</div>
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">WiFi SSID Concurrency Limit</span>
<span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">Medium</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Access point controller roaming test in Auditorium could drop packets during live demo pitch stream.
              </p>
<div className="flex items-center justify-between pt-1">
<span className="font-code-sm text-code-sm text-primary font-medium">Mitigation: Stress test scheduled at 4:00 PM today</span>
<span className="font-label-sm text-label-sm text-outline">Owner: Dev Patel</span>
</div>
</div>
</div>
</div>
</section>

<section className="lg:col-span-5 flex flex-col gap-space-lg">
<div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">Volunteer Dispatch</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Active shifts &amp; field commanders</p>
</div>
<button className="px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">swap_horiz</span>
<span>Reassign</span>
</button>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold">Shift 1: Morning Check-in</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">Confirmed</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Auditorium North Lobby &amp; Badge Desks</span>
<span className="font-code-sm text-code-sm text-on-surface font-medium">07:30 - 14:00</span>
</div>
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-2">
<img className="w-6 h-6 rounded-full object-cover" data-alt="Portrait photo of Sneha, female student organizer with glasses smiling, wearing HackQuest staff t-shirt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgrkr_8Ua3dJn8Uco5TcmXxEyIRuwVjcCvg1A2l3U9s_xgdXWmpw1qHQsa8ySfkNJhf3u-ROuwFbKWOOXKZa88xwmfsA_Jsc--7dKggKD1YTrMDfnHf43DE7GvosRKHruikG3GKDZfi2ebtVhtmSRw1QAY1CQYlr1j7LTAfFJqpmN5oehXve-AhESpgxG6WTQVl1smXGlYSvYLU-6hKthIfK-fy6CGeNj9AZRzZfY"  />
<span className="font-label-md text-label-md text-on-surface font-semibold">Lead: Sneha M.</span>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-sm text-code-sm">8 Members Active</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold">Shift 2: Hardware Lab &amp; Tech</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Briefing Today</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Computer Lab 4 Bench Racks</span>
<span className="font-code-sm text-code-sm text-on-surface font-medium">13:30 - 20:30</span>
</div>
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-2">
<img className="w-6 h-6 rounded-full object-cover" data-alt="Portrait photo of Dev Patel, young male IT lead with short dark hair in high tech computer lab setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK6nybjvcu3DrLSLLt1uZDr3uO_aDWRFoNdiaMrSGOLx3b5P-F8ErgkN36OHREAA4fUrXRlHTe8VFQZfEHOwJ2SqJP2-84SpJlDSHz3w4XthwcbeJrb0lraJJxKPpvUIHzDR-OcFU9u6aJ3zQhbIWRKjdNdNF0fzbzHKgfvbtXWpJYbqp5VARh9hUPZFcWWdCkKe4SV7xwg3VGJFYicSJ4dHf3fq4DKj8vx5K1CGM"  />
<span className="font-label-md text-label-md text-on-surface font-semibold">Lead: Dev Patel</span>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-sm text-code-sm">6 Members Active</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-surface-tint"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold">Shift 3: Overnight &amp; First Aid</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">Clearances Done</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Rest Lounge, Pantry &amp; Medical Bay</span>
<span className="font-code-sm text-code-sm text-on-surface font-medium">20:00 - 08:00</span>
</div>
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-2">
<img className="w-6 h-6 rounded-full object-cover" data-alt="Portrait photo of Ananya, collegiate medical volunteer lead with confident warm expression in campus center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQyUntW1dgsAMNgHBB4qy-_AplCW2_AxxlXHtbcHKi0gPV5bVlBEB-arqvgdD6ICnFwT2ZTprwls-JJyCy-4iLWYQsLQYN3FDDCNrSFAwTPlKLLa4bfulsWtJy0CN1CW2uQ5gPTR6J_puOAcR_Eu4CW6CvERqm_H33rDrQSqhAWGKuXaDKdiaxK57Jtb7vfmbWiKHkqJnL17FyywbIq5n0W74FmZzid6q0ykmcwwc"  />
<span className="font-label-md text-label-md text-on-surface font-semibold">Lead: Ananya S.</span>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-sm text-code-sm">10 Members Active</span>
</div>
</div>
</div>

<div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Auditorium Spatial Layout</h3>
<span className="font-label-sm text-label-sm text-primary font-semibold">Building 2 • Ground Floor</span>
</div>
<div className="w-full h-48 rounded-xl bg-cover bg-center overflow-hidden relative" data-location="Stanford Memorial Auditorium, Stanford, CA" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaOXzcoUtGTytzMcHI0B0BrzD2uQ_unrZCg8D3q8wUngNCzx4hBRmZGZhFgRb7lMifLIcusmErkVTaL9E7kn002MjIymJy4OpC4MjvA2Hu5MKxB68olHWeQH5i5PzolxRsp8SVBanLkOdlkgmlKo-8_7jg_eJfUd1WJuYIYEmgKOf-uzY6em5djOws6BHNHcJVjETXf_bSCGSFPG0-ta1PCutaJpwSllxQOeIRHGA')"}}>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-space-md">
<div className="flex items-center justify-between w-full text-inverse-on-surface">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold">350 Seats Configured</span>
<span className="font-body-sm text-body-sm opacity-80">4 Emergency Exits Clear</span>
</div>
<button className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-lowest transition-colors" type="button">
                  View Map Spec
                </button>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</div>
</main>
  );
}
