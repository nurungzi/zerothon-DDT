package com.zerothon.zerothon_ddt.domain.buddy.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zerothon.zerothon_ddt.domain.buddy.entity.Buddy;
import com.zerothon.zerothon_ddt.domain.buddy.entity.enums.BuddyState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.zerothon.zerothon_ddt.domain.buddy.entity.QBuddy.buddy;
@Repository
@RequiredArgsConstructor
public class BuddyQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Buddy> findBuddies(Long id){
        return jpaQueryFactory.selectFrom(buddy)
                .where(buddy.requester.id.eq(id)
                        .or(buddy.responser.id.eq(id))
                        .and(buddy.state.eq(BuddyState.FRIEND)))
                .fetch();
    }
}
