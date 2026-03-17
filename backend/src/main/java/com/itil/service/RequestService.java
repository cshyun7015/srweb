package com.itil.service;

import com.itil.entity.ServiceRequest;
import com.itil.entity.Status;
import com.itil.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository repository;

    @Transactional(readOnly = true)
    public Page<ServiceRequest> getSearchRequests(String requester, String content, String title, String requestDate, Pageable pageable) {
        if (requestDate != null && !requestDate.trim().isEmpty()) {
            try {
                LocalDate date = LocalDate.parse(requestDate);
                return repository.findByRequesterContainingAndContentContainingAndRequestDate(requester, content, date, pageable);
            } catch (Exception e) { }
        }
        return repository.findByRequesterContainingAndContentContainingAndTitleContaining(requester, content, title, pageable);
    }

    @Transactional(readOnly = true)
    public ServiceRequest getRequestById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
    }

    @Transactional
    public ServiceRequest createRequest(ServiceRequest request) {
        if (request.getRequestDate() == null) request.setRequestDate(LocalDate.now());
        if (request.getStatus() == null) request.setStatus(Status.OPEN);
        return repository.save(request);
    }

    @Transactional
    public ServiceRequest updateRequest(Long id, ServiceRequest details) {
        ServiceRequest request = getRequestById(id);
        request.setTitle(details.getTitle());
        request.setContent(details.getContent());
        request.setRequester(details.getRequester());
        request.setDepartment(details.getDepartment());
        request.setAssignee(details.getAssignee());
        request.setTargetDate(details.getTargetDate());
        request.setStatus(details.getStatus());
        request.setPriority(details.getPriority());
        request.setCategory(details.getCategory());
        request.setResolution(details.getResolution());
        
        if (Status.CLOSED.equals(details.getStatus())) {
            request.setCompletionDate(LocalDateTime.now());
        }
        return repository.save(request);
    }

    @Transactional
    public void deleteRequest(Long id) {
        repository.deleteById(id);
    }
}