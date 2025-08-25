package com.taskbuddy.entity;

import jakarta.persistence.*;
import lombok.*;
import com.taskbuddy.enums.TaskStatus;
import com.taskbuddy.enums.TaskPriority;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDate;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Task extends BaseEntity {
    @Column(nullable = false, length = 100)
    @NotBlank(message = "Task title is required")
    @Size(min = 3, max = 100, message = "Task title must be between 3 and 100 characters")
    private String title;
    
    @Column(length = 1000)
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @NotNull(message = "Task status is required")
    private TaskStatus status = TaskStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Task priority is required")
    private TaskPriority priority = TaskPriority.MEDIUM;

    // Due date for the task (optional)
    @Column(name = "due_date")
    private LocalDate dueDate;

    // Task assigned to a team member (can be null if unassigned)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_user_id")
    private User assignedUser;

    // Task belongs to a project (required - tasks are parts of projects)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    @NotNull(message = "Task must belong to a project")
    private Project project;

    // Comments on this task
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    // Helper methods for bi-directional relationships
    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setTask(this);
    }
    
    public void removeComment(Comment comment) {
        comments.remove(comment);
        comment.setTask(null);
    }
    
    // Business logic helper methods
    public boolean isAssigned() {
        return assignedUser != null;
    }
    
    public boolean isCreatedByManager(User user) {
        return project.getManager().getId().equals(user.getId());
    }
    
    public boolean isAssignedToUser(User user) {
        return assignedUser != null && assignedUser.getId().equals(user.getId());
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public TaskStatus getStatus() {
        return status;
    }
    
    public void setStatus(TaskStatus status) {
        this.status = status;
    }
    
    public TaskPriority getPriority() {
        return priority;
    }
    
    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }
    
    public LocalDate getDueDate() {
        return dueDate;
    }
    
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
    
    public User getAssignedUser() {
        return assignedUser;
    }
    
    public void setAssignedUser(User assignedUser) {
        this.assignedUser = assignedUser;
    }
    
    public Project getProject() {
        return project;
    }
    
    public void setProject(Project project) {
        this.project = project;
    }
    
    public List<Comment> getComments() {
        return comments;
    }
    
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
