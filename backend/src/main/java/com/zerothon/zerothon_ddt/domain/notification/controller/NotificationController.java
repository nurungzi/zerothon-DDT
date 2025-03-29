package com.zerothon.zerothon_ddt.domain.notification.controller;

import com.zerothon.zerothon_ddt.domain.notification.dto.NotificationDTO;
import com.zerothon.zerothon_ddt.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/waiting")
    public List<NotificationDTO.NotificationResponse> getAllWaitingNotification(@RequestParam Long id){
        return notificationService.getAllWaitingNotification(id);
    }

    @PutMapping("/accept")
    public NotificationDTO.NotificationResponse acceptNotification(@RequestParam Long id){
        return notificationService.acceptNotification(id);
    }
}
