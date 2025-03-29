package com.zerothon.zerothon_ddt.domain.buddy.dto;

import com.zerothon.zerothon_ddt.domain.buddy.entity.Buddy;
import com.zerothon.zerothon_ddt.domain.buddy.entity.enums.BuddyState;
import com.zerothon.zerothon_ddt.domain.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class BuddyDTO {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class BuddyRequest{
        private Long requesterId;

        private Long responserId;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class BuddyResponse{
        private Long id;

        private UserDTO.UserResponse requester;

        private UserDTO.UserResponse responser;

        private BuddyState state;

        private LocalDateTime createdAt;

        public BuddyResponse(Buddy buddy){
            this.id = buddy.getId();
            this.requester = new UserDTO.UserResponse(buddy.getRequester());
            this.responser = new UserDTO.UserResponse(buddy.getResponser());
            this.state = buddy.getState();
            this.createdAt = buddy.getCreatedAt();
        }
    }
}
