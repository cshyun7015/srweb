package com.itil.controller;

import com.itil.entity.ServiceRequest;
import com.itil.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RequestController {

    private final RequestService service;

    @GetMapping
    public ResponseEntity<Page<ServiceRequest>> getAll(
            @RequestParam(defaultValue = "") String company,    // 1. 고객사 파라미터 추가
            @RequestParam(defaultValue = "") String requester,
            @RequestParam(defaultValue = "") String content,
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "") String requestDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return ResponseEntity.ok(service.getSearchRequests(company, requester, title, requestDate, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequest> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRequestById(id));
    }

    @PostMapping
    public ServiceRequest create(@RequestBody ServiceRequest request) {
        return service.createRequest(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceRequest> update(@PathVariable Long id, @RequestBody ServiceRequest request) {
        return ResponseEntity.ok(service.updateRequest(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/generate-samples")
    public ResponseEntity<String> generateSampleData() {
        // 이 엔드포인트는 테스트 및 개발 목적으로 사용됩니다.
        // 실제 운영 환경에서는 이 엔드포인트를 비활성화하거나 @Profile("dev") 등을 사용하여 'dev' 프로필에서만 활성화하는 것이 좋습니다.
        
        service.generateSampleData();
        return ResponseEntity.status(HttpStatus.CREATED).body("100개의 샘플 데이터가 성공적으로 생성되었습니다.");
    }
}