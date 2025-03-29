package com.zerothon.zerothon_ddt.domain.buddy.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BuddyQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;
}
