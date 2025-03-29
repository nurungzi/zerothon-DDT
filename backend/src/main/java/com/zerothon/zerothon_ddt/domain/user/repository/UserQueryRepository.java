package com.zerothon.zerothon_ddt.domain.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zerothon.zerothon_ddt.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.zerothon.zerothon_ddt.domain.user.entity.QUser.user;

@Repository
@RequiredArgsConstructor
public class UserQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public Optional<User> findLogin(String loginId, String password){
        User result = jpaQueryFactory.selectFrom(user)
                .where(user.loginId.eq(loginId).and(user.password.eq(password)))
                .fetchFirst();

        return Optional.ofNullable(result);
    }
}
