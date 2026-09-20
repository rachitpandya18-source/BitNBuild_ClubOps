import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { createTask, getTasks } from '../services/api';
export default function Tasks() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [taskSaving, setTaskSaving] = useState(false);
  const [taskForm, setTaskForm] = useState({event_id:'1',title:'',description:'',owner:'',deadline:'',priority:'medium',status:'pending'});

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState('');

  useEffect(() => {
  getTasks(1)
    .then((data) => {
      setTasks(data);
      console.log('Backend tasks:', data);
    })
    .catch((err) => {
      setTasksError(err.message);
      console.error('Failed to load tasks:', err);
    })
    .finally(() => {
      setTasksLoading(false);
    });
}, []);
  return (
    <main className="relative pt-16 w-full px-space-lg bg-background flex-1"><div className="flex flex-col w-full pb-space-xl">

<div className="relative w-full">
<div className="absolute -top-12 left-1/4 w-96 h-32 bg-primary/10 blur-3xl pointer-events-none rounded-full"></div>
<div className="absolute -top-12 right-1/3 w-80 h-28 bg-secondary/10 blur-3xl pointer-events-none rounded-full"></div>
</div>

<div className="flex flex-col gap-space-md pt-space-md mb-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div>
<div className="flex items-center gap-space-xs mb-1">
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">Sprint Execution Track</span>
<span className="text-outline font-label-sm text-label-sm">•</span>
<span className="text-outline font-code-sm text-code-sm">CYCLE 04 / 2026</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Club Operations Tasks</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-0.5">
          Centralized execution pipeline across all active club events, committees, and sponsorships.
        </p>
</div>
<div className="flex items-center gap-space-sm flex-wrap self-start md:self-auto">

<div className="flex items-center p-1 rounded-xl bg-surface-container shadow-sm">
<button onClick={() => setViewMode('table')} className={`flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg font-label-md text-label-md shadow-sm transition-all ${viewMode==='table' ? 'bg-surface-container-lowest text-primary' : 'text-on-surface-variant'}`} id="viewBtnTable">
<span className="material-symbols-outlined text-[18px]">table_rows</span>
<span>Table View</span>
</button>
<button onClick={() => setViewMode('kanban')} className={`flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg font-label-md text-label-md transition-all ${viewMode==='kanban' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'}`} id="viewBtnKanban">
<span className="material-symbols-outlined text-[18px]">view_kanban</span>
<span>Kanban</span>
</button>
</div>
<button onClick={() => setNewTaskOpen(true)} className="flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary-container transition-all" id="openNewTaskModal">
<span className="material-symbols-outlined text-[20px]">add_task</span>
<span>New Task</span>
</button>
</div>
</div>

<div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm p-space-sm rounded-2xl bg-surface-container-lowest shadow-sm">
<div className="flex flex-1 items-center gap-space-sm px-space-sm py-1.5 rounded-xl bg-surface-container-low">
<span className="material-symbols-outlined text-outline text-[20px]">search</span>
<input className="w-full bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline" id="taskSearchInput" placeholder="Search tasks, tags, or assignees..." type="text" />
<span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface-container-high font-code-sm text-code-sm text-outline">⌘/</span>
</div>
<div className="flex items-center gap-space-xs overflow-x-auto pb-1 lg:pb-0">

<div className="relative">
<select className="appearance-none bg-surface-container-low hover:bg-surface-container px-space-sm py-2 pr-8 rounded-xl font-label-md text-label-md text-on-surface cursor-pointer outline-none" id="eventFilterSelect">
<option value="all">All Events</option>
<option value="hackquest">HackQuest '26</option>
<option value="bootcamp">AI Bootcamp</option>
<option value="techsummit">Spring General</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2 top-2.5 text-outline text-[16px]">expand_more</span>
</div>

<div className="relative">
<select className="appearance-none bg-surface-container-low hover:bg-surface-container px-space-sm py-2 pr-8 rounded-xl font-label-md text-label-md text-on-surface cursor-pointer outline-none" id="priorityFilterSelect">
<option value="all">All Priorities</option>
<option value="critical">Critical</option>
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low">Low</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2 top-2.5 text-outline text-[16px]">expand_more</span>
</div>

<div className="hidden xl:flex items-center gap-1 pl-1">
<button className="px-2.5 py-1.5 rounded-xl bg-surface-container-highest text-primary font-label-sm text-label-sm">All</button>
<button className="px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm transition-colors">Tech</button>
<button className="px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm transition-colors">Logistics</button>
<button className="px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm transition-colors">Sponsorship</button>
</div>
<button className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors" title="Refresh Tasks">
<span className="material-symbols-outlined text-[18px]">refresh</span>
</button>
</div>
</div>
</div>
{viewMode === 'kanban' && <div id="task-kanban-preview" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-space-lg">{[['Pending',['Arrange certificates','Confirm venue']],['In Progress',['Deploy Judge Scoring Portal','Prepare event banners']],['Completed',['Volunteer briefing']]].map(([status,items])=><div key={status} className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/30"><h3 className="font-title-md font-semibold mb-3">{status}</h3><div className="space-y-2">{items.map(x=><div key={x} className="p-3 rounded-xl bg-surface-container-low text-sm">{x}</div>)}</div></div>)}</div>}

