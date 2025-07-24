package com.sunbeam.entities;

import com.sunbeam.enums.UserRole;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString(callSuper = true)
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 255, nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private UserRole role;

    @Column(length = 255)
    private String profilePictureUrl;

    @Column(nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Project> ownedProjects = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<ProjectMember> memberships = new ArrayList<>();

    @OneToMany(mappedBy = "assignee", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Task> assignedTasks = new ArrayList<>();

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Task> createdTasks = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<ProjectComment> projectComments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<TaskComment> taskComments = new ArrayList<>();

    @OneToMany(mappedBy = "uploadedBy", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<ProjectAttachment> uploadedProjectAttachments = new ArrayList<>();

    @OneToMany(mappedBy = "uploadedBy", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<TaskAttachment> uploadedTaskAttachments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<ActivityLog> activityLogs = new ArrayList<>();

    // Helper methods

    public void addOwnedProject(Project project) {
        this.ownedProjects.add(project);
        project.setOwner(this);
    }

    public void removeOwnedProject(Project project) {
        this.ownedProjects.remove(project);
        project.setOwner(null);
    }

    public void addMembership(ProjectMember member) {
        this.memberships.add(member);
        member.setUser(this);
    }

    public void removeMembership(ProjectMember member) {
        this.memberships.remove(member);
        member.setUser(null);
    }

    public void addAssignedTask(Task task) {
        this.assignedTasks.add(task);
        task.setAssignee(this);
    }

    public void removeAssignedTask(Task task) {
        this.assignedTasks.remove(task);
        task.setAssignee(null);
    }

    public void addCreatedTask(Task task) {
        this.createdTasks.add(task);
        task.setCreatedBy(this);
    }

    public void removeCreatedTask(Task task) {
        this.createdTasks.remove(task);
        task.setCreatedBy(null);
    }

    public void addProjectComment(ProjectComment comment) {
        this.projectComments.add(comment);
        comment.setUser(this);
    }

    public void removeProjectComment(ProjectComment comment) {
        this.projectComments.remove(comment);
        comment.setUser(null);
    }

    public void addTaskComment(TaskComment comment) {
        this.taskComments.add(comment);
        comment.setUser(this);
    }

    public void removeTaskComment(TaskComment comment) {
        this.taskComments.remove(comment);
        comment.setUser(null);
    }

    public void addUploadedProjectAttachment(ProjectAttachment attachment) {
        this.uploadedProjectAttachments.add(attachment);
        attachment.setUploadedBy(this);
    }

    public void removeUploadedProjectAttachment(ProjectAttachment attachment) {
        this.uploadedProjectAttachments.remove(attachment);
        attachment.setUploadedBy(null);
    }

    public void addUploadedTaskAttachment(TaskAttachment attachment) {
        this.uploadedTaskAttachments.add(attachment);
        attachment.setUploadedBy(this);
    }

    public void removeUploadedTaskAttachment(TaskAttachment attachment) {
        this.uploadedTaskAttachments.remove(attachment);
        attachment.setUploadedBy(null);
    }

    public void addActivityLog(ActivityLog log) {
        this.activityLogs.add(log);
        log.setUser(this);
    }

    public void removeActivityLog(ActivityLog log) {
        this.activityLogs.remove(log);
        log.setUser(null);
    }
}
