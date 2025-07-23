import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Dropdown } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [createFormData, setCreateFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    assignee: '',
    project: ''
  });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Mock tasks data
    const mockTasks = [
      {
        id: 1,
        title: 'Design Homepage',
        description: 'Create responsive homepage design',
        project: 'Website Redesign',
        status: 'In Progress',
        priority: 'High',
        startDate: '2025-01-10',
        endDate: '2025-01-20',
        assignee: 'You',
        createdBy: 'John Doe',
        comments: [
          { id: 1, author: 'John Doe', text: 'Please focus on mobile responsiveness', date: '2025-01-10' }
        ],
        attachments: []
      },
      {
        id: 2,
        title: 'API Integration',
        description: 'Integrate REST API endpoints',
        project: 'Mobile App',
        status: 'Created',
        priority: 'Medium',
        startDate: '2025-01-15',
        endDate: '2025-01-22',
        assignee: 'Alice Johnson',
        createdBy: 'You',
        comments: [],
        attachments: []
      },
      {
        id: 3,
        title: 'Content Writing',
        description: 'Write marketing copy for campaign',
        project: 'Marketing Campaign',
        status: 'Completed',
        priority: 'Low',
        startDate: '2025-01-05',
        endDate: '2025-01-15',
        assignee: 'Bob Smith',
        createdBy: 'Jane Doe',
        comments: [
          { id: 1, author: 'Bob Smith', text: 'Content ready for review', date: '2025-01-14' }
        ],
        attachments: ['marketing-copy.docx']
      }
    ];
    setTasks(mockTasks);
  }, []);

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Created': return 'secondary';
      case 'In Progress': return 'primary';
      case 'Completed': return 'success';
      default: return 'secondary';
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: createFormData.title,
      description: createFormData.description,
      project: createFormData.project,
      status: 'Created',
      priority: createFormData.priority,
      startDate: createFormData.startDate,
      endDate: createFormData.endDate,
      assignee: createFormData.assignee,
      createdBy: 'You',
      comments: [],
      attachments: []
    };
    
    setTasks([...tasks, newTask]);
    setShowCreateModal(false);
    setCreateFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      priority: 'Medium',
      assignee: '',
      project: ''
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedTask = {
        ...selectedTask,
        comments: [
          ...selectedTask.comments,
          {
            id: Date.now(),
            author: 'You',
            text: newComment,
            date: new Date().toISOString().split('T')[0]
          }
        ]
      };
      
      setTasks(tasks.map(task => 
        task.id === selectedTask.id ? updatedTask : task
      ));
      setSelectedTask(updatedTask);
      setNewComment('');
    }
  };

  const viewTaskDetails = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  return (
    <div className="main-content">
      <Header 
        title="Tasks"
        actionButton={{
          text: 'Create Task',
          onClick: () => setShowCreateModal(true)
        }}
      />
      
      <Container fluid className="p-4">
        <Row>
          {tasks.map(task => (
            <Col lg={4} md={6} className="mb-4" key={task.id}>
              <Card className={`h-100 priority-${task.priority.toLowerCase()}`}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{task.title}</h6>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" size="sm" className="text-muted">
                      <Badge bg={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleStatusChange(task.id, 'Created')}>
                        Created
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(task.id, 'In Progress')}>
                        In Progress
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(task.id, 'Completed')}>
                        Completed
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted small">{task.description}</p>
                  
                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="bi bi-folder me-1"></i>
                      {task.project}
                    </small>
                  </div>

                  <div className="mb-2">
                    <Badge bg={getPriorityBadgeVariant(task.priority)} className="me-2">
                      {task.priority} Priority
                    </Badge>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      Due: {task.endDate}
                    </small>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">
                      <i className="bi bi-person me-1"></i>
                      Assigned to: {task.assignee}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">By: {task.createdBy}</small>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => viewTaskDetails(task)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {tasks.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-list-task display-1 text-muted"></i>
            <h4 className="text-muted mt-3">No Tasks Found</h4>
            <p className="text-muted">Create your first task to get started.</p>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Create Your First Task
            </Button>
          </div>
        )}
      </Container>

      {/* Create Task Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateTask}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                value={createFormData.title}
                onChange={(e) => setCreateFormData({...createFormData, title: e.target.value})}
                required
                placeholder="Enter task title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={createFormData.description}
                onChange={(e) => setCreateFormData({...createFormData, description: e.target.value})}
                placeholder="Enter task description"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Project</Form.Label>
                  <Form.Control
                    type="text"
                    value={createFormData.project}
                    onChange={(e) => setCreateFormData({...createFormData, project: e.target.value})}
                    placeholder="Enter project name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={createFormData.priority}
                    onChange={(e) => setCreateFormData({...createFormData, priority: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

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
              <Form.Label>Assignee</Form.Label>
              <Form.Control
                type="text"
                value={createFormData.assignee}
                onChange={(e) => setCreateFormData({...createFormData, assignee: e.target.value})}
                placeholder="Enter assignee name"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Task Details Modal */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} size="lg">
        {selectedTask && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedTask.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={8}>
                  <h6>Description</h6>
                  <p className="text-muted">{selectedTask.description}</p>
                  
                  <h6>Project</h6>
                  <p className="text-muted">{selectedTask.project}</p>

                  {selectedTask.attachments.length > 0 && (
                    <>
                      <h6>Attachments</h6>
                      <ul className="list-unstyled">
                        {selectedTask.attachments.map((attachment, index) => (
                          <li key={index}>
                            <i className="bi bi-paperclip me-2"></i>
                            <a href="#" className="text-primary">{attachment}</a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </Col>
                <Col md={4}>
                  <div className="mb-3">
                    <strong>Status:</strong>
                    <br />
                    <Badge bg={getStatusBadgeVariant(selectedTask.status)}>
                      {selectedTask.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <strong>Priority:</strong>
                    <br />
                    <Badge bg={getPriorityBadgeVariant(selectedTask.priority)}>
                      {selectedTask.priority}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <strong>Start Date:</strong>
                    <br />
                    {selectedTask.startDate}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Due Date:</strong>
                    <br />
                    {selectedTask.endDate}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Assignee:</strong>
                    <br />
                    {selectedTask.assignee}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Created By:</strong>
                    <br />
                    {selectedTask.createdBy}
                  </div>
                </Col>
              </Row>
              
              <hr />
              
              <h6>Comments</h6>
              <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {selectedTask.comments.map((comment) => (
                  <div key={comment.id} className="mb-3 p-2 border rounded">
                    <div className="d-flex justify-content-between">
                      <strong>{comment.author}</strong>
                      <small className="text-muted">{comment.date}</small>
                    </div>
                    <p className="mb-0 mt-1">{comment.text}</p>
                  </div>
                ))}
                {selectedTask.comments.length === 0 && (
                  <p className="text-muted">No comments yet.</p>
                )}
              </div>
              
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button variant="primary" onClick={handleAddComment}>
                  Add Comment
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Tasks;