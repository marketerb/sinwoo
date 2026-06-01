# 신우아이앤씨 웹사이트 디자인 검수 보고서

## 1. 폰트 크기/색상 가시성

### 1.1 가독성 평가

**HERO 섹션:**
- H1: `text-6xl md:text-7xl` (2.25rem → 3.5rem) - 매우 큼, 가독성 우수
- 부제: `text-lg md:text-xl` (1.125rem → 1.25rem) - 적절
- 서브텍스트: `text-gray-200` (밝은 회색) - 어두운 배경 위에서 우수

**본문 섹션:**
- H2: `text-5xl md:text-6xl` (1.875rem → 2.25rem) - 적절한 크기
- H3: `text-2xl` (1.5rem) - 섹션 제목으로 적절
- 본문: `text-lg` (1.125rem) - 기본값으로 적절
- 작은 텍스트: `text-sm` (0.875rem) - 주소/연락처용 적절

### 1.2 색상 대비 (WCAG AA 기준)

**PASS (충족):**
- H1/H2 어두운 텍스트: Gray 900 on White - 17.74:1 (AAA 충족)
- 히어로 헤딩: Yellow 300 on Dark - 14.56:1 (AAA 충족)
- 본문: Gray 700 on White - 10.31:1 (AAA 충족)
- 푸터: Gray 300 on Gray 900 - 12.04:1 (AAA 충족)

**FAIL (부족):**
- ⚠️ CTA 버튼: Yellow 600 on White - 2.94:1 (FAIL) ❌
- ⚠️ Quote 텍스트: Yellow 600 on Gray 50 - 2.81:1 (FAIL) ❌

### 1.3 배경과 텍스트 겹침

**현재 상태:**
- HERO: `linear-gradient` + 배경 이미지 + 추가 오버레이 = 3겹 레이어 (좋음)
- 본문 섹션: 명확한 배경색, 겹침 없음
- Contact 폼: 입력 필드에 포커스 링 (Yellow 600) - 가시성 우수

---

## 2. 모바일 메뉴

### 2.1 현재 구현 상태

**구현됨:**
- ✅ 햄버거 메뉴 토글 (md:hidden)
- ✅ 부드러운 애니메이션 (line rotation, 200ms delay)
- ✅ 스크롤 상태에 따른 색상 변경 (흰색/검은색)
- ✅ 모든 네비게이션 항목 포함

**구현:**
```
- md:hidden (768px 이상에서 숨김)
- 3개 라인 (X자 모양 애니메이션)
- 모바일 메뉴 배경: bg-white/10 (스크롤 시 흰색)
- 메뉴 아이템: 클릭 시 닫힘 (setMobileMenuOpen(false))
```

### 2.2 개선 필요 사항

**HIGH 우선순위:**
1. ❌ 터치 영역 너무 작음
   - 현재: `p-2` (8px 패딩)
   - 필요: 최소 44x44px (WCAG 2.5.5)
   - 수정: `p-4` 또는 별도 패딩 추가

2. ❌ 메뉴 배경 가시성 문제
   - 스크롤 전: `bg-white/10` (반투명)
   - 문제: 헤로 배경이 보임 → 텍스트 읽기 어려움
   - 수정: `bg-white` (스크롤 상태와 동일하게)

3. ❌ 메뉴 열 때 본문 스크롤 방지 안 됨
   - 문제: 메뉴 열려있는데도 배경 스크롤 가능
   - 수정: `overflow-hidden` to body when menu open

**MEDIUM 우선순위:**
4. ❌ 포커스 상태 표시 부족
   - 현재: 호버 상태만 있음
   - 수정: keyboard navigation에 focus ring 추가

5. ❌ 모바일 메뉴 내 "문의하기" 버튼 색상
   - 현재: `bg-yellow-600` (Yellow on White background)
   - 대비: 2.94:1 (FAIL)

---

## 3. 푸터

### 3.1 현재 구현 상태

**레이아웃:**
- Dark background (bg-gray-900)
- 2단 그리드 (md:grid-cols-2)
- 왼쪽: 회사명 + 설명
- 오른쪽: SNS 아이콘 3개

