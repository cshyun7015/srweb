package com.itil.repository;

import com.itil.entity.ServiceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface RequestRepository extends JpaRepository<ServiceRequest, Long> {
    
    Page<ServiceRequest> findByRequesterContainingAndContentContainingAndTitleContaining(
        String requester, String content, String title, Pageable pageable
    );

    Page<ServiceRequest> findByRequesterContainingAndContentContainingAndRequestDate(
        String requester, String content, LocalDate requestDate, Pageable pageable
    );
}