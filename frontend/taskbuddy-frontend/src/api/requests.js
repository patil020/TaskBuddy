export async function fetchRequests() {
  const res = await fetch('/api/requests');
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}

export async function acceptRequest(id) {
  const res = await fetch(`/api/requests/${id}/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Failed to accept request');
  return res.json();
}

export async function rejectRequest(id) {
  const res = await fetch(`/api/requests/${id}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Failed to reject request');
  return res.json();
}