<div className="grid grid-cols-2 md:grid-cols-5 gap-space-sm mb-space-lg">

<div className="col-span-1 p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Total Tasks</span>
<span className="p-1.5 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[18px]">checklist</span>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-xl text-headline-xl text-on-surface">48</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">operational</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{width: '100%'}}></div>
</div>
</div>

<div className="col-span-1 p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">In Progress</span>
<span className="p-1.5 rounded-lg bg-secondary-fixed text-secondary material-symbols-outlined text-[18px]">pending_actions</span>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-xl text-headline-xl text-on-surface">14</span>
<span className="px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">3 High</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{width: '29%'}}></div>
</div>
</div>

<div className="col-span-1 p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Pending Review</span>
<span className="p-1.5 rounded-lg bg-surface-container-high text-on-surface-variant material-symbols-outlined text-[18px]">rule</span>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-xl text-headline-xl text-on-surface">8</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">awaiting leads</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{width: '16%'}}></div>
</div>
</div>

<div className="col-span-1 p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Completed</span>
<span className="p-1.5 rounded-lg bg-surface-container-highest text-primary material-symbols-outlined text-[18px]">task_alt</span>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-xl text-headline-xl text-on-surface">22</span>
<span className="font-label-sm text-label-sm text-primary font-medium">45.8% rate</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{width: '46%'}}></div>
</div>
</div>

<div className="col-span-2 md:col-span-1 p-space-md rounded-2xl bg-error-container text-on-error-container shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-error font-semibold tracking-wider uppercase">Overdue</span>
<span className="p-1.5 rounded-lg bg-surface-container-lowest text-error material-symbols-outlined text-[18px]">warning</span>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-xl text-headline-xl text-error font-bold">4</span>
<span className="font-label-sm text-label-sm text-error font-medium">immediate follow-up</span>
</div>
<div className="w-full bg-surface-container-lowest/60 h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-error h-full rounded-full" style={{width: '75%'}}></div>
</div>
</div>
</div>

<div className="flex flex-col gap-space-lg">

<div className="w-full rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col" id="tableViewContainer">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider select-none">
<th className="py-3 px-space-md w-8">
<input className="rounded accent-primary cursor-pointer w-4 h-4" id="selectAllCheckbox" type="checkbox" />
</th>
<th className="py-3 px-space-md font-semibold">Task Name &amp; Scope</th>
<th className="py-3 px-space-md font-semibold">Event Scope</th>
<th className="py-3 px-space-md font-semibold">Assignee &amp; Dept</th>
<th className="py-3 px-space-md font-semibold">Due Window</th>
<th className="py-3 px-space-md font-semibold">Priority</th>
<th className="py-3 px-space-md font-semibold">Status</th>
<th className="py-3 px-space-md text-right font-semibold">Actions</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface font-body-sm text-body-sm" id="taskTableBody">

    {tasksLoading && (
    <tr>
      <td colSpan="8" className="p-8 text-center">
        Loading tasks...
      </td>
    </tr>
  )}

  {tasksError && (
    <tr>
      <td colSpan="8" className="p-8 text-center text-red-500">
        Error: {tasksError}
      </td>
    </tr>
  )}

  {!tasksLoading && !tasksError && tasks.length === 0 && (
    <tr>
      <td colSpan="8" className="p-8 text-center">
        No tasks found.
      </td>
    </tr>
  )}

