package com.zerothon.zerothon_ddt.domain.statistics.controller;

import com.zerothon.zerothon_ddt.domain.statistics.dto.StatisticsDTO;
import com.zerothon.zerothon_ddt.domain.statistics.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stats")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping
    public StatisticsDTO.StatisticsResponse getStat(@RequestParam Long id){
        return statisticsService.getUserStatistics(id);
    }
}
