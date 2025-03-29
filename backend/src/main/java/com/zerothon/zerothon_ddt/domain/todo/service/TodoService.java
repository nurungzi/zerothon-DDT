package com.zerothon.zerothon_ddt.domain.todo.service;

import com.zerothon.zerothon_ddt.common.error.Message;
import com.zerothon.zerothon_ddt.common.exception.GlobalException;
import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationType;
import com.zerothon.zerothon_ddt.domain.notification.service.NotificationService;
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

    private final NotificationService notificationService;

    @Transactional
    public TodoDTO.TodoResponse createTodo(TodoDTO.TodoRequest request){
        Todo todo = request.toEntity();

        todo.setUser(userRepository.findById(request.getUserId()).orElseThrow(() -> new GlobalException(Message.USER_NOT_FOUND.getMessage())));
        todo.setState(TodoState.CREATE);
        todo.setBuddy(userRepository.findById(request.getBuddyId()).orElseThrow(()-> new GlobalException(Message.USER_NOT_FOUND.getMessage())));

        Todo realTodo = todoRepository.save(todo);

        notificationService.createNotification(NotificationType.TODOBUDDY,request.getUserId(), request.getBuddyId(), realTodo.getId());

        return new TodoDTO.TodoResponse(realTodo);
    }

    @Transactional
    public TodoDTO.TodoResponse doneTodo(Long id){
        Todo todoOrigin = todoRepository.findById(id).orElseThrow(()->new GlobalException(Message.SOURCE_NOT_FOUND.getMessage()));
        todoOrigin.setState(TodoState.WAITING);

        Todo todo = todoRepository.save(todoOrigin);

        notificationService.createNotification(NotificationType.TODODONE, todo.getUser().getId(), todo.getBuddy().getId(), todo.getId());

        return new TodoDTO.TodoResponse(todo);
    }
}
