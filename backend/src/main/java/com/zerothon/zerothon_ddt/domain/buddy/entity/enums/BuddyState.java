package com.zerothon.zerothon_ddt.domain.buddy.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BuddyState {
    WAITING("대기중"),
    FRIEND("친구"),
    REFUSE("거절");

    String value;
}
