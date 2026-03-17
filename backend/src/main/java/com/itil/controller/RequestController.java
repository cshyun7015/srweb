package com.itil.controller;

import com.itil.entity.ServiceRequest;
import com.itil.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
            @RequestParam(defaultValue = "") String requester,
            @RequestParam(defaultValue = "") String content,
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "") String requestDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return ResponseEntity.ok(service.getSearchRequests(requester, content, title, requestDate, pageable));
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
}