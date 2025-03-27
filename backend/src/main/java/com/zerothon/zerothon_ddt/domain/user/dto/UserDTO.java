package com.zerothon.zerothon_ddt.domain.user.dto;

import com.zerothon.zerothon_ddt.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class UserDTO {

    @AllArgsConstructor
    @Builder
    @Getter
    @Setter
    public static class UserRequest{
        private String loginId;

        private String password;

        private String name;

        public User toEntity(){
            return User.builder()
                    .loginId(loginId)
                    .password(password)
                    .name(name)
                    .build();
        }
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class UserResponse{
        private Long id;

        private String loginId;

        private String password;

        private String name;

        private LocalDateTime createdAt;

        public UserResponse(User user){
            this.id = user.getId();
            this.loginId = user.getLoginId();
            this.password = user.getPassword();
            this.name = user.getName();
            this.createdAt = user.getCreatedAt();
        }
    }
}
