package com.zerothon.zerothon_ddt.domain.todo.controller;

import com.zerothon.zerothon_ddt.domain.todo.dto.TodoDTO;
import com.zerothon.zerothon_ddt.domain.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping()
    public TodoDTO.TodoResponse createTodo(@RequestBody TodoDTO.TodoRequest request){
        return todoService.createTodo(request);
    }

    @PutMapping("/done")
    public TodoDTO.TodoResponse doneTodo(@RequestParam Long id){
        return todoService.doneTodo(id);
    }

    @GetMapping("/date")
    public List<TodoDTO.TodoListResponseByDate> getTodos(@RequestParam Long id){
        return todoService.getTodos(id);
    }

    @GetMapping("/waiting")
    public List<TodoDTO.TodoResponse> getWaitingTodo(@RequestParam Long id){
        return todoService.getWaitingTodo(id);
    }

    @GetMapping("/friend")
    public List<TodoDTO.TodoResponse> getFriendTodo(@RequestParam Long id, @RequestParam Long friendId){
        return todoService.getFriendTodo(id, friendId);
    }
}
