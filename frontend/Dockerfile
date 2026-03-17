# 1단계: 빌드 스테이지
FROM node:18-alpine AS build-stage
WORKDIR /app

# 패키지 매니저 파일 복사
COPY package*.json ./

# 1. 필수 패키지 설치 (디자인 라이브러리 포함)
RUN npm install
RUN npm install @heroicons/react
RUN npm install -D tailwindcss postcss autoprefixer

# 2. Tailwind CSS 초기화 (tailwind.config.js 및 postcss.config.js 생성)
# 이미 파일이 존재한다면 덮어쓰지 않도록 구성할 수 있으나, 빌드 시점에 생성하도록 포함합니다.
RUN npx tailwindcss init -p

# 소스 코드 복사
COPY . .

# 3. 최종 빌드 (Tailwind CSS가 적용된 정적 파일 생성)
RUN npm run build

# 2단계: 실행 스테이지 (Nginx)
FROM nginx:stable-alpine

# Nginx 설정 최적화
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# 빌드된 결과물 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
