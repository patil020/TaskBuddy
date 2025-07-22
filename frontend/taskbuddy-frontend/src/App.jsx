// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar       from './components/Layout/Sidebar';
import Navbar        from './components/Layout/Navbar';
import Dashboard     from './components/Dashboard/Dashboard';
import ProjectList   from './components/Projects/ProjectList';
import CreateProject from './components/Projects/CreateProject';
import ProjectDetails from './components/Projects/ProjectDetails';
import TaskList      from './components/Tasks/TaskList';
import CreateTask    from './components/Tasks/CreateTask';
import TeamList      from './components/Team/TeamList';
import RequestPage   from './components/Requests/RequestPage';
import Settings      from './components/Settings/Settings';

export default function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/new" element={<CreateTask />} />
            <Route path="/team" element={<TeamList />} />
            <Route path="/requests" element={<RequestPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
