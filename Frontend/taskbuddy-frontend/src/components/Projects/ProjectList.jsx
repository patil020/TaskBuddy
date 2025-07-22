import React from "react";
import { Badge, Button } from "react-bootstrap";

const projects = [
  {
    id: 1,
    name: "Project A",
    status: "OnTrack",
    members: ["A", "B", "C", "D", "E", "F"],
    tasks: [
      {
        id: "222335",
        title: "Make  design",
        openedBy: "Ajinkya",
        openedDaysAgo: 10,
        status: "Completed",
        isCanceled: false,
        timeSpent: "00:30:00",
        startDate: "25/3/2023",
        endDate: "25/3/2023"
      }
    ]
  }
];

function StatusTag({ status }) {
  const color =
    status === "Completed"
      ? "success"
      : status === "OnTrack"
      ? "info"
      : status === "Canceled"
      ? "danger"
      : "secondary";
  return <Badge bg={color}>{status}</Badge>;
}

export default function ProjectList() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Projects</h2>
      {projects.map((project) => (
        <div className="card mb-4 shadow-sm" key={project.id}>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title mb-1">{project.name}</h5>
                <StatusTag status={project.status} />
              </div>
              <div>
                {project.members.slice(0, 4).map((m, i) => (
                  <span key={i} className="avatar bg-secondary text-white rounded-circle mx-1 px-2">
                    {m}
                  </span>
                ))}
                {project.members.length > 4 && (
                  <span className="text-muted ms-2">+{project.members.length - 4}</span>
                )}
              </div>
            </div>
            <ul className="list-group mt-3">
              {project.tasks.map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <div>
                    <span className="fw-semibold">{task.title}</span>
                    <div>
                      <small>
                        #{task.id} • Opened {task.openedDaysAgo} days ago by {task.openedBy}
                      </small>
                    </div>
                    <StatusTag status={task.status} />
                    {task.isCanceled && <StatusTag status="Canceled" />}
                  </div>
                  <div className="text-end">
                    <div>
                      <Badge bg="light" text="dark">
                        {task.timeSpent}
                      </Badge>
                    </div>
                    <Button variant="outline-primary" size="sm" className="mt-2">
                      Details
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
