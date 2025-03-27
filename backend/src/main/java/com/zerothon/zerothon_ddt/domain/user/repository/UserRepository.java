package com.zerothon.zerothon_ddt.domain.user.repository;


import com.zerothon.zerothon_ddt.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
