package com.zerothon.zerothon_ddt.domain.buddy.repository;

import com.zerothon.zerothon_ddt.domain.buddy.entity.Buddy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BuddyRepository extends JpaRepository<Buddy, Integer> {
    Optional<Buddy> findById(Long id);
}
