import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function Settings({ profile, onProfileChange }){
 const [aiEnabled,setAiEnabled]=useState(true);
 const [editing,setEditing]=useState(false);
 const [draftProfile,setDraftProfile]=useState(profile);

 useEffect(() => {
   setDraftProfile(profile);
 }, [profile]);

 const openEditor = () => {
   setDraftProfile(profile);
   setEditing(true);
 };

 const updateDraft = (patch) => setDraftProfile({...draftProfile, ...patch});
 const saveProfile = () => {
   onProfileChange(draftProfile);
   setEditing(false);
 };
 return <div className="flex flex-col gap-space-lg w-full max-w-4xl mx-auto pb-space-xl"><div><h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Settings</h1><p className="font-body-md text-on-surface-variant mt-1">Manage your profile, preferences, and club workspace.</p></div><div className="flex flex-col gap-space-md">
 <section className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30"><h2 className="font-title-sm text-outline tracking-widest uppercase font-bold mb-4">Profile</h2><div className="flex items-center gap-space-lg"><img alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-surface" src="/logo.png"/><div><span className="font-title-lg text-on-surface font-semibold block">{profile.name}</span><span className="font-body-md text-on-surface-variant">{profile.role}</span></div><button onClick={openEditor} className="ml-auto px-space-md py-2 rounded-xl bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high border border-outline-variant/30">Edit Profile</button></div></section>
 <section className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30"><h2 className="font-title-sm text-outline tracking-widest uppercase font-bold mb-4">Club Workspace</h2><div className="flex items-center justify-between"><div><span className="font-title-md text-on-surface block font-semibold">GDSC / ACM Chapter</span><span className="font-body-sm text-on-surface-variant">Campus Technical Society</span></div><span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm">Active Workspace</span></div></section>
 <section className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30"><h2 className="font-title-sm text-outline tracking-widest uppercase font-bold mb-4">Notifications</h2>{['Event reminders','Task deadlines','Risk alerts','Weekly summary'].map((x,i)=><label key={x} className="flex items-center justify-between py-3 border-b last:border-0 border-outline-variant/20"><span><b className="block text-on-surface">{x}</b><span className="text-sm text-on-surface-variant">{i===0?'Receive alerts for upcoming event milestones.':i===1?'Get notified when a task is overdue.':i===2?'Immediate notifications for High and Critical risks.':'A weekly digest of club operations and AI insights.'}</span></span><input type="checkbox" defaultChecked={i<3} className="w-5 h-5 accent-primary"/></label>)}</section>
 <section className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30"><h2 className="font-title-sm text-outline tracking-widest uppercase font-bold mb-4">AI Preferences</h2><div className="flex items-center justify-between py-2"><div><b className="block text-on-surface">Enable AI suggestions</b><span className="text-sm text-on-surface-variant">Allow AI-assisted operational workflows.</span></div><input type="checkbox" checked={aiEnabled} onChange={e=>setAiEnabled(e.target.checked)} className="w-5 h-5 accent-secondary"/></div></section></div>
 <Modal open={editing} title="Edit Profile" onClose={()=>setEditing(false)} footer={<><button onClick={()=>setEditing(false)} className="px-4 py-2 rounded-lg bg-surface-container">Cancel</button><button onClick={saveProfile} className="px-4 py-2 rounded-lg bg-primary text-on-primary">Save Changes</button></>}><div className="space-y-3"><label className="block text-sm font-medium">Full Name<input value={draftProfile.name} onChange={e=>updateDraft({name:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label><label className="block text-sm font-medium">Email<input value={draftProfile.email} onChange={e=>updateDraft({email:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label><label className="block text-sm font-medium">Role<input value={draftProfile.role} onChange={e=>updateDraft({role:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label><label className="block text-sm font-medium">Phone<input value={draftProfile.phone} onChange={e=>updateDraft({phone:e.target.value})} className="mt-1 w-full rounded-lg border border-outline-variant p-2.5"/></label></div></Modal>
 </div>
}
