package com.zerothon.zerothon_ddt.domain.user.controller;

import com.zerothon.zerothon_ddt.domain.user.dto.UserDTO;
import com.zerothon.zerothon_ddt.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping()
    public UserDTO.UserResponse createUser(@RequestBody UserDTO.UserRequest request){
        return userService.createUser(request);
    }
}
