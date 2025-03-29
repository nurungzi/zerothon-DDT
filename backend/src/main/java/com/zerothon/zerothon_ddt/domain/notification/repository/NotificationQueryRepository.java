package com.zerothon.zerothon_ddt.domain.notification.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.zerothon.zerothon_ddt.domain.notification.entity.Notification;
import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.zerothon.zerothon_ddt.domain.notification.entity.QNotification.notification;
@Repository
@RequiredArgsConstructor
public class NotificationQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Notification> getAllWaitingNotification(Long id){
        return jpaQueryFactory.selectFrom(notification)
                .where(notification.responser.id.eq(id).and(notification.state.eq(NotificationState.WAITING)))
                .fetch();
    }

}