<tr className="group hover:bg-surface-container-low transition-colors duration-150">
<td className="py-3.5 px-space-md">
<input className="task-checkbox rounded accent-primary cursor-pointer w-4 h-4" type="checkbox" />
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col max-w-md">
<div className="flex items-center gap-space-xs">
<span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                      Finalize University Auditorium Sound &amp; Lighting Contract
                    </span>
</div>
<div className="flex items-center gap-space-sm text-outline font-label-sm text-label-sm mt-1">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">checklist</span> 3/4 subtasks
                    </span>
<span>•</span>
<span className="text-on-surface-variant font-code-sm text-code-sm">#HQ-OPS-109</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  HackQuest '26
                </span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">AS</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-medium">Ananya Sharma</span>
<span className="font-label-sm text-label-sm text-outline">Logistics Lead</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-error font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">alarm</span> Today, 5:00 PM
                  </span>
<span className="text-outline font-label-sm text-label-sm">In 3 hours</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[13px]">emergency</span> CRITICAL
                </span>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span> In Progress
                </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                    Mark Done
                  </button>
<button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary-fixed hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-sm text-label-sm transition-colors" title="AI Task Assist">
<span className="material-symbols-outlined text-[15px]">auto_awesome</span>
<span>Assist</span>
</button>
</div>
</td>
</tr>

<tr className="group hover:bg-surface-container-low transition-colors duration-150 bg-surface-container-lowest">
<td className="py-3.5 px-space-md">
<input className="task-checkbox rounded accent-primary cursor-pointer w-4 h-4" type="checkbox" />
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col max-w-md">
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                    Deploy Judge Scoring Portal &amp; API Keys
                  </span>
<div className="flex items-center gap-space-sm text-outline font-label-sm text-label-sm mt-1">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">checklist</span> 5/6 subtasks
                    </span>
<span>•</span>
<span className="text-on-surface-variant font-code-sm text-code-sm">#HQ-DEV-084</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  HackQuest '26
                </span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-surface-tint text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">DP</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-medium">Dev Patel</span>
<span className="font-label-sm text-label-sm text-outline">Tech Lead</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-medium">Tomorrow, 11:00 AM</span>
<span className="text-outline font-label-sm text-label-sm">In 18 hours</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[13px]">priority_high</span> HIGH
                </span>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span> In Progress
                </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                    Mark Done
                  </button>
<button className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Quick Menu">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="group hover:bg-surface-container-low transition-colors duration-150">
<td className="py-3.5 px-space-md">
<input className="task-checkbox rounded accent-primary cursor-pointer w-4 h-4" type="checkbox" />
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col max-w-md">
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                    Confirm Microsoft &amp; RedBull Swag Box Delivery
                  </span>
<div className="flex items-center gap-space-sm text-outline font-label-sm text-label-sm mt-1">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">checklist</span> 1/2 subtasks
                    </span>
<span>•</span>
<span className="text-on-surface-variant font-code-sm text-code-sm">#HQ-SPON-042</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  HackQuest '26
                </span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold">SR</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-medium">Sneha Roy</span>
<span className="font-label-sm text-label-sm text-outline">Sponsorship</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-medium">March 27, 2026</span>
<span className="text-outline font-label-sm text-label-sm">In 2 days</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[13px]">priority_high</span> HIGH
                </span>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-outline"></span> Pending
                </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-surface-container text-primary font-label-sm text-label-sm transition-colors">
<span className="material-symbols-outlined text-[15px]">local_shipping</span>
<span>Track Courier</span>
</button>
<button className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Quick Menu">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="group hover:bg-surface-container-low transition-colors duration-150">
<td className="py-3.5 px-space-md">
<input className="task-checkbox rounded accent-primary cursor-pointer w-4 h-4" type="checkbox" />
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col max-w-md">
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                    Submit Faculty Advisor Budget Reimbursement Form
                  </span>
<div className="flex items-center gap-space-sm text-outline font-label-sm text-label-sm mt-1">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">checklist</span> 0/2 subtasks
                    </span>
<span>•</span>
<span className="text-on-surface-variant font-code-sm text-code-sm">#SP-FIN-019</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  Spring General
                </span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-label-sm text-label-sm font-bold">R</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Rudresh</span>
