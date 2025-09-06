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
import org.springframework.validation.annotation.Validated;
import com.taskbuddy.entity.User;

@RestController
@RequestMapping("/api/projects")
@AllArgsConstructor
@Validated
public class ProjectController {

    private final ProjectService projectService;
    private final AuthorizationService authorizationService;

    /*
     * URL   - POST http://host:port/api/projects
     * Body  - ProjectDto (JSON)
     * 201 Created (creator becomes manager)
     */
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createProject(
        @Valid @RequestBody ProjectDto projectDto,
        @AuthenticationPrincipal User currentUser) {

        projectDto.setManagerId(currentUser.getId());
        ApiResponse<?> response = projectService.createProject(projectDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /*
     * URL   - PATCH http://host:port/api/projects/{id}/status?status=ACTIVE
     * 200 OK (manager-only)
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<?>> updateStatus(
        @PathVariable @Positive(message = "Project ID must be positive") Long id,
        @RequestParam @NotNull(message = "Status is required") ProjectStatus status,
        @AuthenticationPrincipal User currentUser) {

    authorizationService.checkProjectAccess(id, currentUser.getId());
        ApiResponse<?> response = projectService.updateProjectStatus(id, status);
        return ResponseEntity.ok(response);
    }

    /*
     * URL   - PUT http://host:port/api/projects/{id}
     * Body  - ProjectDto (JSON)
     * 200 OK (manager-only)
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
     * URL   - GET http://host:port/api/projects
     * 200 OK
     */
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllProjects() {
        ApiResponse<?> response = projectService.getAllProjects();
        return ResponseEntity.ok(response);
    }

    /*
     * URL   - GET http://host:port/api/projects/{id}
     * 200 OK, 404 Not Found
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
     * URL   - GET http://host:port/api/projects/user/{userId}
     * 200 OK
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<?>> getProjectsByUserId(
        @PathVariable @Positive(message = "User ID must be positive") Long userId) {

        ApiResponse<?> response = projectService.getProjectsByUserId(userId);
        return ResponseEntity.ok(response);
    }

    /*
     * URL   - POST http://host:port/api/projects/{projectId}/members?userId=123
     * 200 OK (manager-only)
     */
    @PostMapping("/{projectId}/members")
    public ResponseEntity<ApiResponse<?>> assignMember(
        @PathVariable @Positive(message = "Project ID must be positive") Long projectId,
        @RequestParam @Positive(message = "User ID must be positive") Long userId,
        @AuthenticationPrincipal User currentUser) {

        ApiResponse<?> response =
            projectService.assignMemberToProject(projectId, userId, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    /*
     * URL   - DELETE http://host:port/api/projects/{projectId}/members/{userId}
     * 204 No Content (manager-only)
     */
    @DeleteMapping("/{projectId}/members/{userId}")
    public ResponseEntity<Void> removeMember(
        @PathVariable @Positive(message = "Project ID must be positive") Long projectId,
        @PathVariable @Positive(message = "User ID must be positive") Long userId,
        @AuthenticationPrincipal User currentUser) {

        projectService.removeMemberFromProject(projectId, userId, currentUser.getId());
        return ResponseEntity.noContent().build();
    }
}