**색상/스타일:**
- 텍스트: Gray 300 (light)
- 아이콘 호버: Gray 400 → White transition
- 분할선: Gray 800 (`border-gray-800`)
- 저작권: 센터 정렬

### 3.2 문제점

**HIGH:**
1. ❌ 소셜 링크가 더미 (`href='#'`)
   - 수정: 실제 소셜 미디어 URL 추가

2. ❌ 아이콘에 접근성 라벨 없음
   - 현재: `<a href='#'><svg>...</svg></a>`
   - 수정: `aria-label='LinkedIn'` 추가

**MEDIUM:**
3. ⚠️ 모바일에서 레이아웃
   - 단일 열: 빈 공간이 많음
   - 고려: 중앙 정렬 또는 스택 레이아웃

4. ⚠️ 저작권 연도 하드코딩
   - 현재: `© 2024 신우아이앤씨`
   - 수정: 동적 연도 사용

**LOW:**
5. ℹ️ 푸터 섹션 부족
   - 추가 권장: 빠른 링크, 서비스 목록, 추가 연락처
   - 추가 권장: 개인정보처리방침, 이용약관 링크

---

## 4. 색상 시스템

### 4.1 현재 색상 팔레트

**Primary:**
- Yellow 600: `#ca8a04` (주요 버튼, 호버 상태, 강조)
- Yellow 500-800: 그래디언트용

**Text:**
- Gray 900: `#111827` (주요 텍스트)
- Gray 700: `#374151` (보조 텍스트)
- Gray 300: `#d1d5db` (푸터 텍스트)

**Background:**
- White: `#ffffff`
- Gray 50: `#f9fafb` (약한 배경)
- Gray 900: `#111827` (푸터)

### 4.2 보라색 → 골드색 변경 영향도

**변경 전 (학습 데이터):**
- 보라색이 Primary로 사용됨

**변경 후 (현재):**
- 모든 Primary UI 요소를 Yellow 600으로 변경
- 일관성: 버튼, 링크, hover 상태, 포커스 링 모두 동일

**영향:**
- ✅ 버튼: 일관성 있음
- ✅ 링크 호버: Yellow 600
- ✅ 포커스 링: Yellow 600 (form input)
- ⚠️ 색상 대비: Yellow 600의 낮은 대비율 (2.94:1)

### 4.3 색상 대비 문제 상세

| 요소 | 비율 | 상태 | 권장 사항 |
|------|------|------|---------|
| CTA 버튼 (Yellow on White) | 2.94:1 | FAIL | Darker yellow 또는 다른 색상 |
| Quote 텍스트 (Yellow on Gray 50) | 2.81:1 | FAIL | Darker gray 배경 또는 다른 색상 |
| Focus Ring (Yellow on Input) | 2.94:1 | FAIL | 두꺼운 링 또는 border 추가 |

**수정 방안:**
1. Yellow 700/800로 변경
2. 또는 Button 배경 개선 (그래디언트, 더 어두운 배경)

### 4.4 다크 모드 고려사항

**현재:**
- 다크 모드 지원 없음
- `@media (prefers-color-scheme: dark)` CSS 있음 → 미구현

**구현 필요:**
- 모든 색상에 대한 다크 모드 변수 추가
- Tailwind dark: 클래스 활용
- 사용자 선호도 감지

---

## 5. 기타 디자인 이슈

### 5.1 섹션 간 여백

**현재:**
- 모든 섹션: `py-24` (6rem = 96px)
- 일관성: ✅ 우수

**평가:**
- 데스크톱: 적절 (좋은 여백)
- 모바일: 과도할 수 있음 (`px-4` 패딩만 있음)

**개선:**
- 모바일: `py-12 md:py-24` 고려

### 5.2 이미지/배경 배치

**HERO:**
- ✅ 배경 이미지 + 그래디언트 오버레이 (전문적)
- ✅ `bg-fixed` 효과 추가 (parallax 효과)

**Company/CEO 섹션:**
- ❌ 이미지 자리: `bg-gradient-to-br from-yellow-500 to-yellow-700` (placeholder)
- 문제: 실제 이미지 필요

**Portfolio:**
- ❌ 모든 항목: Yellow gradient placeholder
- 문제: 실제 프로젝트 이미지 필요