<span className="font-label-sm text-label-sm text-outline">President</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-medium">March 29, 2026</span>
<span className="text-outline font-label-sm text-label-sm">In 4 days</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  MEDIUM
                </span>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-outline"></span> Pending
                </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
<span className="material-symbols-outlined text-[15px]">description</span>
<span>Review PDF</span>
</button>
<button className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Quick Menu">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="group hover:bg-surface-container-low transition-colors duration-150 opacity-80 hover:opacity-100">
<td className="py-3.5 px-space-md">
<input checked="" className="task-checkbox rounded accent-primary cursor-pointer w-4 h-4" type="checkbox" />
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col max-w-md">
<span className="font-title-md text-title-md text-on-surface line-through font-medium text-outline">
                    Draft Discord &amp; Instagram Speaker Announcement Graphics
                  </span>
<div className="flex items-center gap-space-sm text-outline font-label-sm text-label-sm mt-1">
<span className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[14px]">done_all</span> 4/4 completed
                    </span>
<span>•</span>
<span className="text-on-surface-variant font-code-sm text-code-sm">#BC-MKT-007</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-surface-tint"></span>
                  AI Bootcamp
                </span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-label-sm text-label-sm font-bold">RV</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-medium">Rohan V.</span>
<span className="font-label-sm text-label-sm text-outline">Design Lead</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-outline font-medium">April 2, 2026</span>
<span className="text-outline font-label-sm text-label-sm">Closed</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-outline font-label-sm text-label-sm">
                  MEDIUM
                </span>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">
<span className="w-2 h-2 rounded-full bg-primary"></span> Completed
                </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
<span className="material-symbols-outlined text-[15px]">visibility</span>
<span>View Assets</span>
</button>
<button className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Quick Menu">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="group bg-error-container/20 hover:bg-error-container/35 transition-colors duration-150">
<td className="py-3.5 px-space-md">
<input className="task-checkbox rounded accent-error cursor-pointer w-4 h-4" type="checkbox" />
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col max-w-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-error">flag</span>
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-error transition-colors">
                      Assemble 45 IoT Hardware Sensor Kits
                    </span>
</div>
<div className="flex items-center gap-space-sm text-outline font-label-sm text-label-sm mt-1">
<span className="flex items-center gap-1 text-error font-medium">
<span className="material-symbols-outlined text-[14px]">pending</span> 12/45 units assembled
                    </span>
<span>•</span>
<span className="text-on-surface-variant font-code-sm text-code-sm">#HQ-HW-003</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  HackQuest '26
                </span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-xs">
<div className="flex -space-x-1.5 overflow-hidden">
<div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center font-bold">H1</div>
<div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-secondary text-on-secondary font-label-sm text-[10px] flex items-center justify-center font-bold">H2</div>
<div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-outline-variant text-on-surface font-label-sm text-[10px] flex items-center justify-center font-bold">+2</div>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-medium">Hardware Sub-team</span>
<span className="font-label-sm text-label-sm text-outline">4 Assigned</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-error font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">warning</span> Yesterday
                  </span>
<span className="text-error font-label-sm text-label-sm">OVERDUE by 24h</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[13px]">priority_high</span> HIGH
                </span>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold animate-pulse">
<span className="w-2 h-2 rounded-full bg-error"></span> Overdue
                </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-error text-on-error font-label-sm text-label-sm hover:opacity-90 shadow-sm transition-all">
<span className="material-symbols-outlined text-[15px]">send_time_extension</span>
<span>Ping Assignee</span>
</button>
<button className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Quick Menu">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm px-space-md py-3 bg-surface-container-low">
<div className="flex items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
<span>Showing <strong className="text-on-surface">1 - 6</strong> of 48 tasks</span>
<span className="text-outline">•</span>
<div className="flex items-center gap-1">
<span>Rows per page:</span>
<select className="bg-transparent text-on-surface font-semibold outline-none cursor-pointer">
<option>6</option>
<option>12</option>
<option>24</option>
</select>
</div>
</div>
<div className="flex items-center gap-space-xs">
<button className="p-1 rounded-lg text-outline opacity-50 cursor-not-allowed" disabled="">
<span className="material-symbols-outlined text-[18px]">first_page</span>
</button>
<button className="p-1 rounded-lg text-outline opacity-50 cursor-not-allowed" disabled="">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<span className="px-3 py-1 rounded-lg bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold">1</span>
<button className="px-2.5 py-1 rounded-lg hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm transition-colors">2</button>
<button className="px-2.5 py-1 rounded-lg hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm transition-colors">3</button>
<span className="px-1 text-outline">...</span>
<button className="px-2.5 py-1 rounded-lg hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm transition-colors">8</button>
<button className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
<button className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[18px]">last_page</span>
</button>
</div>
</div>
</div>

