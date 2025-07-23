import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Alert } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  );

  const handleEditProfile = (e) => {
    e.preventDefault();
    updateUser(editFormData);
    setShowEditModal(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    // Mock password change
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setMessage('Password changed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setProfilePicture(result);
        updateUser({ profilePicture: result });
        setMessage('Profile picture updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-content">
      <Header title="Profile" />
      
      <Container fluid className="p-4">
        {message && (
          <Alert variant="success" className="mb-4">
            {message}
          </Alert>
        )}

        <Row>
          <Col lg={4} className="mb-4">
            {/* Profile Picture Card */}
            <Card>
              <Card.Body className="text-center">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="profile-avatar mb-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <h4>{user?.firstName} {user?.lastName}</h4>
                <p className="text-muted">{user?.email}</p>
                <p className="text-muted">{user?.role}</p>
                
                <Form.Group>
                  <Form.Label>
                    <Button variant="outline-primary" size="sm">
                      <i className="bi bi-camera me-2"></i>
                      Change Picture
                    </Button>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            {/* Profile Information Card */}
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Profile Information</h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setShowEditModal(true)}
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Profile
                </Button>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <strong>First Name:</strong>
                    <p className="text-muted mb-0">{user?.firstName}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Last Name:</strong>
                    <p className="text-muted mb-0">{user?.lastName}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Email:</strong>
                    <p className="text-muted mb-0">{user?.email}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Phone:</strong>
                    <p className="text-muted mb-0">{user?.phone || 'Not provided'}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Role:</strong>
                    <p className="text-muted mb-0">{user?.role}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>User ID:</strong>
                    <p className="text-muted mb-0">{user?.id}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Security Settings Card */}
            <Card className="mt-4">
              <Card.Header>
                <h5 className="mb-0">Security Settings</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <h6>Password</h6>
                    <p className="text-muted">
                      Last changed: Never (Demo account)
                    </p>
                  </Col>
                  <Col md={4} className="text-end">
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      <i className="bi bi-lock me-2"></i>
                      Change Password
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Account Statistics Card */}
            <Card className="mt-4">
              <Card.Header>
                <h5 className="mb-0">Account Statistics</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3} className="text-center">
                    <h4 className="text-primary">12</h4>
                    <small className="text-muted">Projects</small>
                  </Col>
                  <Col md={3} className="text-center">
                    <h4 className="text-success">45</h4>
                    <small className="text-muted">Completed Tasks</small>
                  </Col>
                  <Col md={3} className="text-center">
                    <h4 className="text-warning">8</h4>
                    <small className="text-muted">Pending Tasks</small>
                  </Col>
                  <Col md={3} className="text-center">
                    <h4 className="text-info">156</h4>
                    <small className="text-muted">Total Hours</small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditProfile}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editFormData.firstName}
                    onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editFormData.lastName}
                    onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleChangePassword}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                required
                placeholder="Enter current password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
                placeholder="Enter new password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                required
                placeholder="Confirm new password"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Change Password
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;