package com.zerothon.zerothon_ddt.domain.user.service;

import com.zerothon.zerothon_ddt.common.error.Message;
import com.zerothon.zerothon_ddt.common.exception.GlobalException;
import com.zerothon.zerothon_ddt.domain.user.dto.UserDTO;
import com.zerothon.zerothon_ddt.domain.user.entity.User;
import com.zerothon.zerothon_ddt.domain.user.repository.UserQueryRepository;
import com.zerothon.zerothon_ddt.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserQueryRepository userQueryRepository;

    @Transactional
    public UserDTO.UserResponse createUser(UserDTO.UserRequest request){
        User user = userRepository.save(request.toEntity());

        return new UserDTO.UserResponse(user);
    }

    @Transactional
    public UserDTO.UserResponse loginUser(String loginId, String password){
        User user = userQueryRepository.findLogin(loginId, password).orElseThrow(() -> new GlobalException(Message.CANNOT_LOGIN.getMessage()));
        return new UserDTO.UserResponse(user);
    }
}