<div className="hidden grid grid-cols-1 md:grid-cols-4 gap-space-md w-full" id="kanbanViewContainer">

<div className="flex flex-col gap-space-sm p-space-sm rounded-2xl bg-surface-container-lowest shadow-sm">
<div className="flex items-center justify-between px-2 py-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-outline"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold">Pending</span>
<span className="px-1.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-outline font-semibold">8</span>
</div>
<button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[11px]">HackQuest '26</span>
<span className="text-error font-label-sm text-[11px] font-bold">HIGH</span>
</div>
<p className="font-title-md text-title-md text-on-surface font-semibold">Confirm Microsoft &amp; RedBull Swag Box Delivery</p>
<div className="flex items-center justify-between text-outline font-label-sm text-[12px] pt-1">
<span>Sneha Roy</span>
<span>Mar 27</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]">Spring General</span>
<span className="text-outline font-label-sm text-[11px]">MEDIUM</span>
</div>
<p className="font-title-md text-title-md text-on-surface font-semibold">Submit Faculty Advisor Budget Reimbursement Form</p>
<div className="flex items-center justify-between text-outline font-label-sm text-[12px] pt-1">
<span>Rudresh</span>
<span>Mar 29</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-sm p-space-sm rounded-2xl bg-surface-container-lowest shadow-sm">
<div className="flex items-center justify-between px-2 py-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold">In Progress</span>
<span className="px-1.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-secondary font-semibold">14</span>
</div>
<button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-2 border-l-4 border-error">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-[11px] font-bold">CRITICAL</span>
<span className="text-error font-label-sm text-[11px] font-semibold">Today 5 PM</span>
</div>
<p className="font-title-md text-title-md text-on-surface font-semibold">Finalize University Auditorium Sound &amp; Lighting Contract</p>
<div className="flex items-center justify-between text-outline font-label-sm text-[12px] pt-1">
<span>Ananya Sharma</span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px]">AI Drafted</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[11px]">HackQuest '26</span>
<span className="text-primary font-label-sm text-[11px] font-bold">HIGH</span>
</div>
<p className="font-title-md text-title-md text-on-surface font-semibold">Deploy Judge Scoring Portal &amp; API Keys</p>
<div className="flex items-center justify-between text-outline font-label-sm text-[12px] pt-1">
<span>Dev Patel</span>
<span>Tomorrow</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-sm p-space-sm rounded-2xl bg-surface-container-lowest shadow-sm">
<div className="flex items-center justify-between px-2 py-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span className="font-title-md text-title-md text-error font-semibold">Overdue / Action</span>
<span className="px-1.5 py-0.5 rounded-full bg-error-container font-label-sm text-label-sm text-error font-bold">4</span>
</div>
<button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div className="p-space-sm rounded-xl bg-error-container/30 shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-[11px] font-bold">DELAYED</span>
<span className="text-error font-label-sm text-[11px] font-bold">Yesterday</span>
</div>
<p className="font-title-md text-title-md text-on-surface font-semibold">Assemble 45 IoT Hardware Sensor Kits</p>
<div className="flex items-center justify-between text-outline font-label-sm text-[12px] pt-1">
<span>Hardware Sub-team</span>
<button className="px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-[10px]">Ping</button>
</div>
</div>
</div>

<div className="flex flex-col gap-space-sm p-space-sm rounded-2xl bg-surface-container-lowest shadow-sm">
<div className="flex items-center justify-between px-2 py-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold">Completed</span>
<span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest font-label-sm text-label-sm text-primary font-semibold">22</span>
</div>
<button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low opacity-75 flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-surface-container text-outline font-label-sm text-[11px]">AI Bootcamp</span>
<span className="text-primary font-label-sm text-[11px] font-semibold">Done</span>
</div>
<p className="font-title-md text-title-md text-outline line-through font-medium">Draft Discord &amp; Instagram Speaker Announcement Graphics</p>
<div className="flex items-center justify-between text-outline font-label-sm text-[12px] pt-1">
<span>Rohan V.</span>
<span>Apr 2</span>
</div>
</div>
</div>
</div>

