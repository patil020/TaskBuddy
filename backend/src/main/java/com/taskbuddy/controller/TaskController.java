package com.taskbuddy.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import com.taskbuddy.service.TaskService;
import com.taskbuddy.service.AuthorizationService;
import com.taskbuddy.dto.TaskDto;
import com.taskbuddy.dto.ApiResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.taskbuddy.enums.TaskStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@AllArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final AuthorizationService authorizationService;

    // Create task (only project manager can create tasks)
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createTask(
            @Valid @RequestBody TaskDto taskDto,
            @AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        ApiResponse<?> response = taskService.createTask(taskDto, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Update task status - Accept/Reject (only assigned user can do this)
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<?>> updateTaskStatus(
            @PathVariable @Positive(message = "Task ID must be positive") Long id, 
            @RequestParam @NotNull(message = "Status is required") TaskStatus status,
            @AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        ApiResponse<?> response = taskService.updateTaskStatus(id, status, currentUser.getId());
        return ResponseEntity.ok(response);
    }
    
    // Reassign task (only project manager can do this)
    @PutMapping("/{id}/reassign")
    public ResponseEntity<ApiResponse<?>> reassignTask(
            @PathVariable @Positive(message = "Task ID must be positive") Long id,
            @RequestParam @Positive(message = "New assignee ID must be positive") Long newAssigneeId,
            @AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        ApiResponse<?> response = taskService.reassignTask(id, newAssigneeId, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    /*
     * URL - GET http://host:port/api/tasks
     * Success - 200 OK with list of all tasks
     * Error - 500 Internal Server Error
     */
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllTasks() {
        ApiResponse<?> response = taskService.getAllTasks();
        return ResponseEntity.ok(response);
    }

    /*
     * URL - GET http://host:port/api/tasks/{id}
     * Success - 200 OK with task details
     * Error - 404 Not Found
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getTaskById(
        @PathVariable @Positive(message = "Task ID must be positive") Long id,
        @AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        authorizationService.checkTaskAccess(id, currentUser.getId());
        ApiResponse<?> response = taskService.getTaskById(id);
        return ResponseEntity.ok(response);
    }

    /*
     * URL - GET http://host:port/api/tasks/project/{projectId}
     * Success - 200 OK with project tasks
     * Error - 404 Not Found
     */
    @GetMapping("/project/{projectId}")
    public ResponseEntity<ApiResponse<?>> getTasksByProjectId(
        @PathVariable @Positive(message = "Project ID must be positive") Long projectId,
        @AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        authorizationService.checkProjectAccess(projectId, currentUser.getId());
        ApiResponse<?> response = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(response);
    }

    /*
     * URL - PUT http://host:port/api/tasks/{id}
     * Payload - TaskDto (JSON)
     * Header - User-Id (requesting user)
     * Success - 200 OK
     * Error - 400 Bad Request, 403 Forbidden, 404 Not Found
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateTask(
        @PathVariable @Positive(message = "Task ID must be positive") Long id,
        @Valid @RequestBody TaskDto taskDto,
        @AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        ApiResponse<?> response = taskService.updateTask(id, taskDto, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    /*
     * URL - DELETE http://host:port/api/tasks/{id}
     * Header - User-Id (requesting user)
     * Success - 200 OK
     * Error - 403 Forbidden, 404 Not Found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteTask(
        @PathVariable @Positive(message = "Task ID must be positive") Long id,
        @AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        ApiResponse<?> response = taskService.deleteTask(id, currentUser.getId());
        return ResponseEntity.ok(response);
    }
}
