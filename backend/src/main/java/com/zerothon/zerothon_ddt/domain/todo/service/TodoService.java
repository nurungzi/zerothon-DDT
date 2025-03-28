package com.zerothon.zerothon_ddt.domain.todo.service;

import com.zerothon.zerothon_ddt.common.error.Message;
import com.zerothon.zerothon_ddt.common.exception.GlobalException;
import com.zerothon.zerothon_ddt.domain.todo.dto.TodoDTO;
import com.zerothon.zerothon_ddt.domain.todo.entity.Todo;
import com.zerothon.zerothon_ddt.domain.todo.entity.enums.TodoState;
import com.zerothon.zerothon_ddt.domain.todo.repository.TodoQueryRepository;
import com.zerothon.zerothon_ddt.domain.todo.repository.TodoRepository;
import com.zerothon.zerothon_ddt.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoQueryRepository todoQueryRepository;
    private final TodoRepository todoRepository;

    private final UserRepository userRepository;

    @Transactional
    public TodoDTO.TodoResponse createTodo(TodoDTO.TodoRequest request){
        Todo todo = request.toEntity();

        todo.setUser(userRepository.findById(request.getUserId()).orElseThrow(() -> new GlobalException(Message.USER_NOT_FOUND.getMessage())));
        todo.setState(TodoState.CREATE);

        Todo realTodo = todoRepository.save(todo);

        return new TodoDTO.TodoResponse(realTodo);
    }
}
