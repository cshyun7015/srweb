package com.itil.service;

import com.itil.entity.Category;
import com.itil.entity.Priority;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository repository;

    @Transactional(readOnly = true)
    public Page<ServiceRequest> getSearchRequests(String company, String requester, String title, String requestDate, Pageable pageable) {
        if (requestDate != null && !requestDate.trim().isEmpty()) {
            try {
                LocalDate date = LocalDate.parse(requestDate);
                return repository.findByCompanyContainingAndRequesterContainingAndRequestDate(company, requester, date, pageable);
            } catch (Exception e) { }
        }
        return repository.findByCompanyContainingAndRequesterContainingAndTitleContaining(company, requester, title, pageable);
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
        request.setCompany(details.getCompany()); // 추가
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

    // In RequestService.java

public void generateSampleData() {
    List<String> companies = List.of("삼성전자", "네이버", "카카오", "쿠팡", "배달의민족", "현대자동차", "LG에너지솔루션");
    List<String> requesters = List.of("김철수", "이영희", "박지성", "손흥민", "김연아", "류현진", "이상혁");
    List<String> departments = List.of("인사팀", "개발1팀", "마케팅팀", "영업2팀", "디자인팀", "인프라팀", "보안팀");
    List<String> assignees = List.of("담당자A", "담당자B", "담당자C", "담당자D", "미지정");

    Random random = new Random();
    List<ServiceRequest> requestsToSave = new ArrayList<>();

    for (int i = 1; i <= 100; i++) {
        ServiceRequest request = new ServiceRequest();

        String company = companies.get(random.nextInt(companies.size()));
        String requester = requesters.get(random.nextInt(requesters.size()));

        request.setTitle(company + " " + departments.get(random.nextInt(departments.size())) + " " + requester + "의 요청 #" + i);
        request.setCompany(company); // 멀티 테넌시를 위한 고객사 필드
        request.setRequester(requester);
        request.setDepartment(departments.get(random.nextInt(departments.size())));
        request.setContent("샘플 데이터 " + i + "의 상세 내용입니다. 이 요청은 " + company + "의 " + requester + "님이 요청하셨습니다. 확인 후 빠른 처리 부탁드립니다.");

        request.setCategory(Category.values()[random.nextInt(Category.values().length)]);
        request.setPriority(Priority.values()[random.nextInt(Priority.values().length)]);
        request.setStatus(Status.values()[random.nextInt(Status.values().length)]);

        request.setAssignee(assignees.get(random.nextInt(assignees.size())));

        LocalDate requestDate = LocalDate.now().minusDays(random.nextInt(60));
        request.setRequestDate(requestDate);

        // 50% 확률로 목표 완료일 설정
        if (random.nextBoolean()) {
            request.setTargetDate(requestDate.plusDays(random.nextInt(14) + 1));
        }

        // 상태가 해결 또는 종료일 경우 해결 내용 추가
        if (request.getStatus() == Status.RESOLVED || request.getStatus() == Status.CLOSED) {
            request.setResolution("샘플 해결 방안 " + i + " 입니다. 담당자(" + request.getAssignee() + ")가 처리 완료했습니다.");
        }
        
        requestsToSave.add(request);
    }

    // 100개의 요청을 한번의 DB 작업으로 저장
    repository.saveAll(requestsToSave);
}
}