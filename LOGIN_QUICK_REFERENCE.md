# 신우아이앤씨 로그인 시스템 - 빠른 참조 가이드

## 관리자 로그인 정보
```
아이디: sinwoo
비밀번호: 0909@@
```

## 로그인 URL
```
https://sinwoo.vercel.app/login
http://localhost:3000/login (개발 환경)
```

## 인증 흐름

### Step 1: 로그인 요청
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"sinwoo","password":"0909@@"}'
```

### Step 2: 응답 확인
```json
{
  "success": true
}
```

### Step 3: 쿠키 확인
```
auth-token: eyJhbGciOiJIUzI1NiJ9...
```

### Step 4: 대시보드 접근
```
GET /dashboard (쿠키 포함)
```

## API 엔드포인트

| 엔드포인트 | 메서드 | 설명 | 인증 |
|-----------|--------|------|------|
| /api/login | POST | 로그인 | X |
| /api/logout | POST | 로그아웃 | O |
| /dashboard | GET | 대시보드 | O |

## 토큰 정보

| 항목 | 값 |
|-----|---|
| 알고리즘 | HS256 |
| 만료시간 | 24시간 |
| 저장위치 | HttpOnly 쿠키 |
| 쿠키명 | auth-token |

## 테스트 커맨드

### 로그인
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"sinwoo","password":"0909@@"}' \
  -c cookies.txt
```

### 대시보드 접근
```bash
curl http://localhost:3000/dashboard -b cookies.txt
```

### 로그아웃
```bash
curl -X POST http://localhost:3000/api/logout -b cookies.txt
```

## 에러 메시지

| HTTP 코드 | 설명 |
|----------|------|
| 200 | 로그인 성공 |
| 401 | 잘못된 자격증명 |
| 307 | 자동 리다이렉트 |

## 주요 파일

| 파일 | 역할 |
|-----|------|
| `app/login/page.tsx` | 로그인 UI |
| `app/api/login/route.ts` | 로그인 API |
| `app/api/logout/route.ts` | 로그아웃 API |
| `lib/auth.ts` | JWT 토큰 관리 |
| `middleware.ts` | 경로 보호 |

## 수정 이력

### 2026-05-31
- [수정] middleware.ts matcher에 "/login" 추가
  - 토큰 있는 사용자가 /login 접근 시 /dashboard로 자동 리다이렉트
  - 변경: `["/dashboard/:path*"]` → `["/dashboard/:path*", "/login"]`

## 보안 체크리스트

- [x] JWT 토큰 서명 사용
- [x] HttpOnly 쿠키 설정
- [x] 미들웨어 경로 보호
- [x] 토큰 검증
- [x] 에러 처리

## 개발 환경에서 테스트

```bash
# 1. 프로젝트 디렉토리로 이동
cd C:\laragon\www\sinwoo

# 2. 개발 서버 시작
npm run dev

# 3. 브라우저에서 접속
http://localhost:3000/login

# 4. 로그인 (sinwoo / 0909@@)
# 5. 대시보드 확인
# 6. 로그아웃
```

## 프로덕션 배포 체크리스트

- [ ] NEXTAUTH_SECRET 값 변경
- [ ] NODE_ENV = 'production' 설정
- [ ] HTTPS 활성화 (secure 쿠키 필수)
- [ ] NEXTAUTH_URL 업데이트
- [ ] 데이터베이스 연결 확인
- [ ] 로그 수집 설정

