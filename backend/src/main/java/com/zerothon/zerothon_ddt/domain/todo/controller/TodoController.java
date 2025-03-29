package com.zerothon.zerothon_ddt.domain.todo.controller;

import com.zerothon.zerothon_ddt.domain.todo.dto.TodoDTO;
import com.zerothon.zerothon_ddt.domain.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping()
    public TodoDTO.TodoResponse createTodo(@RequestBody TodoDTO.TodoRequest request){
        return todoService.createTodo(request);
    }
}
