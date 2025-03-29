package com.zerothon.zerothon_ddt.domain.todo.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zerothon.zerothon_ddt.domain.todo.dto.TodoDTO;
import com.zerothon.zerothon_ddt.domain.todo.entity.Todo;
import com.zerothon.zerothon_ddt.domain.todo.entity.enums.TodoState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.zerothon.zerothon_ddt.domain.todo.entity.QTodo.todo;

@Repository
@RequiredArgsConstructor
public class TodoQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Todo> findTodoList(Long id){
        return jpaQueryFactory.selectFrom(todo)
                .where(todo.user.id.eq(id)
                        .and(todo.state.eq(TodoState.DOING)))
                .orderBy(todo.endDate.asc())
                .fetch();
    }

    public List<LocalDate> getTodoEndDateById(Long id) {
        return jpaQueryFactory.select(todo.endDate)
                .from(todo)
                .where(todo.user.id.eq(id))
                .orderBy(todo.endDate.asc())
                .distinct()
                .fetch();
    }

    public List<Todo> getWaitingTodoList(Long id){
        return jpaQueryFactory.selectFrom(todo)
                .where(todo.user.id.eq(id)
                        .and(todo.state.eq(TodoState.WAITING)))
                .orderBy(todo.endDate.asc())
                .fetch();
    }
}
