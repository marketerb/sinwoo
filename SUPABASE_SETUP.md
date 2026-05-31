# Supabase 설정 가이드

신우아이앤씨 대시보드를 위한 Supabase 데이터베이스 초기화 방법입니다.

## 데이터베이스 스키마 생성

### 방법 1: SQL 에디터를 통한 수동 설정

1. [Supabase 대시보드](https://supabase.com) 접속
2. `csipsantxmyaxixvbsei` 프로젝트 선택
3. 왼쪽 메뉴에서 **SQL Editor** 클릭
4. **New Query** 클릭
5. 아래 SQL을 복사하여 실행:

```sql
-- Portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT '진행중',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- History table
CREATE TABLE IF NOT EXISTS history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Info table
CREATE TABLE IF NOT EXISTS company_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

-- Create RLS policies to allow all operations
CREATE POLICY "Allow all for portfolios" ON portfolios
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for history" ON history
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for company_info" ON company_info
  FOR ALL USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_portfolios_created_at ON portfolios(created_at DESC);
CREATE INDEX idx_history_year ON history(year DESC);
```

### 방법 2: Storage 버킷 설정

포트폴리오 이미지 업로드를 위한 스토리지 버킷:

1. Supabase 대시보드에서 **Storage** 클릭
2. **Create new bucket** 클릭
3. 버킷 이름: `portfolio-images`
4. **Public bucket** 체크박스 선택 (공개 접근 허용)
5. **Create bucket** 클릭

## 테이블 스키마

### portfolios 테이블
- `id`: UUID (primary key)
- `title`: 포트폴리오 제목 (필수)
- `description`: 포트폴리오 설명 (필수)
- `location`: 위치 (필수)
- `status`: 상태 (진행중/완료) (기본값: 진행중)
- `image_url`: 이미지 URL
- `created_at`: 생성 시간
- `updated_at`: 수정 시간

### history 테이블
- `id`: UUID (primary key)
- `year`: 연도 (필수)
- `title`: 연혁 제목 (필수)
- `description`: 연혁 설명 (필수)
- `created_at`: 생성 시간
- `updated_at`: 수정 시간

### company_info 테이블
- `id`: UUID (primary key)
- `company_name`: 회사명 (필수)
- `phone`: 전화번호 (필수)
- `email`: 이메일 (필수)
- `address`: 주소 (필수)
- `description`: 회사소개 (선택)
- `created_at`: 생성 시간
- `updated_at`: 수정 시간

## 환경 변수 확인

`.env.local` 파일에 다음 변수들이 설정되어 있는지 확인:

```
NEXT_PUBLIC_SUPABASE_URL=https://csipsantxmyaxixvbsei.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## RLS 정책 설명

현재 설정된 RLS 정책은 모든 사용자에게 모든 작업을 허용합니다:
- SELECT, INSERT, UPDATE, DELETE 모두 허용

**프로덕션 환경에서는** 인증된 사용자만 접근하도록 정책을 수정하세요.

## API 사용 예제

### 포트폴리오 추가
```bash
curl -X POST http://localhost:3000/api/portfolios \
  -F "title=신축 오피스텔" \
  -F "description=강남구 신축 오피스텔 프로젝트" \
  -F "location=서울시 강남구" \
  -F "status=진행중" \
  -F "image=@portfolio.jpg"
```

### 연혁 추가
```bash
curl -X POST http://localhost:3000/api/history \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "title": "신우아이앤씨 설립",
    "description": "부동산 개발 및 분양대행 전문 회사 설립"
  }'
```

### 기본정보 수정
```bash
curl -X PUT http://localhost:3000/api/company \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "신우아이앤씨",
    "phone": "02-1234-5678",
    "email": "info@sinwoo.co.kr",
    "address": "서울시 강남구 테헤란로 123",
    "description": "부동산 개발 및 분양대행 회사"
  }'
```

## 문제 해결

### "Could not find the column" 에러
데이터베이스 스키마 캐시가 오래되었을 수 있습니다:
1. Supabase 대시보드에서 **SQL Editor**로 이동
2. 새 쿼리에서 테이블 이름을 선택하여 스키마 확인
3. 필요한 컬럼이 모두 있는지 확인
4. 없으면 `ALTER TABLE` 명령으로 컬럼 추가

### RLS 정책 에러
"new row violates row-level security policy" 에러가 발생하면:
1. **Auth** → **Policies** 클릭
2. 각 테이블의 RLS 정책 확인
3. 위의 SQL에 있는 정책이 모두 생성되었는지 확인

## 더 나은 보안 설정

프로덕션 환경을 위한 RLS 정책 예제:

```sql
-- 인증된 사용자만 읽기 허용
CREATE POLICY "Authenticated users can read" ON portfolios
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 관리자만 쓰기 허용 (user_id = admin_id인 경우)
CREATE POLICY "Only admin can write" ON portfolios
  FOR INSERT
  WITH CHECK (auth.uid() = 'admin-user-id');
```
