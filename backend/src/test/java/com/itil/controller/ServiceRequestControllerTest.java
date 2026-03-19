package com.itil.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itil.entity.Category;
import com.itil.entity.Priority;
import com.itil.entity.ServiceRequest;
import com.itil.entity.Status;
import com.itil.repository.RequestRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional // 테스트 후 DB 롤백을 위해 사용
@ActiveProfiles("dev") // 이 부분을 추가하세요!
class ServiceRequestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RequestRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    private ServiceRequest savedRequest;

    @BeforeEach
    void setUp() {
        // 테스트용 기본 데이터 하나 저장
        ServiceRequest request = ServiceRequest.builder()
                .company("테스트컴퍼니")
                .title("초기 테스트 제목")
                .content("초기 테스트 내용")
                .requester("작성자")
                .requestDate(LocalDate.now())
                .category(Category.SOFTWARE)
                .priority(Priority.NORMAL)
                .status(Status.OPEN)
                .build();
        savedRequest = repository.save(request);
    }

    @Test
    @DisplayName("1. 새로운 서비스 요청 생성 테스트")
    void createRequestTest() throws Exception {
        // Given
        ServiceRequest newRequest = ServiceRequest.builder()
                .company("신규고객사")
                .title("네트워크 장애 발생")
                .requester("이순신")
                .requestDate(LocalDate.now())
                .build();

        // When & Then
        mockMvc.perform(post("/api/requests")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newRequest)))
                .andExpect(status().isOk()) // 현재 Controller가 200(isOk)을 반환하도록 작성됨
                .andExpect(jsonPath("$.company").value("신규고객사"))
                .andExpect(jsonPath("$.title").value("네트워크 장애 발생"));
    }

    @Test
    @DisplayName("2. 기존 서비스 요청 수정 테스트 (상태 및 담당자)")
    void updateRequestTest() throws Exception {
        // Given
        savedRequest.setTitle("수정된 제목");
        savedRequest.setStatus(Status.IN_PROGRESS);
        savedRequest.setAssignee("김관리");

        // When & Then
        mockMvc.perform(put("/api/requests/" + savedRequest.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(savedRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("수정된 제목"))
                .andExpect(jsonPath("$.status").value("IN_PROGRESS"))
                .andExpect(jsonPath("$.assignee").value("김관리"));
    }

    @Test
    @DisplayName("3. 서비스 요청 삭제 테스트")
    void deleteRequestTest() throws Exception {
        // When
        mockMvc.perform(delete("/api/requests/" + savedRequest.getId()))
                .andExpect(status().isNoContent());

        // Then: DB에 데이터가 없는지 최종 확인
        boolean exists = repository.existsById(savedRequest.getId());
        assertThat(exists).isFalse();
    }

    @Test
    @DisplayName("4. 고객사명 검색 필터링 테스트")
    void searchByCompanyTest() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/requests")
                        .param("company", "테스트컴퍼니")
                        .param("page", "0")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].company").value("테스트컴퍼니"));
    }
}