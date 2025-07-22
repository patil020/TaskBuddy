import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

// Static data for demo
const mockRequests = [
  {
    id: 1,
    senderName: "Alice",
    projectName: "Project Alpha",
    sentAt: "2023-07-20",
    status: "Pending"
  },
  {
    id: 2,
    senderName: "Bob",
    projectName: "Project Beta",
    sentAt: "2023-07-21",
    status: "Pending"
  }
];

export default function RequestPage() {
  const [requests, setRequests] = useState(mockRequests);

  // Handle Accept/Reject actions
  function handleAction(id, action) {
    setRequests((reqs) =>
      reqs.map((r) =>
        r.id === id ? { ...r, status: action === "accept" ? "Accepted" : "Rejected" } : r
      )
    );
  }

  return (
    <div className="container py-3">
      <h2 className="mb-4">Invitations / Requests</h2>
      {requests.length === 0 && <div className="alert alert-info">No invitations right now.</div>}
      <div className="row">
        {requests.map((req) => (
          <div className="col-md-6 mb-4" key={req.id}>
            <Card
              border={
                req.status === "Pending"
                  ? "primary"
                  : req.status === "Accepted"
                  ? "success"
                  : "danger"
              }
              className="shadow-sm"
            >
              <Card.Body>
                <Card.Title className="mb-2">
                  <span className="me-2 fw-semibold">{req.senderName}</span>
                  <span className="small text-muted">invited you to</span>
                  <span className="ms-2 fw-bold">{req.projectName}</span>
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted small">
                  Sent on: {req.sentAt}
                </Card.Subtitle>
                <div className="d-flex align-items-center">
                  <Badge
                    bg={
                      req.status === "Pending"
                        ? "warning"
                        : req.status === "Accepted"
                        ? "success"
                        : "danger"
                    }
                    className="me-3"
                  >
                    {req.status}
                  </Badge>
                  {req.status === "Pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="success"
                        className="me-2"
                        onClick={() => handleAction(req.id, "accept")}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleAction(req.id, "reject")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
