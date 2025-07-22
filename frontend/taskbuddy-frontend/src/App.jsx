import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from "./components/Layouts/Sidebar";
import Navbar from "./components/Layouts/Navbar";
import ProjectList from './components/Projects/ProjectList';
import RequestPage from './components/Requests/RequestPage';
// ...other imports

export default function App() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/requests" element={<RequestPage />} />
            {/* ...other routes */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
