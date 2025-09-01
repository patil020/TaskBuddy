package com.taskbuddy.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import com.taskbuddy.service.CommentService;
import com.taskbuddy.service.AuthorizationService;
import com.taskbuddy.dto.CommentDto;
import com.taskbuddy.dto.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final AuthorizationService authorizationService;

    /*
     * URL - POST http://host:port/api/comments/project/{projectId}
     * Payload - CommentDto (JSON)
     * Header - User-Id (requesting user)
     * Success - 201 Created
     * Error - 400 Bad Request, 404 Not Found
     */
    @PostMapping("/project/{projectId}")
    public ResponseEntity<?> addProjectComment(
        @PathVariable @Positive(message = "Project ID must be positive") Long projectId,
        @Valid @RequestBody CommentDto commentDto,
        @org.springframework.security.core.annotation.AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        
        authorizationService.checkProjectAccess(projectId, currentUser.getId());
        commentDto.setUserId(currentUser.getId());
        commentDto.setProjectId(projectId);
        ApiResponse<?> response = commentService.addProjectComment(projectId, commentDto, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /*
     * URL - POST http://host:port/api/comments/task/{taskId}
     * Payload - CommentDto (JSON)
     * Header - User-Id (requesting user)
     * Success - 201 Created
     * Error - 400 Bad Request, 404 Not Found
     */
    @PostMapping("/task/{taskId}")
    public ResponseEntity<?> addTaskComment(
        @PathVariable @Positive(message = "Task ID must be positive") Long taskId,
        @Valid @RequestBody CommentDto commentDto,
        @org.springframework.security.core.annotation.AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        
        authorizationService.checkTaskAccess(taskId, currentUser.getId());
        commentDto.setUserId(currentUser.getId());
        commentDto.setTaskId(taskId);
        ApiResponse<?> response = commentService.addTaskComment(taskId, commentDto, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get all comments for a task
    @GetMapping("/task/{taskId}")
    public ResponseEntity<?> getCommentsForTask(
        @PathVariable @Positive(message = "Task ID must be positive") Long taskId,
        @org.springframework.security.core.annotation.AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        
        authorizationService.checkTaskAccess(taskId, currentUser.getId());
        ApiResponse<?> response = commentService.getTaskComments(taskId);
        return ResponseEntity.ok(response);
    }

    // Get all comments for a project
    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getCommentsForProject(
        @PathVariable @Positive(message = "Project ID must be positive") Long projectId,
        @org.springframework.security.core.annotation.AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {
        
        authorizationService.checkProjectAccess(projectId, currentUser.getId());
        ApiResponse<?> response = commentService.getProjectComments(projectId);
        return ResponseEntity.ok(response);
    }

    /*
     * URL - PUT http://host:port/api/comments/{id}
     * Payload - CommentDto (JSON)
     * Header - User-Id (requesting user)
     * Success - 200 OK
     * Error - 400 Bad Request, 403 Forbidden, 404 Not Found
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(
        @PathVariable @Positive(message = "Comment ID must be positive") Long id,
        @Valid @RequestBody CommentDto commentDto,
        @org.springframework.security.core.annotation.AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {

        ApiResponse<?> response = commentService.updateComment(id, commentDto, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    /*
     * URL - DELETE http://host:port/api/comments/{id}
     * Header - User-Id (requesting user)
     * Success - 200 OK
     * Error - 403 Forbidden, 404 Not Found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(
        @PathVariable @Positive(message = "Comment ID must be positive") Long id,
        @org.springframework.security.core.annotation.AuthenticationPrincipal com.taskbuddy.entity.User currentUser) {

        ApiResponse<?> response = commentService.deleteComment(id, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    /*
     * URL - GET http://host:port/api/comments
     * Success - 200 OK with list of all comments
     * Error - 500 Internal Server Error
     */
    @GetMapping
    public ResponseEntity<?> getAllComments() {
        ApiResponse<?> response = commentService.getAllComments();
        return ResponseEntity.ok(response);
    }
}
