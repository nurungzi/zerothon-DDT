package com.zerothon.zerothon_ddt.domain.notification.entity;

import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationState;
import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationType;
import com.zerothon.zerothon_ddt.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @Enumerated(EnumType.STRING)
    private NotificationState state;

    @ManyToOne
    @JoinColumn(name = "requesterId")
    private User requester;

    private String content;

    @ManyToOne
    @JoinColumn(name = "responserId")
    private User responser;

    private Long sourceId;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
