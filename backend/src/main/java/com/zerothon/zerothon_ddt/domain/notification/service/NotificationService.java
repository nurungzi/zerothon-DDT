package com.zerothon.zerothon_ddt.domain.notification.service;

import com.zerothon.zerothon_ddt.common.error.Message;
import com.zerothon.zerothon_ddt.common.exception.GlobalException;
import com.zerothon.zerothon_ddt.domain.buddy.entity.Buddy;
import com.zerothon.zerothon_ddt.domain.buddy.entity.enums.BuddyState;
import com.zerothon.zerothon_ddt.domain.buddy.repository.BuddyRepository;
import com.zerothon.zerothon_ddt.domain.notification.dto.NotificationDTO;
import com.zerothon.zerothon_ddt.domain.notification.entity.Notification;
import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationState;
import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationType;
import com.zerothon.zerothon_ddt.domain.notification.repository.NotificationQueryRepository;
import com.zerothon.zerothon_ddt.domain.notification.repository.NotificationRepository;
import com.zerothon.zerothon_ddt.domain.todo.entity.Todo;
import com.zerothon.zerothon_ddt.domain.todo.entity.enums.TodoState;
import com.zerothon.zerothon_ddt.domain.todo.repository.TodoRepository;
import com.zerothon.zerothon_ddt.domain.user.entity.User;
import com.zerothon.zerothon_ddt.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationQueryRepository notificationQueryRepository;

    private final BuddyRepository buddyRepository;
    private final TodoRepository todoRepository;

    private final UserRepository userRepository;

    @Transactional
    public List<NotificationDTO.NotificationResponse> getAllWaitingNotification(Long id){
        List<Notification> result = notificationQueryRepository.getAllWaitingNotification(id);
        List<NotificationDTO.NotificationResponse> list = new ArrayList<>();
        for(Notification e: result){
            list.add(new NotificationDTO.NotificationResponse(e));
        }

        return list;
    }


    @Transactional
    public NotificationDTO.NotificationResponse acceptNotification(Long id){
        Notification notification = notificationRepository.findById(id).orElseThrow(()->new GlobalException(Message.SOURCE_NOT_FOUND.getMessage()));
        notification.setState(NotificationState.ACCEPT);
        Long sourceId = notification.getSourceId();

        switch(notification.getType()){
            case NotificationType.FRIENDREQUEST:
                Buddy buddy = buddyRepository.findById(sourceId).orElseThrow(()->new GlobalException(Message.SOURCE_NOT_FOUND.getMessage()));
                buddy.setState(BuddyState.FRIEND);
                buddyRepository.save(buddy);
                break;
            case NotificationType.TODOBUDDY:
                Todo todo = todoRepository.findById(sourceId).orElseThrow(()-> new GlobalException(Message.SOURCE_NOT_FOUND.getMessage()));
                todo.setState(TodoState.DOING);
                todoRepository.save(todo);
                break;
            case NotificationType.TODODONE:
                Todo todo2 = todoRepository.findById(sourceId).orElseThrow(() -> new GlobalException(Message.SOURCE_NOT_FOUND.getMessage()));
                todo2.setState(TodoState.DONE);
                todoRepository.save(todo2);
                break;
        }

        Notification acceptNotification = notificationRepository.save(notification);

        return new NotificationDTO.NotificationResponse(acceptNotification);
    }

    @Transactional
    public Notification createNotification(NotificationType type, Long requesterId, Long responserId, Long sourceId){
        Notification notification = new Notification();

        notification.setState(NotificationState.WAITING);
        notification.setType(type);

        switch(type){
            case NotificationType.FRIENDREQUEST:
                notification.setContent("친구 요청이 왔어요.");
                break;
            case NotificationType.TODOBUDDY:
                notification.setContent("친구가 버디를 요청했어요.");
                break;
            case NotificationType.TODODONE:
                notification.setContent("친구가 목표를 완수했어요");
                break;
        }
        User requester = userRepository.findById(requesterId).orElseThrow(()->new GlobalException(Message.USER_NOT_FOUND.getMessage()));
        User responser = userRepository.findById(responserId).orElseThrow(()->new GlobalException(Message.USER_NOT_FOUND.getMessage()));
        notification.setRequester(requester);
        notification.setResponser(responser);

        notification.setSourceId(sourceId);

        return notificationRepository.save(notification);
    }
}
