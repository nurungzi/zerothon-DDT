package com.zerothon.zerothon_ddt.domain.buddy.repository;

import com.zerothon.zerothon_ddt.domain.buddy.entity.Buddy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuddyRepository extends JpaRepository<Buddy, Integer> {

}
