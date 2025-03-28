package com.zerothon.zerothon_ddt.domain.buddy.entity;

import com.zerothon.zerothon_ddt.domain.buddy.entity.enums.BuddyState;
import com.zerothon.zerothon_ddt.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "buddy")
public class Buddy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "requesterId")
    private User requester;

    @ManyToOne
    @JoinColumn(name = "responserId")
    private User responser;

    @Enumerated(EnumType.STRING)
    private BuddyState state;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
