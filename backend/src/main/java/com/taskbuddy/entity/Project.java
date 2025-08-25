package com.taskbuddy.entity;

import jakarta.persistence.*;
import lombok.*;
import com.taskbuddy.enums.ProjectStatus;
import java.util.List;
import java.util.ArrayList;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Project extends BaseEntity {
    @Column(nullable = false)
    @NotBlank(message = "Project name is required")
    @Size(min = 3, max = 100, message = "Project name must be between 3 and 100 characters")
    private String name;
    
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Project status is required")
    private ProjectStatus status = ProjectStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    @NotNull(message = "Project manager is required")
    private User manager;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectMember> projectMembers = new ArrayList<>();

    public void addTask(Task task){
        tasks.add(task);
        task.setProject(this);
    }

    public void removeTask(Task task){
        tasks.remove(task);
        task.setProject(null);
    }

    public void addComment(Comment comment){
        comments.add(comment);
        comment.setProject(this);
    }

    public void removeComment(Comment comment){
        comments.remove(comment);
        comment.setProject(null);
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public ProjectStatus getStatus() {
        return status;
    }
    
    public void setStatus(ProjectStatus status) {
        this.status = status;
    }
    
    public User getManager() {
        return manager;
    }
    
    public void setManager(User manager) {
        this.manager = manager;
    }
    
    public List<Task> getTasks() {
        return tasks;
    }
    
    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
    
    public List<Comment> getComments() {
        return comments;
    }
    
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    
    public List<ProjectMember> getProjectMembers() {
        return projectMembers;
    }
    
    public void setProjectMembers(List<ProjectMember> projectMembers) {
        this.projectMembers = projectMembers;
    }
}
