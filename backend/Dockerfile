# 1. 실행 환경: 가벼운 JRE 21 이미지 사용
FROM eclipse-temurin:21-jre-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 호스트에서 빌드된 JAR 파일을 컨테이너 내부로 복사
# 빌드된 파일명이 다를 수 있으므로 *.jar로 지정하는 것이 안전합니다.
COPY build/libs/*.jar app.jar

# 4. 컨테이너 포트 노출
EXPOSE 8080

# 5. 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]