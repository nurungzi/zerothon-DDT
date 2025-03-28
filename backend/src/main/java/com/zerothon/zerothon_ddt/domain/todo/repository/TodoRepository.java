package com.zerothon.zerothon_ddt.domain.todo.repository;

import com.zerothon.zerothon_ddt.domain.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {
}
