# 신우아이앤씨 QA 체크리스트 - 요약 및 실행 가이드

**작성일:** 2026-06-01  
**대상:** QA 테스터, 개발팀  
**프로젝트:** 신우아이앤씨 Next.js 웹사이트 + 관리자 대시보드

---

## 📌 주요 문서

이 QA 프로세스는 **3가지 주요 문서**로 구성되어 있습니다:

| 문서 | 파일명 | 설명 |
|------|--------|------|
| **종합 체크리스트** | `QA_CHECKLIST.md` | 모든 검사 항목을 우선순위별로 정렬한 종합 문서 |
| **수동 테스트 가이드** | `MANUAL_TEST_GUIDE.md` | 각 테스트의 구체적인 실행 방법과 단계별 지침 |
| **자동화 테스트 스크립트** | `scripts/qa-test.sh` | 개발 환경 검증을 자동화한 스크립트 |

---

## 🚀 빠른 시작

### 1단계: 개발 환경 준비 (5분)

```bash
# 프로젝트 디렉토리로 이동
cd c:\laragon\www\sinwoo

# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 2단계: 자동 검증 실행 (2분)

```bash
# QA 자동화 스크립트 실행
bash scripts/qa-test.sh

# 결과 확인
# TEST_RESULTS_*.txt 파일 생성됨
```

### 3단계: 수동 테스트 진행 (2-3시간)

```
QA_CHECKLIST.md 참고하여:

1. CRITICAL 항목 모두 테스트 (30분)
   - 로그인 및 보안
   - API 엔드포인트

2. HIGH 항목 모두 테스트 (1시간)
   - 기능성 (네비게이션, 폼, 데이터)
   - 반응형 디자인 (3개 브레이크포인트)

3. MEDIUM 항목 테스트 (30분-1시간)
   - 성능 측정 (Lighthouse)
   - 상세 기능 테스트

4. LOW 항목 (시간 여유시)
   - 접근성 검사
   - 브라우저 호환성
```

---

## ✅ 검사 항목 요약

### 🔴 CRITICAL (배포 불가 - 반드시 수정)

**로그인 & 보안:**
- [x] JWT 토큰 생성 및 검증 (테스트 완료)
- [x] /dashboard 접근 보호 (미들웨어 설정 완료)
- [x] /login 페이지 보호 (토큰 있으면 /dashboard로 리다이렉트)
- [ ] 쿠키 httpOnly, Secure 플래그 (확인 필요)
- [ ] CORS 설정 (확인 필요)

**핵심 페이지:**
- [x] 홈페이지 렌더링
- [x] 로그인 페이지 렌더링
- [x] 대시보드 페이지 렌더링
- [ ] 404 페이지 처리 (확인 필요)

**핵심 API:**
- [x] POST /api/login (테스트 완료)
- [x] POST /api/logout (테스트 완료)
- [x] GET /api/portfolios (구현 완료)
- [ ] POST /api/contact (구현 완료, 검증 필요)

---

### 🟠 HIGH (배포 전 완료 필수)

**기능성:**
- [ ] 앵커링크 동작 (HOME, COMPANY, BUSINESS, PORTFOLIO, CONTACT)
- [ ] 모바일 햄버거 메뉴 동작
- [ ] 로그인 폼 검증 (유효/무효 입력)
- [ ] 포트폴리오 데이터 로드
- [ ] 문의 폼 제출

**반응형 디자인:**
- [ ] 모바일 (320px, 375px, 414px)
- [ ] 태블릿 (768px, 1024px)
- [ ] 데스크톱 (1440px, 1920px)
- [ ] 터치 타겟 크기 (최소 44x44px)
- [ ] 가로 스크롤 없음

---

### 🟡 MEDIUM (배포 후 1주일 내)

**성능:**
- [ ] Lighthouse 점수 (목표: 90+)
- [ ] First Contentful Paint (목표: < 1.8s)
- [ ] Largest Contentful Paint (목표: < 2.5s)
- [ ] 이미지 최적화 (WebP, 적절한 크기)
- [ ] 지연 로딩 구현

**SEO & 분석:**
- [ ] 메타 태그 설정
- [ ] Open Graph 태그
- [ ] 구조화된 데이터 (Schema.org)
- [ ] sitemap.xml, robots.txt

---

### 🟢 LOW (여유 시간)

**접근성 (WCAG 2.1 AA):**
- [ ] 색상 대비율 (4.5:1 이상)
- [ ] 폰트 크기 (최소 14px)
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 호환

**브라우저 호환성:**
- [ ] Chrome, Firefox, Safari, Edge
- [ ] iOS Safari, Android Chrome

**보안:**
- [ ] XSS 방어
- [ ] CSRF 방어
- [ ] Rate Limiting
- [ ] API 키 노출 확인

---

## 📊 테스트 현황

### 이미 완료된 테스트

```
✅ 로그인 페이지 로드 및 폼 입력
✅ JWT 토큰 생성 및 쿠키 설정
✅ 로그인 기능 (유효/무효 자격증명)
✅ 미들웨어 동작 (토큰 검증 및 리다이렉트)
✅ 로그아웃 기능
✅ 대시보드 접근 보호
✅ 포트폴리오 API 통합 (Supabase)
```

### 추가 테스트 필요

```
⚠️  네비게이션 앵커링크 (모든 해상도)
⚠️  모바일 메뉴 동작
⚠️  문의 폼 검증 및 제출
⚠️  반응형 디자인 (7개 해상도)
⚠️  성능 측정 (Lighthouse)
⚠️  브라우저 호환성 (6개 브라우저)
⚠️  접근성 검사 (axe DevTools)
⚠️  보안 검사 (환경변수, API 키)
```

---

## 🔧 테스트 환경

### 필수 도구

```
개발 환경:
- Node.js 18+ (확인 필요: npm run build)
- npm 9+ (확인 필요: npm -v)
- Next.js 16.2.6 (package.json에 명시)

