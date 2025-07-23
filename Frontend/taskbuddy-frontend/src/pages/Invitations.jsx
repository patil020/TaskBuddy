import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';

const Invitations = () => {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mock invitations data
    const mockInvitations = [
      {
        id: 1,
        type: 'project',
        projectName: 'E-commerce Platform',
        senderName: 'Sarah Johnson',
        senderEmail: 'sarah@company.com',
        role: 'Developer',
        message: 'We would like you to join our e-commerce platform development team.',
        date: '2025-01-15',
        status: 'pending'
      },
      {
        id: 2,
        type: 'team',
        projectName: 'Marketing Campaign Q1',
        senderName: 'Mike Wilson',
        senderEmail: 'mike@marketing.com',
        role: 'Content Creator',
        message: 'Join our marketing team for the Q1 campaign planning.',
        date: '2025-01-14',
        status: 'pending'
      },
      {
        id: 3,
        type: 'project',
        projectName: 'Data Analytics Dashboard',
        senderName: 'Emma Davis',
        senderEmail: 'emma@analytics.com',
        role: 'Data Analyst',
        message: 'We need your expertise in data visualization for our new dashboard.',
        date: '2025-01-13',
        status: 'pending'
      }
    ];
    setInvitations(mockInvitations);
  }, []);

  const handleInvitationAction = (invitationId, action) => {
    setInvitations(invitations.map(invitation => 
      invitation.id === invitationId 
        ? { ...invitation, status: action === 'accept' ? 'accepted' : 'rejected' }
        : invitation
    ));
    
    setMessage(
      action === 'accept' 
        ? 'Invitation accepted successfully!' 
        : 'Invitation rejected.'
    );
    
    setTimeout(() => setMessage(''), 3000);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const pendingInvitations = invitations.filter(inv => inv.status === 'pending');
  const processedInvitations = invitations.filter(inv => inv.status !== 'pending');

  return (
    <div className="main-content">
      <Header title="Invitations" />
      
      <Container fluid className="p-4">
        {message && (
          <Alert variant="success" className="mb-4">
            {message}
          </Alert>
        )}

        {/* Pending Invitations */}
        <div className="mb-5">
          <h5 className="mb-3">
            Pending Invitations ({pendingInvitations.length})
          </h5>
          
          {pendingInvitations.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-5">
                <i className="bi bi-envelope display-1 text-muted"></i>
                <h6 className="text-muted mt-3">No Pending Invitations</h6>
                <p className="text-muted">You don't have any pending invitations at the moment.</p>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {pendingInvitations.map(invitation => (
                <Col lg={6} className="mb-4" key={invitation.id}>
                  <Card className="h-100">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-0">{invitation.projectName}</h6>
                        <small className="text-muted">
                          {invitation.type === 'project' ? 'Project' : 'Team'} Invitation
                        </small>
                      </div>
                      <Badge bg={getStatusBadgeVariant(invitation.status)}>
                        {invitation.status}
                      </Badge>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <strong>From:</strong>
                        <br />
                        {invitation.senderName}
                        <br />
                        <small className="text-muted">{invitation.senderEmail}</small>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Role:</strong>
                        <br />
                        <Badge bg="info">{invitation.role}</Badge>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Message:</strong>
                        <p className="text-muted mt-1">{invitation.message}</p>
                      </div>
                      
                      <div className="mb-3">
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          Received: {invitation.date}
                        </small>
                      </div>
                      
                      <div className="d-flex gap-2">
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleInvitationAction(invitation.id, 'accept')}
                        >
                          <i className="bi bi-check-lg me-1"></i>
                          Accept
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleInvitationAction(invitation.id, 'reject')}
                        >
                          <i className="bi bi-x-lg me-1"></i>
                          Reject
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>

        {/* Processed Invitations */}
        {processedInvitations.length > 0 && (
          <div>
            <h5 className="mb-3">
              Recent Activity ({processedInvitations.length})
            </h5>
            
            <Row>
              {processedInvitations.map(invitation => (
                <Col lg={6} className="mb-4" key={invitation.id}>
                  <Card className="h-100">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-0">{invitation.projectName}</h6>
                        <small className="text-muted">
                          {invitation.type === 'project' ? 'Project' : 'Team'} Invitation
                        </small>
                      </div>
                      <Badge bg={getStatusBadgeVariant(invitation.status)}>
                        {invitation.status}
                      </Badge>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <strong>From:</strong>
                        <br />
                        {invitation.senderName}
                        <br />
                        <small className="text-muted">{invitation.senderEmail}</small>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Role:</strong>
                        <br />
                        <Badge bg="info">{invitation.role}</Badge>
                      </div>
                      
                      <div className="mb-3">
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          Received: {invitation.date}
                        </small>
                      </div>
                      
                      {invitation.status === 'accepted' && (
                        <Alert variant="success" className="mb-0 py-2">
                          <i className="bi bi-check-circle me-2"></i>
                          You accepted this invitation
                        </Alert>
                      )}
                      
                      {invitation.status === 'rejected' && (
                        <Alert variant="danger" className="mb-0 py-2">
                          <i className="bi bi-x-circle me-2"></i>
                          You rejected this invitation
                        </Alert>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Invitations;