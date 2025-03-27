package com.zerothon.zerothon_ddt.domain.user.service;

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
}