브라우저:
- Google Chrome (최신)
- Firefox (최신)
- Safari (최신, 선택사항)

개발자 도구:
- Chrome DevTools
- axe DevTools (확장 프로그램)
```

### 테스트 데이터

```
로그인 계정:
- ID: sinwoo
- 비밀번호: 0909@@
- 역할: 관리자

Supabase 연동:
- URL: https://csipsantxmyaxixvbsei.supabase.co
- Anon Key: .env.local에서 NEXT_PUBLIC_SUPABASE_ANON_KEY
- 포트폴리오 테이블: portfolios
```

---

## 📋 테스트 체크리스트 (빠른 참조)

### Day 1: CRITICAL 항목 (오전)

```
[ ] 1. 로그인 페이지 접근성
[ ] 2. JWT 토큰 검증
[ ] 3. 대시보드 보호
[ ] 4. 환경 변수 보안
[ ] 5. 핵심 API 엔드포인트 (5개)
```

### Day 1-2: HIGH 항목 (오후)

```
[ ] 6. 네비게이션 앵커링크 (5개)
[ ] 7. 로그인 폼 유효성 검증
[ ] 8. 포트폴리오 데이터 로드
[ ] 9. 반응형 디자인 - 모바일
[ ] 10. 반응형 디자인 - 태블릿
[ ] 11. 반응형 디자인 - 데스크톱
[ ] 12. 문의 폼 제출
```

### Day 2: MEDIUM 항목 (종일)

```
[ ] 13. Lighthouse 성능 측정
[ ] 14. 이미지 최적화 검사
[ ] 15. 로딩 속도 측정
[ ] 16. 애니메이션 부드러움
```

### Day 3: LOW 항목 (시간 여유)

```
[ ] 17. 접근성 검사 (axe DevTools)
[ ] 18. 색상 대비율 검사
[ ] 19. 키보드 네비게이션
[ ] 20. 브라우저 호환성 (6개)
[ ] 21. 보안 심층 검사
```

---

## 🐛 발견된 버그 (현재)

현재까지 발견된 주요 버그:

### ✅ 수정 완료

1. **미들웨어가 /login 페이지를 보호하지 않음**
   - 상태: FIXED
   - 수정: middleware.ts matcher에 "/login" 추가
   - 테스트: PASS

### 🔍 테스트 필요

발견된 버그가 없습니다. 테스트 진행 중 새로운 이슈가 발견되면 추가되니다.

---

## 📈 배포 준비도 평가

### 현재 상태

```
CRITICAL 항목: 80% 완료 (보안 설정 미확인)
HIGH 항목: 40% 완료 (기능 테스트 필요)
MEDIUM 항목: 0% 완료 (성능 측정 필요)
LOW 항목: 0% 완료 (선택사항)

전체: 약 30% (수동 테스트 시작 가능)
```

### 배포 조건

```
배포 가능 조건:
✅ CRITICAL 항목: 100% (모두 PASS)
✅ HIGH 항목: 100% (모두 PASS)
⚠️  MEDIUM 항목: 80% 이상 (성능 최적화)
⚠️  LOW 항목: 권장사항 (필수 아님)

