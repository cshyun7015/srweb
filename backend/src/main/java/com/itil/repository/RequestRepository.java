package com.itil.repository;

import com.itil.entity.ServiceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface RequestRepository extends JpaRepository<ServiceRequest, Long> {
    
    // 고객사(Company) 검색 조건 추가
    Page<ServiceRequest> findByCompanyContainingAndRequesterContainingAndTitleContaining(
        String company, String requester, String title, Pageable pageable
    );

    Page<ServiceRequest> findByCompanyContainingAndRequesterContainingAndRequestDate(
        String company, String requester, LocalDate requestDate, Pageable pageable
    );
}