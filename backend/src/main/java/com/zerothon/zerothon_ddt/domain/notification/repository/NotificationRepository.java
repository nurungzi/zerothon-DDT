package com.zerothon.zerothon_ddt.domain.notification.repository;

import com.zerothon.zerothon_ddt.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    Optional<Notification> findById(Long id);
}
