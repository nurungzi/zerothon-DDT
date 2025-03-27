package com.zerothon.zerothon_ddt.domain.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;
}
