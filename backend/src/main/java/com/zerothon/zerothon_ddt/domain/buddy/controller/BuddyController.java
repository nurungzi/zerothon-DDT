package com.zerothon.zerothon_ddt.domain.buddy.controller;

import com.zerothon.zerothon_ddt.domain.buddy.dto.BuddyDTO;
import com.zerothon.zerothon_ddt.domain.buddy.service.BuddyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buddys")
@RequiredArgsConstructor
public class BuddyController {
    private final BuddyService buddyService;

    @PostMapping
    public BuddyDTO.BuddyResponse requestBuddy(@RequestBody BuddyDTO.BuddyRequest request){
        return buddyService.requestBuddy(request);
    }
}
