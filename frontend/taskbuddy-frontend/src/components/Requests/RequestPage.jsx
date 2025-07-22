import React, { useState, useEffect } from "react";

export default function RequestPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Use hardcoded test data
    setRequests([
      { id: 1, senderName: "Alice", projectName: "Project Alpha" },
      { id: 2, senderName: "Bob", projectName: "Project Beta" }
    ]);
  }, []);

  // Accept/Reject handlers just remove the request from UI (frontend-only)
  function handleAccept(id) {
    setRequests(reqs => reqs.filter(r => r.id !== id));
  }

  function handleReject(id) {
    setRequests(reqs => reqs.filter(r => r.id !== id));
  }

  if (!requests.length) return <p>No pending requests.</p>;

  return (
    <div>
      <h2>Invitations / Join Requests</h2>
      <ul className="list-group">
        {requests.map(r => (
          <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{r.senderName}</strong> requests to join <em>{r.projectName}</em>
            </div>
            <div>
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => handleAccept(r.id)}
              >
                Accept
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleReject(r.id)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
