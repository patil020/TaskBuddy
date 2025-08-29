# TaskBuddy – Project & Task Management System

TaskBuddy is a full‑stack task and project management platform built with **Spring Boot** on the backend and **React** on the frontend. It allows users to create and manage projects, assign tasks, collaborate via comments, and receive real‑time notifications. The system supports role‑based access control (manager vs member) and uses JWT authentication for stateless, secure API requests.

## 💡 Features

- **User Authentication**: Login and registration with password hashing (BCrypt) and JWT tokens.
- **Role‑Based Authorization**: Users are assigned roles (Manager or Member) and permissions are enforced via `@PreAuthorize` checks.
- **Project Management**: Create, update, delete projects and add members.
- **Task Management**: Create tasks, set priority and due dates, assign to members, update status, and reassign.
- **Comments**: Users can comment on projects and tasks.
- **Real‑Time Notifications**: WebSocket notifications alert users to assignments, comments, and invitation events. WebSockets upgrade the HTTP connection to a full‑duplex, persistent channel, so the server can push messages instantly without repeated headers:contentReference[oaicite:0]{index=0}.
- **Password Reset**: OTP‑based reset with a configurable email service (SMTP in production, console logging in development).
- **Environment Profiles**: Separate configuration for development and production via Spring profiles.
- **Database Migrations**: (Optional) Flyway integration is recommended, though this version uses JPA `ddl-auto` for development.
- **Responsive UI**: Built with React and Bootstrap; includes protected routes and context‑based authentication state.

## 🛠 Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Data JPA, Spring Security, JWT, Lombok, WebSockets, ModelMapper, Flyway (optional).
- **Database**: MySQL (uses JPA for ORM).
- **Frontend**: React (Vite), Axios, React Router, React Context API.
- **Notifications**: WebSockets (Spring’s WebSocket support) for push notifications.
- **Build Tools**: Maven for backend; npm/yarn for frontend.

## 🗃️ Database Overview

| Table                 | Purpose                                                             |
|-----------------------|---------------------------------------------------------------------|
| `users`               | User credentials and roles (Manager, Member).                       |
| `projects`            | Project details and manager ID.                                     |
| `project_members`     | Mapping between users and projects with roles.                      |
| `tasks`               | Tasks with status, priority, due date, assignee, and project ID.    |
| `comments`            | Messages linked to tasks or projects.                               |
| `notifications`       | Messages delivered via WebSocket and stored for unread retrieval.   |
| `project_invitations` | Invitations pending acceptance.                                     |
| `password_reset_tokens` | Stores OTPs and expiry for password resets.                        |

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js** (v14+ recommended)
- **MySQL** (running instance)
- Maven (optional, if not using the provided wrapper)

### Clone the Repository

```bash
git clone https://github.com/patil020/taskbuddy.git
cd taskbuddy
```


Backend Setup

Configure the database:

Create a MySQL database named taskbuddy.

Update src/main/resources/application-dev.properties (or your active profile) with your DB credentials and JWT secret:
```
spring.datasource.url=jdbc:mysql://localhost:3306/taskbuddy
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD

# JWT secret and expiration (example)
jwt.secret=your_jwt_secret_key
jwt.expiration=3600000
```

For production, create application-prod.properties with appropriate values and set SPRING_PROFILES_ACTIVE=prod.

Build and run the backend:
```
./mvnw clean package
java -jar target/spring_boot_backend_template-0.0.1-SNAPSHOT.jar

```
The API will start on http://localhost:8080.

Profiles:

Set SPRING_PROFILES_ACTIVE=dev or prod to load specific configurations.

CSRF is disabled for stateless JWT APIs; CORS origins can be configured via SecurityConfig.

#Frontend Setup

Install dependencies:
```
cd frontend
npm install        # or yarn install

```
Configure base API URL:

If your backend runs on a different port or domain, update src/lib/axios.js:
```
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Change if backend URL differs
  // ...interceptors
});
export default api;

```
Run the frontend:
```
npm run dev        # or yarn dev

```
The app will be available at http://localhost:5173 (Vite default).

Environment variables (optional):
```
You can create a .env file in the frontend directory to set API base URLs:

VITE_API_BASE=http://localhost:8080/api
```


🔐 Authentication & Authorization

On login (POST /api/auth/login), the backend returns a JWT token.

The React app stores this token (e.g., in localStorage) and adds it to subsequent requests through an Axios interceptor.

Method‑level security is enforced with @PreAuthorize using an AuthorizationService:
```
@PreAuthorize("@authorizationService.isProjectManager(#projectId, authentication.name)")
@DeleteMapping("/projects/{projectId}")
public ResponseEntity<?> deleteProject(@PathVariable Long projectId) { ... }

```
Users can have roles: MANAGER or MEMBER. Managers can create projects and assign members; members can view and update tasks assigned to them.

📡 Real‑Time Notifications (WebSockets)

The backend exposes a WebSocket endpoint at /api/ws/notifications.

During the handshake, a valid JWT must be provided as a query parameter (?token=<JWT>) or via the Authorization header.
```
On the React side, open a WebSocket connection after login:

const token = localStorage.getItem('token');
const ws = new WebSocket(`ws://localhost:8080/api/ws/notifications?token=${encodeURIComponent(token)}`);
ws.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  // update your state with the new notification
};
```

Notifications include events like task assignments, status changes, comments, and invitation updates.

🔧 Common API Endpoints

Authentication:

POST /api/auth/register – register a new user.

POST /api/auth/login – authenticate and receive JWT.

POST /api/auth/password-reset – send OTP to email.

POST /api/auth/password-reset/confirm – verify OTP and reset password.

Projects:

POST /api/projects – create project (manager only).

GET /api/projects – list projects for current user.

POST /api/projects/{projectId}/members?userId=ID – add member.

DELETE /api/projects/{projectId} – delete project (manager only).

Tasks:

POST /api/tasks – create task.

GET /api/projects/{projectId}/tasks – tasks in a project.

PUT /api/tasks/{taskId} – update task details.

PUT /api/tasks/{taskId}/status?status=IN_PROGRESS – change status.

PUT /api/tasks/{taskId}/assign?userId=ID – reassign task (manager only).

Comments:

POST /api/projects/{projectId}/comments – comment on project.

POST /api/tasks/{taskId}/comments – comment on task.

Notifications:

GET /api/notifications/unread – list unread notifications.

PUT /api/notifications/{id}/read – mark notification as read.

Refer to your controller files (e.g., TaskController.java, ProjectController.java) for more details and additional endpoints.


🤝 Contributing

Fork the repository and create a feature branch.

Make your changes, ensuring code quality and tests.

Submit a pull request with a clear description of your change.

📄 License

Specify your license here (e.g., MIT, Apache 2.0).
