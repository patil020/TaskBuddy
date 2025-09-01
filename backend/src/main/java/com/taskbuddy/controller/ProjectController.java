package com.taskbuddy.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import com.taskbuddy.service.ProjectService;
import com.taskbuddy.service.AuthorizationService;
import com.taskbuddy.dto.ProjectDto;
import com.taskbuddy.dto.ApiResponse;
import com.taskbuddy.enums.ProjectStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.taskbuddy.entity.User;
@RestController
@RequestMapping("/api/projects")
@AllArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final AuthorizationService authorizationService;

    /*
     * URL - POST http://host:port/projects
     * Payload - ProjectDto (JSON)
     * Success - 201 Created
     * Error - 400 Bad Request, 404 Not Found
     * Note: Creator automatically becomes project manager
     */
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createProject(
        @Valid @RequestBody ProjectDto projectDto,
        @AuthenticationPrincipal User currentUser) {
        // Any authenticated user can create a project and becomes its manager
        projectDto.setManagerId(currentUser.getId());
        ApiResponse<?> response = projectService.createProject(projectDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /*
     * URL - PUT http://host:port/projects/{projectId}/status?status=ACCEPTED
     * Success - 200 OK
     * Error - 400 Bad Request, 404 Not Found
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<?>> updateStatus(
        @PathVariable @Positive(message = "Project ID must be positive") Long id,
        @RequestParam @NotNull(message = "Status is required") ProjectStatus status) {

        ApiResponse<?> response = projectService.updateProjectStatus(id, status);
        return ResponseEntity.ok(response);
    }
    
    /*
     * URL - PUT http://host:port/projects/{projectId}
     * Payload - ProjectDto (JSON)
     * Header - User-Id (requesting user)
     * Success - 200 OK
     * Error - 400 Bad Request, 403 Forbidden, 404 Not Found
     * Note: Only project manager can update project details
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateProject(
        @PathVariable @Positive(message = "Project ID must be positive") Long id,
        @Valid @RequestBody ProjectDto projectDto,
        @AuthenticationPrincipal User currentUser) {
        ApiResponse<?> response = projectService.updateProject(id, projectDto, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    /*
     * URL - GET http://host:port/api/projects
     * Success - 200 OK with list of projects
     * Error - 500 Internal Server Error
     */
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllProjects() {
        ApiResponse<?> response = projectService.getAllProjects();
        return ResponseEntity.ok(response);
    }

    /*
     * URL - GET http://host:port/api/projects/{id}
     * Success - 200 OK with project details
     * Error - 404 Not Found
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getProjectById(
        @PathVariable @Positive(message = "Project ID must be positive") Long id,
        @AuthenticationPrincipal User currentUser) {
        authorizationService.checkProjectAccess(id, currentUser.getId());
        ApiResponse<?> response = projectService.getProjectById(id);
        return ResponseEntity.ok(response);
    }

    /*
     * URL - GET http://host:port/api/projects/user/{userId}
     * Success - 200 OK with user's projects
     * Error - 404 Not Found
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<?>> getProjectsByUserId(
        @PathVariable @Positive(message = "User ID must be positive") Long userId) {
        ApiResponse<?> response = projectService.getProjectsByUserId(userId);
        return ResponseEntity.ok(response);
    }

    /*
     * URL - POST http://host:port/api/projects/{projectId}/members
     * Payload - { "userId": 123 }
     * Header - User-Id (requesting user, must be project manager)
     * Success - 200 OK
     * Error - 400 Bad Request, 403 Forbidden, 404 Not Found
     */
    @PostMapping("/{projectId}/members")
    public ResponseEntity<ApiResponse<?>> assignMember(
        @PathVariable @Positive(message = "Project ID must be positive") Long projectId,
        @RequestParam @Positive(message = "User ID must be positive") Long userId,
        @AuthenticationPrincipal User currentUser) {
        ApiResponse<?> response = projectService.assignMemberToProject(projectId, userId, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    /*
     * URL - DELETE http://host:port/api/projects/{projectId}/members/{userId}
     * Header - User-Id (requesting user, must be project manager)
     * Success - 200 OK
     * Error - 403 Forbidden, 404 Not Found
     */
    /**
     * Remove a member from a project. Only the project manager can perform this action.
     * @param projectId the project ID
     * @param userId the user ID to remove
     * @param currentUser the authenticated user
     * @return ApiResponse with operation result
     */
    @DeleteMapping("/{projectId}/members/{userId}")
    public ResponseEntity<ApiResponse<?>> removeMember(
        @PathVariable @Positive(message = "Project ID must be positive") Long projectId,
        @PathVariable @Positive(message = "User ID must be positive") Long userId,
        @AuthenticationPrincipal User currentUser) {
        ApiResponse<?> response = projectService.removeMemberFromProject(projectId, userId, currentUser.getId());
        return ResponseEntity.ok(response);
    }
}
