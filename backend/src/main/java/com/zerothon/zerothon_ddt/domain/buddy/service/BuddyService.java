package com.zerothon.zerothon_ddt.domain.buddy.service;

import com.zerothon.zerothon_ddt.common.error.Message;
import com.zerothon.zerothon_ddt.common.exception.GlobalException;
import com.zerothon.zerothon_ddt.domain.buddy.dto.BuddyDTO;
import com.zerothon.zerothon_ddt.domain.buddy.entity.Buddy;
import com.zerothon.zerothon_ddt.domain.buddy.entity.enums.BuddyState;
import com.zerothon.zerothon_ddt.domain.buddy.repository.BuddyQueryRepository;
import com.zerothon.zerothon_ddt.domain.buddy.repository.BuddyRepository;
import com.zerothon.zerothon_ddt.domain.notification.entity.Notification;
import com.zerothon.zerothon_ddt.domain.notification.entity.enums.NotificationType;
import com.zerothon.zerothon_ddt.domain.notification.service.NotificationService;
import com.zerothon.zerothon_ddt.domain.user.entity.User;
import com.zerothon.zerothon_ddt.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BuddyService {
    private final BuddyRepository buddyRepository;
    private final BuddyQueryRepository buddyQueryRepository;

    private final UserRepository userRepository;

    private final NotificationService notificationService;

    @Transactional
    public BuddyDTO.BuddyResponse requestBuddy(BuddyDTO.BuddyRequest request){
        User requester = userRepository.findById(request.getRequesterId()).orElseThrow(()-> new GlobalException(Message.USER_NOT_FOUND.getMessage()));
        User responser = userRepository.findById(request.getResponserId()).orElseThrow(() -> new GlobalException(Message.USER_NOT_FOUND.getMessage()));

        Buddy buddy = new Buddy();
        buddy.setRequester(requester);
        buddy.setResponser(responser);
        buddy.setState(BuddyState.WAITING);

        Buddy requestBuddy = buddyRepository.save(buddy);

        Notification notification = notificationService.createNotification(NotificationType.FRIENDREQUEST, request.getRequesterId(), request.getResponserId(), requestBuddy.getId());

        return new BuddyDTO.BuddyResponse(requestBuddy);
    }

    @Transactional
    public List<BuddyDTO.BuddyResponse> getListBuddy(Long id){
        List<Buddy> result = buddyQueryRepository.findBuddies(id);
        List<BuddyDTO.BuddyResponse> list = new ArrayList<>();
        for (Buddy e : result) {
            list.add(new BuddyDTO.BuddyResponse(e));
        }

        return list;
    }
}
