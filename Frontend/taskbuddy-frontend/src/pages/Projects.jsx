import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Nav, Modal, Form, Alert } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('assigned');
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    teamMembers: ''
  });

  useEffect(() => {
    // Mock projects data
    const mockProjects = [
      {
        id: 1,
        title: 'Website Redesign',
        description: 'Complete redesign of company website',
        status: 'In Progress',
        progress: 75,
        startDate: '2025-01-01',
        endDate: '2025-02-15',
        createdBy: user?.id === '1' ? 'You' : 'John Doe',
        teamMembers: ['Alice', 'Bob', 'Charlie'],
        tasksCount: 12,
        isCreator: user?.id === '1'
      },
      {
        id: 2,
        title: 'Mobile App Development',
        description: 'iOS and Android app development',
        status: 'Planning',
        progress: 25,
        startDate: '2025-01-15',
        endDate: '2025-04-30',
        createdBy: user?.id === '2' ? 'You' : 'Jane Smith',
        teamMembers: ['David', 'Eve'],
        tasksCount: 8,
        isCreator: user?.id === '2'
      },
      {
        id: 3,
        title: 'Marketing Campaign',
        description: 'Q1 2025 marketing campaign',
        status: 'Review',
        progress: 90,
        startDate: '2024-12-01',
        endDate: '2025-01-31',
        createdBy: user?.id === '1' ? 'You' : 'John Doe',
        teamMembers: ['Frank', 'Grace'],
        tasksCount: 6,
        isCreator: user?.id === '1'
      }
    ];
    setProjects(mockProjects);
  }, [user]);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'In Progress': return 'primary';
      case 'Planning': return 'warning';
      case 'Review': return 'info';
      case 'Completed': return 'success';
      default: return 'secondary';
    }
  };

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'assigned') {
      return !project.isCreator;
    } else {
      return project.isCreator;
    }
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      title: createFormData.title,
      description: createFormData.description,
      status: 'Planning',
      progress: 0,
      startDate: createFormData.startDate,
      endDate: createFormData.endDate,
      createdBy: 'You',
      teamMembers: createFormData.teamMembers.split(',').map(m => m.trim()),
      tasksCount: 0,
      isCreator: true
    };
    
    setProjects([...projects, newProject]);
    setShowCreateModal(false);
    setCreateFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      teamMembers: ''
    });
  };

  return (
    <div className="main-content">
      <Header 
        title="Projects"
        actionButton={{
          text: 'Create Project',
          onClick: () => setShowCreateModal(true)
        }}
      />
      
      <Container fluid className="p-4">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'assigned'} 
              onClick={() => setActiveTab('assigned')}
            >
              Assigned Projects ({projects.filter(p => !p.isCreator).length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'created'} 
              onClick={() => setActiveTab('created')}
            >
              Created Projects ({projects.filter(p => p.isCreator).length})
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Row>
          {filteredProjects.map(project => (
            <Col lg={4} md={6} className="mb-4" key={project.id}>
              <Card className="h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{project.title}</h6>
                  <Badge bg={getStatusBadgeVariant(project.status)}>{project.status}</Badge>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted small">{project.description}</p>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small>Progress</small>
                      <small>{project.progress}%</small>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      {project.startDate} - {project.endDate}
                    </small>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="bi bi-people me-1"></i>
                      {project.teamMembers.length} team members
                    </small>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">
                      <i className="bi bi-list-task me-1"></i>
                      {project.tasksCount} tasks
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">By: {project.createdBy}</small>
                    <Button variant="outline-primary" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredProjects.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-folder2-open display-1 text-muted"></i>
            <h4 className="text-muted mt-3">No Projects Found</h4>
            <p className="text-muted">
              {activeTab === 'assigned' 
                ? "You haven't been assigned to any projects yet."
                : "You haven't created any projects yet."
              }
            </p>
            {activeTab === 'created' && (
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                Create Your First Project
              </Button>
            )}
          </div>
        )}
      </Container>

      {/* Create Project Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateProject}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                value={createFormData.title}
                onChange={(e) => setCreateFormData({...createFormData, title: e.target.value})}
                required
                placeholder="Enter project title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={createFormData.description}
                onChange={(e) => setCreateFormData({...createFormData, description: e.target.value})}
                placeholder="Enter project description"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={createFormData.startDate}
                    onChange={(e) => setCreateFormData({...createFormData, startDate: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={createFormData.endDate}
                    onChange={(e) => setCreateFormData({...createFormData, endDate: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Team Members</Form.Label>
              <Form.Control
                type="text"
                value={createFormData.teamMembers}
                onChange={(e) => setCreateFormData({...createFormData, teamMembers: e.target.value})}
                placeholder="Enter team member names separated by commas"
              />
              <Form.Text className="text-muted">
                Separate multiple names with commas (e.g., John Doe, Jane Smith)
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Project
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Projects;