import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Layout/Header';

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  useEffect(() => {
    // Mock data
    setStats({
      totalProjects: 12,
      totalTasks: 45,
      completedTasks: 28,
      pendingTasks: 17
    });

    setRecentProjects([
      { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 75 },
      { id: 2, name: 'Mobile App', status: 'Planning', progress: 25 },
      { id: 3, name: 'Marketing Campaign', status: 'Review', progress: 90 }
    ]);

    setAssignedTasks([
      { id: 1, title: 'Design Homepage', project: 'Website Redesign', priority: 'High', dueDate: '2025-01-20' },
      { id: 2, title: 'API Integration', project: 'Mobile App', priority: 'Medium', dueDate: '2025-01-22' },
      { id: 3, title: 'Content Writing', project: 'Marketing Campaign', priority: 'Low', dueDate: '2025-01-25' }
    ]);

    setUpcomingDeadlines([
      { id: 1, title: 'Design Homepage', dueDate: '2025-01-20', project: 'Website Redesign' },
      { id: 2, title: 'API Integration', dueDate: '2025-01-22', project: 'Mobile App' }
    ]);
  }, []);

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="main-content">
      <Header 
        title={`Welcome back, ${user?.firstName}!`}
        actionButton={{
          text: 'Create Project',
          onClick: () => window.location.href = '/projects/create'
        }}
      />
      
      <Container fluid className="p-4">
        {/* Quick Stats */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-primary">{stats.totalProjects}</h3>
                <p className="text-muted mb-0">Total Projects</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-info">{stats.totalTasks}</h3>
                <p className="text-muted mb-0">Total Tasks</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-success">{stats.completedTasks}</h3>
                <p className="text-muted mb-0">Completed Tasks</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-warning">{stats.pendingTasks}</h3>
                <p className="text-muted mb-0">Pending Tasks</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex gap-3 flex-wrap">
                  <Button as={Link} to="/" variant="outline-primary" className="quick-action-btn">
                    <i className="bi bi-house me-2"></i>Home
                  </Button>
                  <Button as={Link} to="/projects" variant="outline-primary" className="quick-action-btn">
                    <i className="bi bi-folder me-2"></i>Projects
                  </Button>
                  <Button as={Link} to="/tasks" variant="outline-primary" className="quick-action-btn">
                    <i className="bi bi-list-task me-2"></i>Tasks
                  </Button>
                  <Button as={Link} to="/invitations" variant="outline-primary" className="quick-action-btn">
                    <i className="bi bi-envelope me-2"></i>Requests
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Recent Projects */}
          <Col lg={4} className="mb-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Projects</h5>
                <Button as={Link} to="/projects" variant="link" size="sm">View All</Button>
              </Card.Header>
              <Card.Body>
                {recentProjects.map(project => (
                  <div key={project.id} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-1">{project.name}</h6>
                      <Badge bg="secondary">{project.status}</Badge>
                    </div>
                    <div className="progress" style={{ height: '5px' }}>
                      <div 
                        className="progress-bar" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">{project.progress}% complete</small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Assigned Tasks */}
          <Col lg={4} className="mb-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Assigned Tasks</h5>
                <Button as={Link} to="/tasks" variant="link" size="sm">View All</Button>
              </Card.Header>
              <Card.Body>
                {assignedTasks.map(task => (
                  <div key={task.id} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <h6 className="mb-1">{task.title}</h6>
                      <Badge bg={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                    </div>
                    <p className="text-muted small mb-1">{task.project}</p>
                    <small className="text-muted">Due: {task.dueDate}</small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Upcoming Deadlines */}
          <Col lg={4} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Upcoming Deadlines</h5>
              </Card.Header>
              <Card.Body>
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className="mb-3 pb-3 border-bottom">
                    <h6 className="mb-1">{deadline.title}</h6>
                    <p className="text-muted small mb-1">{deadline.project}</p>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-calendar text-warning me-2"></i>
                      <small className="text-danger">{deadline.dueDate}</small>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;