package com.zerothon.zerothon_ddt.domain.todo.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zerothon.zerothon_ddt.domain.todo.dto.TodoDTO;
import com.zerothon.zerothon_ddt.domain.todo.entity.Todo;
import com.zerothon.zerothon_ddt.domain.todo.entity.enums.TodoState;
import com.zerothon.zerothon_ddt.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    public Long getTotalEndTodo(Long id){
        return (long) jpaQueryFactory.selectFrom(todo)
                .where(todo.user.id.eq(id)
                        .and(todo.state.in(TodoState.DONE, TodoState.FAIL)))
                .fetch().size();
    }

    public List<Todo> getSuccessTodo(Long id) {
        return jpaQueryFactory.selectFrom(todo)
                .where(todo.user.id.eq(id)
                        .and(todo.state.eq(TodoState.DONE)))
                .fetch();
    }

    public List<Todo> getFailTodo(Long id){
        return jpaQueryFactory.selectFrom(todo)
                .where(todo.user.id.eq(id)
                        .and(todo.state.eq(TodoState.FAIL)))
                .fetch();
    }

    public Optional<User> findBestBuddy(Long userId) {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(todo.buddy)  // ✅ 가장 많이 등장한 buddy (User 객체)
                        .from(todo)
                        .where(todo.user.id.eq(userId))  // 특정 user_id의 todo 조회
                        .groupBy(todo.buddy)  // buddy 기준 그룹화
                        .orderBy(todo.buddy.count().desc())  // 등장 횟수 많은 순 정렬
                        .limit(1)  // 한 개만 가져오기
                        .fetchOne()
        );
    }

}