{/* AI Extractor Hidden */}
</div>

<div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden" id="newTaskModal">
<div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest shadow-2xl p-space-lg flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="p-1.5 rounded-lg bg-primary-fixed text-primary material-symbols-outlined text-[20px]">add_task</span>
<h3 className="font-headline-md text-headline-md text-on-surface">Create Operational Task</h3>
</div>
<button className="p-1 rounded-lg text-outline hover:text-on-surface" id="closeModalBtn">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div className="flex flex-col gap-space-sm">
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Task Title</label>
<input className="w-full px-space-sm py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest shadow-sm" id="modalTaskTitle" placeholder="e.g., Secure Keynote Speaker Hospitality Suite" type="text" />
</div>
<div className="grid grid-cols-2 gap-space-sm">
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Associated Event</label>
<select className="w-full px-space-sm py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none">
<option>HackQuest '26</option>
<option>AI Bootcamp</option>
<option>Spring General</option>
</select>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Priority Level</label>
<select className="w-full px-space-sm py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none">
<option>Critical</option>
<option selected="">High</option>
<option>Medium</option>
<option>Low</option>
</select>
</div>
</div>
<div className="grid grid-cols-2 gap-space-sm">
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Assignee</label>
<input className="w-full px-space-sm py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none" placeholder="e.g. Sneha Roy" type="text" />
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Due Date</label>
<input className="w-full px-space-sm py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none" type="date" value="2026-03-30" />
</div>
</div>
</div>
<div className="flex items-center justify-end gap-space-sm pt-space-xs">
<button className="px-space-md py-2 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors" id="cancelModalBtn">
          Cancel
        </button>
<button className="px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-md hover:bg-primary-container transition-colors" id="submitNewTaskBtn">
          Create Task
        </button>
</div>
</div>
</div>
</div>
<Modal open={newTaskOpen} title="New Task" onClose={() => setNewTaskOpen(false)} footer={<><button onClick={() => setNewTaskOpen(false)} className="px-4 py-2 rounded-lg bg-surface-container">Cancel</button><button form="new-task-form" disabled={taskSaving} className="px-4 py-2 rounded-lg bg-primary text-on-primary">{taskSaving?'Creating...':'Create Task'}</button></>}>
<form id="new-task-form" onSubmit={async(e)=>{e.preventDefault();if(!taskForm.title.trim())return;setTaskSaving(true);try{await createTask(taskForm.event_id,{title:taskForm.title,description:taskForm.description,owner:taskForm.owner,deadline:taskForm.deadline,priority:taskForm.priority,status:taskForm.status});setNewTaskOpen(false);alert('Task created successfully.');}catch(err){alert(err.message);}finally{setTaskSaving(false);}}} className="space-y-3"><label className="block text-sm font-medium">Event ID *<input required type="number" min="1" value={taskForm.event_id} onChange={e=>setTaskForm({...taskForm,event_id:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label><label className="block text-sm font-medium">Task Title *<input required value={taskForm.title} onChange={e=>setTaskForm({...taskForm,title:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label><label className="block text-sm font-medium">Description<textarea value={taskForm.description} onChange={e=>setTaskForm({...taskForm,description:e.target.value})} rows="3" className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">Owner<input value={taskForm.owner} onChange={e=>setTaskForm({...taskForm,owner:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label><label className="text-sm font-medium">Deadline<input type="date" value={taskForm.deadline} onChange={e=>setTaskForm({...taskForm,deadline:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label></div><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">Priority<select value={taskForm.priority} onChange={e=>setTaskForm({...taskForm,priority:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"><option>low</option><option>medium</option><option>high</option><option>critical</option></select></label><label className="text-sm font-medium">Status<select value={taskForm.status} onChange={e=>setTaskForm({...taskForm,status:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"><option>pending</option><option>in_progress</option><option>completed</option><option>blocked</option></select></label></div></form></Modal>
</main>
  );
}
