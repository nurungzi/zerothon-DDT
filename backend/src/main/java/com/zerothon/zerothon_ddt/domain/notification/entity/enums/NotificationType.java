package com.zerothon.zerothon_ddt.domain.notification.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationType {
    FRIENDREQUEST("친구신청"),
    TODOBUDDY("버디지정"),
    TODODONE("할일완료");

    String value;
}
