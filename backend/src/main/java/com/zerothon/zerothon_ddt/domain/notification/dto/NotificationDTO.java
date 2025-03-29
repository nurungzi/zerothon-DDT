package com.zerothon.zerothon_ddt.domain.notification.dto;

import com.zerothon.zerothon_ddt.domain.notification.entity.Notification;
import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationState;
import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationType;
import com.zerothon.zerothon_ddt.domain.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class NotificationDTO {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class NotificationRequest{
        private NotificationType type;

        private Long requesterId;

        private String content;

        private Long responserId;

        private Long sourceId;

        public Notification toEntity(){
            return Notification.builder()
                    .type(type)
                    .sourceId(sourceId)
                    .build();
        }
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class NotificationResponse{
        private Long id;

        private NotificationType type;

        private NotificationState state;

        private UserDTO.UserResponse requester;

        private String content;

        private UserDTO.UserResponse responser;

        private LocalDateTime createdAt;

        public NotificationResponse(Notification notification){
            this.id = notification.getId();
            this.type = notification.getType();
            this.state = notification.getState();
            this.requester = new UserDTO.UserResponse(notification.getRequester());
            this.responser = new UserDTO.UserResponse(notification.getResponser());
            this.content = notification.getContent();
            this.createdAt = notification.getCreatedAt();
        }
    }
}
