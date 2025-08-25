// src/pages/NotificationPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUnreadNotifications, markNotificationAsRead } from "../api/notification";
import NotificationCard from "../components/NotificationCard";

export default function NotificationPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Establish a WebSocket connection to receive realtime notifications.  The
  // backend requires a JWT token passed as a query parameter.  New
  // notifications are prepended to the existing list.
  useEffect(() => {
  if (!user) return;
  const token = localStorage.getItem('token');
  if (!token) return;
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  // Always connect to backend port 8080 for WebSocket
  const url = `${protocol}://localhost:8080/api/ws/notifications?token=${encodeURIComponent(token)}`;
  const socket = new WebSocket(url);
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNotifications((prev) => [data, ...prev]);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    return () => {
      socket.close();
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      getUnreadNotifications(user.id)
        .then(res => {
          // API returns a list of notifications rather than ApiResponse
          const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
          setNotifications(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error loading notifications:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleMarkRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  if (!user) return <div className="container mt-4"><h5>Login to see notifications.</h5></div>;
  if (loading) return <div className="container mt-4"><h4>Loading notifications...</h4></div>;

  return (
    <div className="container mt-4">
      <h3>Unread Notifications</h3>
      {notifications.length === 0 ? (
        <div className="text-center">
          <p>No unread notifications.</p>
        </div>
      ) : (
        <div>
          {notifications.map(n => (
            <NotificationCard key={n.id} notification={n} onMarkRead={handleMarkRead} />
          ))}
        </div>
      )}
    </div>
  );
}
