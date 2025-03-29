package com.zerothon.zerothon_ddt.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Message {
    USER_NOT_FOUND("유저를 찾을 수 없습니다."),
    WRONG_PASSWORD("패스워드를 확인해주세요"),
    WRONG_USERNAME("ID를 확인해주세요."),
    CANNOT_LOGIN("로그인할 수 없음."),
    SOURCE_NOT_FOUND("원본 데이터를 찾을 수 없습니다.");

    String message;
}
