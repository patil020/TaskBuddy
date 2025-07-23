import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      taskAssignments: true,
      projectUpdates: true,
      teamInvitations: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const handleSettingsChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Mock save settings
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="main-content">
      <Header title="Settings" />
      
      <Container fluid className="p-4">
        {message && (
          <Alert variant="success" className="mb-4">
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSaveSettings}>
          <Row>
            <Col lg={6} className="mb-4">
              {/* Notification Settings */}
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="bi bi-bell me-2"></i>
                    Notification Settings
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form.Check
                    type="switch"
                    id="email-notifications"
                    label="Email Notifications"
                    checked={settings.notifications.email}
                    onChange={(e) => handleSettingsChange('notifications', 'email', e.target.checked)}
                    className="mb-3"
                  />
                  
                  <Form.Check
                    type="switch"
                    id="push-notifications"
                    label="Push Notifications"
                    checked={settings.notifications.push}
                    onChange={(e) => handleSettingsChange('notifications', 'push', e.target.checked)}
                    className="mb-3"
                  />
                  
                  <Form.Check
                    type="switch"
                    id="task-assignments"
                    label="Task Assignments"
                    checked={settings.notifications.taskAssignments}
                    onChange={(e) => handleSettingsChange('notifications', 'taskAssignments', e.target.checked)}
                    className="mb-3"
                  />
                  
                  <Form.Check
                    type="switch"
                    id="project-updates"
                    label="Project Updates"
                    checked={settings.notifications.projectUpdates}
                    onChange={(e) => handleSettingsChange('notifications', 'projectUpdates', e.target.checked)}
                    className="mb-3"
                  />
                  
                  <Form.Check
                    type="switch"
                    id="team-invitations"
                    label="Team Invitations"
                    checked={settings.notifications.teamInvitations}
                    onChange={(e) => handleSettingsChange('notifications', 'teamInvitations', e.target.checked)}
                  />
                </Card.Body>
              </Card>

              {/* Privacy Settings */}
              <Card className="mt-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="bi bi-shield-lock me-2"></i>
                    Privacy Settings
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Visibility</Form.Label>
                    <Form.Select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleSettingsChange('privacy', 'profileVisibility', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="team-only">Team Members Only</option>
                      <option value="private">Private</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Check
                    type="switch"
                    id="show-email"
                    label="Show Email in Profile"
                    checked={settings.privacy.showEmail}
                    onChange={(e) => handleSettingsChange('privacy', 'showEmail', e.target.checked)}
                    className="mb-3"
                  />
                  
                  <Form.Check
                    type="switch"
                    id="show-phone"
                    label="Show Phone in Profile"
                    checked={settings.privacy.showPhone}
                    onChange={(e) => handleSettingsChange('privacy', 'showPhone', e.target.checked)}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} className="mb-4">
              {/* Preferences */}
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="bi bi-gear me-2"></i>
                    Preferences
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Theme</Form.Label>
                    <Form.Select
                      value={settings.preferences.theme}
                      onChange={(e) => handleSettingsChange('preferences', 'theme', e.target.value)}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Language</Form.Label>
                    <Form.Select
                      value={settings.preferences.language}
                      onChange={(e) => handleSettingsChange('preferences', 'language', e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Timezone</Form.Label>
                    <Form.Select
                      value={settings.preferences.timezone}
                      onChange={(e) => handleSettingsChange('preferences', 'timezone', e.target.value)}
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date Format</Form.Label>
                    <Form.Select
                      value={settings.preferences.dateFormat}
                      onChange={(e) => handleSettingsChange('preferences', 'dateFormat', e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Account Actions */}
              <Card className="mt-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="bi bi-person-gear me-2"></i>
                    Account Actions
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary">
                      <i className="bi bi-download me-2"></i>
                      Export Data
                    </Button>
                    
                    <Button variant="outline-warning">
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Reset Settings
                    </Button>
                    
                    <Button variant="outline-danger">
                      <i className="bi bi-trash me-2"></i>
                      Delete Account
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit" size="lg">
              <i className="bi bi-check-lg me-2"></i>
              Save Settings
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Settings;