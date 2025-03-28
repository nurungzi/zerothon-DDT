package com.zerothon.zerothon_ddt.domain.todo.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TodoState {
    CREATE("생성"),
    DOING("진행중"),
    WAITING("대기중"),
    DONE("완료"),
    FAIL("실패");

    String value;
}
