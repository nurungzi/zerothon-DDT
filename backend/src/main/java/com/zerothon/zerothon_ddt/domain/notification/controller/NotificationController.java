package com.zerothon.zerothon_ddt.domain.notification.controller;

import com.zerothon.zerothon_ddt.domain.notification.dto.NotificationDTO;
import com.zerothon.zerothon_ddt.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @PutMapping("/accept")
    public NotificationDTO.NotificationResponse acceptNotification(@RequestParam Long id){
        return notificationService.acceptNotification(id);
    }
}
