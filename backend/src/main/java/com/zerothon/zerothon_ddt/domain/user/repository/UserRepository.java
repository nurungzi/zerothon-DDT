package com.zerothon.zerothon_ddt.domain.user.repository;


import com.zerothon.zerothon_ddt.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findById(Long id);
}
