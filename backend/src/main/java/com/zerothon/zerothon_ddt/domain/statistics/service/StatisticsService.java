package com.zerothon.zerothon_ddt.domain.statistics.service;

import com.zerothon.zerothon_ddt.common.error.Message;
import com.zerothon.zerothon_ddt.common.exception.GlobalException;
import com.zerothon.zerothon_ddt.domain.buddy.entity.Buddy;
import com.zerothon.zerothon_ddt.domain.statistics.dto.StatisticsDTO;
import com.zerothon.zerothon_ddt.domain.todo.dto.TodoDTO;
import com.zerothon.zerothon_ddt.domain.todo.entity.Todo;
import com.zerothon.zerothon_ddt.domain.todo.repository.TodoQueryRepository;
import com.zerothon.zerothon_ddt.domain.todo.repository.TodoRepository;
import com.zerothon.zerothon_ddt.domain.user.dto.UserDTO;
import com.zerothon.zerothon_ddt.domain.user.entity.User;
import com.zerothon.zerothon_ddt.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final TodoQueryRepository todoQueryRepository;
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    @Transactional
    public StatisticsDTO.StatisticsResponse getUserStatistics(Long id){

        User user = userRepository.findById(id).orElseThrow(()->new GlobalException(Message.USER_NOT_FOUND.getMessage()));
        Long totalEndTodo = todoQueryRepository.getTotalEndTodo(id);
        if(totalEndTodo.equals(0L)){
            throw new GlobalException(Message.NO_END_TODO.getMessage());
        }
        List<Todo> successTodo = todoQueryRepository.getSuccessTodo(id);
        List<Todo> failTodo = todoQueryRepository.getFailTodo(id);
        Double successPercent = Math.round(((double)successTodo.size() / (double)totalEndTodo) * 1000) / 10.0;
        Double failPercent = Math.round(((double)failTodo.size() / (double)totalEndTodo) * 1000) / 10.0;

        User bestBuddy = todoQueryRepository.findBestBuddy(id).orElseThrow(()->new GlobalException(Message.USER_NOT_FOUND.getMessage()));

        List<TodoDTO.TodoResponse> successTodoResponse = new ArrayList<>();
        for(Todo t:successTodo){
            successTodoResponse.add(new TodoDTO.TodoResponse(t));
        }

        List<TodoDTO.TodoResponse> failTodoResponse = new ArrayList<>();
        for(Todo t:failTodo){
            failTodoResponse.add(new TodoDTO.TodoResponse(t));
        }

        return new StatisticsDTO.StatisticsResponse(
                new UserDTO.UserResponse(user),
                successPercent, failPercent,
                successTodoResponse, failTodoResponse, new UserDTO.UserResponse(bestBuddy));
    }
}
