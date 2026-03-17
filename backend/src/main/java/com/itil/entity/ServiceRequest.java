package com.itil.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private Category category; // Enum 적용

    @Column(nullable = false)
    private String requester;

    private String department;
    private String assignee;

    @Column(nullable = false)
    private LocalDate requestDate;
    
    private LocalDate targetDate;
    private LocalDateTime completionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Status status = Status.OPEN; // Enum 적용

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Priority priority = Priority.NORMAL; // Enum 적용

    @Column(columnDefinition = "TEXT")
    private String resolution;
}