const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  let data = null;
  const text = await response.text();
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!response.ok) {
    const message = data?.detail || data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}

export const analyzeMeeting = (notes) => request('/ai/analyze-meeting', {
  method: 'POST',
  body: JSON.stringify({ notes }),
});

export const detectRisks = (information) => request('/ai/detect-risks', {
  method: 'POST',
  body: JSON.stringify({ information }),
});

export const generateAnnouncement = (event_information) => request('/ai/generate-announcement', {
  method: 'POST',
  body: JSON.stringify({ event_information }),
});

export const analyzeMeetingAndCreateTasks = (event_id, notes) => request('/ai/analyze-meeting-and-create-tasks', {
  method: 'POST',
  body: JSON.stringify({ event_id: Number(event_id), notes }),
});

export const getEvents = () => request('/api/events/');
export const getEvent = (eventId) => request(`/api/events/${eventId}`);
export const createEvent = (payload) => request('/api/events/', { method: 'POST', body: JSON.stringify(payload) });

export const getTasks = (eventId) => request(`/api/events/${eventId}/tasks`);
export const getTask = (taskId) => request(`/api/tasks/${taskId}`);
export const createTask = (eventId, payload) => request(`/api/events/${eventId}/tasks`, { method: 'POST', body: JSON.stringify(payload) });
export const updateTask = (taskId, payload) => request(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTask = (taskId) => request(`/api/tasks/${taskId}`, { method: 'DELETE' });

export const getVolunteers = (eventId) => request(`/api/events/${eventId}/volunteers`);
export const getVolunteer = (volunteerId) => request(`/api/volunteers/${volunteerId}`);
export const createVolunteer = (eventId, payload) => request(`/api/events/${eventId}/volunteers`, { method: 'POST', body: JSON.stringify(payload) });
export const updateVolunteer = (volunteerId, payload) => request(`/api/volunteers/${volunteerId}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteVolunteer = (volunteerId) => request(`/api/volunteers/${volunteerId}`, { method: 'DELETE' });

export { BASE_URL };
