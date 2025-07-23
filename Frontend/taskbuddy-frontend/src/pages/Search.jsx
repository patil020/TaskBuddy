import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Modal, Alert } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';

const Search = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [inviteData, setInviteData] = useState({
    project: '',
    role: '',
    message: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mock members data
    const mockMembers = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Frontend Developer',
        skills: ['React', 'JavaScript', 'CSS', 'HTML'],
        experience: '3 years',
        profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        isAvailable: true
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob@example.com',
        role: 'Backend Developer',
        skills: ['Node.js', 'Python', 'MongoDB', 'SQL'],
        experience: '5 years',
        profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        isAvailable: true
      },
      {
        id: 3,
        name: 'Carol Davis',
        email: 'carol@example.com',
        role: 'UI/UX Designer',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
        experience: '4 years',
        profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        isAvailable: false
      },
      {
        id: 4,
        name: 'David Wilson',
        email: 'david@example.com',
        role: 'Project Manager',
        skills: ['Agile', 'Scrum', 'Team Management', 'Planning'],
        experience: '6 years',
        profilePicture: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
        isAvailable: true
      },
      {
        id: 5,
        name: 'Emma Brown',
        email: 'emma@example.com',
        role: 'Data Scientist',
        skills: ['Python', 'R', 'Machine Learning', 'SQL'],
        experience: '3 years',
        profilePicture: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
        isAvailable: true
      },
      {
        id: 6,
        name: 'Frank Miller',
        email: 'frank@example.com',
        role: 'DevOps Engineer',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        experience: '4 years',
        profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        isAvailable: true
      }
    ];
    setMembers(mockMembers);
    setFilteredMembers(mockMembers);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.skills.some((skill) => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredMembers(filtered);
    }
  }, [searchTerm, members]);

  const handleSendInvite = (member) => {
    setSelectedMember(member);
    setShowInviteModal(true);
  };

  const handleSubmitInvite = (e) => {
    e.preventDefault();
    
    // Mock sending invitation
    setMessage(`Invitation sent to ${selectedMember.name} successfully!`);
    setShowInviteModal(false);
    setInviteData({
      project: '',
      role: '',
      message: ''
    });
    
    setTimeout(() => setMessage(''), 3000);
  };

  const viewMemberProfile = (member) => {
    // This would typically navigate to a detailed profile page
    alert(`Viewing profile for ${member.name}`);
  };

  return (
    <div className="main-content">
      <Header title="Search Members" />
      
      <Container fluid className="p-4">
        {message && (
          <Alert variant="success" className="mb-4">
            {message}
          </Alert>
        )}

        {/* Search Section */}
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col md={8}>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, role, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={4} className="d-flex align-items-center">
                <span className="text-muted">
                  {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found
                </span>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Members Grid */}
        <Row>
          {filteredMembers.map(member => (
            <Col lg={4} md={6} className="mb-4" key={member.id}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <img
                    src={member.profilePicture}
                    alt={member.name}
                    className="profile-avatar mb-3"
                  />
                  
                  <h5 className="mb-1">{member.name}</h5>
                  <p className="text-muted mb-2">{member.role}</p>
                  
                  <div className="mb-3">
                    <Badge 
                      bg={member.isAvailable ? 'success' : 'secondary'}
                      className="mb-2"
                    >
                      {member.isAvailable ? 'Available' : 'Busy'}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <small className="text-muted d-block mb-2">
                      <i className="bi bi-briefcase me-1"></i>
                      {member.experience} experience
                    </small>
                    <small className="text-muted d-block">
                      <i className="bi bi-envelope me-1"></i>
                      {member.email}
                    </small>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="mb-2">Skills</h6>
                    <div className="d-flex flex-wrap justify-content-center gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} bg="light" text="dark" className="small">
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 3 && (
                        <Badge bg="light" text="dark" className="small">
                          +{member.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2 justify-content-center">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => viewMemberProfile(member)}
                    >
                      <i className="bi bi-person me-1"></i>
                      View Profile
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleSendInvite(member)}
                      disabled={!member.isAvailable}
                    >
                      <i className="bi bi-envelope-plus me-1"></i>
                      Send Invite
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredMembers.length === 0 && searchTerm && (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h4 className="text-muted mt-3">No Members Found</h4>
            <p className="text-muted">
              Try searching with different keywords or check your spelling.
            </p>
          </div>
        )}
      </Container>

      {/* Send Invite Modal */}
      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Send Invitation to {selectedMember?.name}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitInvite}>
          <Modal.Body>
            <div className="text-center mb-4">
              <img
                src={selectedMember?.profilePicture}
                alt={selectedMember?.name}
                className="profile-avatar mb-2"
                style={{ width: '80px', height: '80px' }}
              />
              <h6>{selectedMember?.name}</h6>
              <p className="text-muted small">{selectedMember?.role}</p>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={inviteData.project}
                onChange={(e) => setInviteData({...inviteData, project: e.target.value})}
                required
                placeholder="Enter project name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role/Position</Form.Label>
              <Form.Control
                type="text"
                value={inviteData.role}
                onChange={(e) => setInviteData({...inviteData, role: e.target.value})}
                required
                placeholder="Enter role or position"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={inviteData.message}
                onChange={(e) => setInviteData({...inviteData, message: e.target.value})}
                placeholder="Write a message explaining the project and why you'd like them to join..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send Invitation
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Search;