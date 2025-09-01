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
    
}
