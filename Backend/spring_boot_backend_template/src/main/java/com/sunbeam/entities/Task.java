package com.sunbeam.entities;

import com.sunbeam.enums.TaskPriority;
import com.sunbeam.enums.TaskStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString(callSuper = true)
@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

    @Column(length = 200, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private TaskStatus status;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private TaskPriority priority;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column
    private Integer estimatedHours;

    @Column
    private Integer timeSpent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    @ToString.Exclude
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id")
    @ToString.Exclude
    private User assignee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    @ToString.Exclude
    private User createdBy;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<TaskAttachment> attachments = new ArrayList<>();

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<TaskComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<ActivityLog> activityLogs = new ArrayList<>();

    // Helper methods

    public void addAttachment(TaskAttachment attachment) {
        this.attachments.add(attachment);
        attachment.setTask(this);
    }

    public void removeAttachment(TaskAttachment attachment) {
        this.attachments.remove(attachment);
        attachment.setTask(null);
    }

    public void addComment(TaskComment comment) {
        this.comments.add(comment);
        comment.setTask(this);
    }

    public void removeComment(TaskComment comment) {
        this.comments.remove(comment);
        comment.setTask(null);
    }

    public void addActivityLog(ActivityLog log) {
        this.activityLogs.add(log);
        log.setTask(this);
    }

    public void removeActivityLog(ActivityLog log) {
        this.activityLogs.remove(log);
        log.setTask(null);
    }
}
