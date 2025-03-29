package com.zerothon.zerothon_ddt.domain.statistics.dto;

import com.zerothon.zerothon_ddt.domain.todo.dto.TodoDTO;
import com.zerothon.zerothon_ddt.domain.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class StatisticsDTO {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class StatisticsResponse{
        private UserDTO.UserResponse user;

        private Double successPercent;

        private Double failPercent;

        private List<TodoDTO.TodoResponse> successList;

        private List<TodoDTO.TodoResponse> failList;

        private UserDTO.UserResponse bestBuddy;
    }
}
