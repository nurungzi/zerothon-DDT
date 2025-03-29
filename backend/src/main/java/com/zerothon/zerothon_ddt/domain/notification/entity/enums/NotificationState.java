package com.zerothon.zerothon_ddt.domain.notification.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationState {
    WAITING("대기중"),
    ACCEPT("수락"),
    REFUSE("거절");

    String value;
}
