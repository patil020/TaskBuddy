package com.taskbuddy.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Long id;
    
    @NotBlank(message = "Comment message is required")
    @Size(min = 1, max = 500, message = "Comment must be between 1 and 500 characters")
    private String message;
    
    // Alternative field name for content (frontend compatibility)
    private String content;
    
    private Long userId; // Set by controller from authenticated user
    
    @Positive(message = "Task ID must be a positive number")
    private Long taskId;
    
    @Positive(message = "Project ID must be a positive number")
    private Long projectId;
    
    // Additional fields for frontend display
    private String authorName;
    private String createdAt;
    private String updatedAt;
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getTaskId() {
        return taskId;
    }
    
    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
    
    public Long getProjectId() {
        return projectId;
    }
    
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
    
    public String getAuthorName() {
        return authorName;
    }
    
    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