### 5.3 모바일 반응형

**현재 구현:**
- ✅ `md:` 중단점 사용 (640px)
- ✅ 그리드 반응형 (cols-1 → cols-2/3)
- ✅ 텍스트 사이즈 반응형

**문제점:**
1. Hero H1: `text-6xl` on mobile (2.25rem)
   - 매우 큼 → 320px 화면에서 잘릴 수 있음
   - 수정: `text-4xl md:text-6xl` 고려

2. Portfolio Grid: `md:grid-cols-3`
   - 태블릿 (768px): 3열 (cramped)
   - 수정: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`

3. Contact Form: 데스크톱에서 full-width
   - 수정: max-width 추가 (600px)

---

## 6. 디자인 시스템 문제

### 6.1 현재 상태

**구성 요소:**
- 버튼: 인라인 스타일 (재사용 불가)
- 입력 필드: 중복 코드
- 카드: 기본 div + Tailwind
- 아이콘: 이모지 사용

**색상:**
- CSS 변수 없음
- 모두 Tailwind 클래스 직접 사용

### 6.2 개선 권장사항

1. **Button Component 생성**
   ```tsx
   <Button variant="primary" size="lg">...</Button>
   ```

2. **Input Component 생성**
   ```tsx
   <Input placeholder="..." aria-label="..." />
   ```

3. **CSS 변수화**
   ```css
   --color-primary: #ca8a04;
   --color-primary-dark: #b45309;
   ```

4. **SVG 아이콘 라이브러리**
   - lucide-react 또는 react-icons 고려

---

## 7. 우선순위별 개선사항 요약

### 🔴 **HIGH (필수)**

1. **황색 대비율 부족**
   - CTA 버튼: Yellow 600 on White (2.94:1) → FAIL
   - 영향: WCAG AA 미충족
   - 수정: 
     * 옵션 A: Yellow 800으로 변경
     * 옵션 B: White text + Yellow 600 background (이미 대부분 사용)
     * 옵션 C: 더 어두운 황색 (Amber 700 등)

2. **모바일 메뉴 터치 영역**
   - 현재: `p-2` (8px)
   - 필요: 44x44px minimum
   - 수정: `p-3 md:p-2` 또는 별도 터치 영역

3. **메뉴 배경 가시성**
   - 스크롤 전: `bg-white/10` → 읽기 어려움
   - 수정: `bg-white` (또는 더 불투명한 색)

4. **본문 스크롤 잠금**
   - 메뉴 열 때 body `overflow-hidden` 추가

### 🟡 **MEDIUM (권장)**

5. **양식 입력 라벨**
   - 현재: placeholder만 사용
   - 추가: `<label>` 태그 및 aria-label

6. **소셜 아이콘 접근성**
   - 추가: aria-label (LinkedIn, Twitter 등)
   - 수정: 실제 URL 추가

7. **이모지 → SVG 아이콘**
   - Business 섹션: 이모지 4개
   - 대체: lucide-react 또는 custom SVG

8. **헤로 H1 모바일 크기**
   - 현재: `text-6xl` (2.25rem)
   - 수정: `text-4xl md:text-6xl` (더 작은 모바일 크기)

### 🟢 **LOW (선택)**

9. 저작권 연도 동적화
10. 푸터 추가 섹션 (Quick Links, Policies)
11. 다크 모드 구현
12. 디자인 시스템 컴포넌트화

---

## 8. 최종 평가

| 항목 | 평가 | 설명 |
|------|------|------|
| 가독성 | A- | 대부분 우수, 황색 요소만 문제 |
| 모바일 UX | B+ | 메뉴 구현됨, 터치 영역 개선 필요 |
| 색상 시스템 | B | 일관성 있음, 대비율 문제 |
| 반응형 디자인 | B+ | 기본 구현됨, 세부 조정 필요 |
| 접근성 | C+ | 라벨 부족, 아이콘 문제, 기본 구조 양호 |
| 시각적 일관성 | A | 타이포그래피, 간격, 레이아웃 우수 |

**종합:** **B+ (양호, 개선 가능)**

핵심은 색상 대비와 접근성 개선에 집중하면 A등급 사이트 달성 가능합니다.
