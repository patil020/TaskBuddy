package com.sunbeam.entities;

import com.sunbeam.enums.ProjectStatus;
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
@Table(name = "projects")
public class Project extends BaseEntity {

    @Column(length = 200, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 30, nullable = false)
    private ProjectStatus status;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column
    private Integer duration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    @ToString.Exclude
    private User owner;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<ProjectMember> members = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<ProjectAttachment> attachments = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<ProjectComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<ActivityLog> activityLogs = new ArrayList<>();

    // Helper methods

    public void addTask(Task task) {
        this.tasks.add(task);
        task.setProject(this);
    }

    public void removeTask(Task task) {
        this.tasks.remove(task);
        task.setProject(null);
    }

    public void addMember(ProjectMember member) {
        this.members.add(member);
        member.setProject(this);
    }

    public void removeMember(ProjectMember member) {
        this.members.remove(member);
        member.setProject(null);
    }

    public void addAttachment(ProjectAttachment attachment) {
        this.attachments.add(attachment);
        attachment.setProject(this);
    }

    public void removeAttachment(ProjectAttachment attachment) {
        this.attachments.remove(attachment);
        attachment.setProject(null);
    }

    public void addComment(ProjectComment comment) {
        this.comments.add(comment);
        comment.setProject(this);
    }

    public void removeComment(ProjectComment comment) {
        this.comments.remove(comment);
        comment.setProject(null);
    }

    public void addActivityLog(ActivityLog log) {
        this.activityLogs.add(log);
        log.setProject(this);
    }

    public void removeActivityLog(ActivityLog log) {
        this.activityLogs.remove(log);
        log.setProject(null);
    }
}
