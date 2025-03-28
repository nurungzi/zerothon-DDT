package com.zerothon.zerothon_ddt.domain.todo.dto;

import com.zerothon.zerothon_ddt.domain.todo.entity.Todo;
import com.zerothon.zerothon_ddt.domain.todo.entity.enums.TodoState;
import com.zerothon.zerothon_ddt.domain.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


public class TodoDTO {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class TodoRequest{
        private String title;

        private String content;

        private LocalDate startDate;

        private LocalDate endDate;

        private Long userId;

        public Todo toEntity(){
            return Todo.builder()
                    .title(title)
                    .content(content)
                    .startDate(startDate)
                    .endDate(endDate)
                    .build();
        }
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class TodoResponse {
        private Long id;

        private String title;

        private String content;

        private LocalDate startDate;

        private LocalDate endDate;

        private LocalDateTime createdAt;

        private TodoState state;

        private UserDTO.UserResponse user;

        public TodoResponse(Todo todo){
            this.id = todo.getId();
            this.title = todo.getTitle();
            this.content = todo.getContent();
            this.startDate = todo.getStartDate();
            this.endDate = todo.getEndDate();
            this.createdAt = todo.getCreatedAt();
            this.state = todo.getState();
            this.user = new UserDTO.UserResponse(todo.getUser());
        }
    }
}