현재 상태: 배포 불가
- 수동 테스트 미완료
- 성능 측정 미완료
- 브라우저 호환성 미확인
```

---

## ⏱️ 예상 테스트 소요 시간

```
자동화 검증 (qa-test.sh):        10분
CRITICAL 항목 테스트:           30분
HIGH 항목 테스트:               1시간 30분
MEDIUM 항목 테스트:             1시간
LOW 항목 테스트:                1시간
버그 수정 및 재테스트:          2시간 (예상)

총 예상 시간: 6-7시간

분산된 일정:
- Day 1 (오전): 자동화 + CRITICAL (40분)
- Day 1 (오후): HIGH 항목 (2시간)
- Day 2 (오전): HIGH 항목 계속 (1시간)
- Day 2 (오후): MEDIUM 항목 (1시간 30분)
- Day 3: 버그 수정 및 재테스트 (2시간)
- Day 4 (선택): LOW 항목 (1시간)
```

---

## 🎯 다음 단계

### 즉시 수행

1. **자동화 테스트 실행**
   ```bash
   bash scripts/qa-test.sh
   ```

2. **CRITICAL 항목 테스트 시작**
   - QA_CHECKLIST.md의 CRITICAL 섹션 참고
   - MANUAL_TEST_GUIDE.md에서 상세 절차 확인

3. **발견된 버그 기록**
   - 버그 발견 시 QA_CHECKLIST.md의 "Issues 추적" 섹션 업데이트

### 예정 활동

1. **High 우선순위 테스트**
   - 네비게이션 및 폼 기능 검증
   - 7개 해상도에서 반응형 디자인 테스트

2. **성능 측정**
   - Chrome Lighthouse 보고서 생성
   - 최적화 권장사항 적용

3. **브라우저 호환성 검증**
   - 6개 주요 브라우저에서 테스트
   - 호환성 문제 기록 및 수정

4. **배포 전 최종 검증**
   - 모든 CRITICAL + HIGH 항목 PASS 확인
   - 스모크 테스트 실행

---

## 📚 참고 자료

### 공식 문서
- [Next.js 16 공식 가이드](https://nextjs.org/docs)
- [Tailwind CSS 4 문서](https://tailwindcss.com/docs)
- [Supabase 문서](https://supabase.com/docs)

### 테스트 도구
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE 접근성](https://wave.webaim.org/)

### 웹 표준
- [WCAG 2.1 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [웹 성능 모범 사례](https://web.dev/performance/)
- [보안 모범 사례](https://owasp.org/Top10/)

---

## 💬 연락처 및 지원

### 개발팀
- **이메일:** izer84@gmail.com
- **Slack/Teams:** [추가 필요]

### 프로젝트 담당자
- **이름:** 임중용
- **이메일:** sinwooinc2014@naver.com
- **전화:** 02-6941-0884

### 버그 리포팅
- 발견된 버그를 QA_CHECKLIST.md의 "Issues 추적" 섹션에 기록
- 심각한 버그는 즉시 개발팀에 알림

---

## 📝 문서 버전 관리

| 버전 | 날짜 | 변경사항 |
|------|------|---------|
| 1.0 | 2026-06-01 | 초기 작성 |
| | | - QA_CHECKLIST.md: 상세 체크리스트 |
| | | - MANUAL_TEST_GUIDE.md: 수동 테스트 가이드 |
| | | - qa-test.sh: 자동화 스크립트 |
| | | - QA_SUMMARY.md: 요약 및 실행 가이드 |

---

**마지막 업데이트:** 2026-06-01 14:00 KST  
**상태:** 테스트 준비 완료 (CRITICAL 항목 테스트 시작 가능)

---

## 🎉 시작하기

이제 QA 테스트를 시작할 준비가 되었습니다!

### 1️⃣ 먼저 이것을 실행하세요:
```bash
npm run dev
bash scripts/qa-test.sh
```

### 2️⃣ 그 다음 이 문서를 읽으세요:
- `QA_CHECKLIST.md` - 모든 검사 항목 (우선순위순)
- `MANUAL_TEST_GUIDE.md` - 각 테스트의 상세 절차

### 3️⃣ 발견된 버그를 기록하세요:
- QA_CHECKLIST.md의 "Issues 추적" 섹션에 추가

### 4️⃣ 배포 전 최종 확인:
- 모든 CRITICAL 항목 PASS ✅
- 모든 HIGH 항목 PASS ✅
- 성능 측정 완료 ✅

**행운을 빕니다! 🚀**
