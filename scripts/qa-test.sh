#!/bin/bash

##############################################################################
# 신우아이앤씨 QA 자동화 테스트 스크립트
# 사용법: bash scripts/qa-test.sh
##############################################################################

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
log_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 테스트 결과 저장
TEST_RESULTS_FILE="TEST_RESULTS_$(date +%Y%m%d_%H%M%S).txt"
{
    echo "신우아이앤씨 QA 테스트 결과 보고서"
    echo "생성일시: $(date)"
    echo "================================================================"
    echo ""
} > "$TEST_RESULTS_FILE"

##############################################################################
# 1. 빌드 및 개발 환경 확인
##############################################################################

log_header "1. 빌드 및 개발 환경 확인"

# Node.js 버전 확인
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    log_success "Node.js 설치 확인: $NODE_VERSION"
    echo "✅ Node.js: $NODE_VERSION" >> "$TEST_RESULTS_FILE"
else
    log_error "Node.js가 설치되지 않았습니다"
    echo "❌ Node.js 미설치" >> "$TEST_RESULTS_FILE"
    exit 1
fi

# npm 버전 확인
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    log_success "npm 설치 확인: $NPM_VERSION"
    echo "✅ npm: $NPM_VERSION" >> "$TEST_RESULTS_FILE"
else
    log_error "npm이 설치되지 않았습니다"
    echo "❌ npm 미설치" >> "$TEST_RESULTS_FILE"
    exit 1
fi

# package.json 확인
if [ -f "package.json" ]; then
    log_success "package.json 파일 확인"
    echo "✅ package.json 존재" >> "$TEST_RESULTS_FILE"
else
    log_error "package.json 파일을 찾을 수 없습니다"
    echo "❌ package.json 미존재" >> "$TEST_RESULTS_FILE"
    exit 1
fi

##############################################################################
# 2. 의존성 확인
##############################################################################

log_header "2. 의존성 확인"

DEPENDENCIES=("next" "react" "react-dom" "tailwindcss" "@supabase/supabase-js")

for dep in "${DEPENDENCIES[@]}"; do
    if npm ls "$dep" &>/dev/null; then
        VERSION=$(npm ls "$dep" --depth=0 2>/dev/null | grep "$dep" | head -1 | awk '{print $NF}' | tr -d '()')
        log_success "$dep 설치 확인: $VERSION"
        echo "✅ $dep: $VERSION" >> "$TEST_RESULTS_FILE"
    else
        log_warning "$dep가 설치되지 않았습니다"
        echo "⚠️  $dep 미설치" >> "$TEST_RESULTS_FILE"
    fi
done

##############################################################################
# 3. TypeScript 검증
##############################################################################

log_header "3. TypeScript 컴파일 검증"

if [ -f "tsconfig.json" ]; then
    log_success "tsconfig.json 파일 확인"
    echo "✅ tsconfig.json 존재" >> "$TEST_RESULTS_FILE"

    # TypeScript 컴파일 테스트 (실제로는 npm run build에서 수행)
    log_info "TypeScript 컴파일은 'npm run build'로 검증하세요"
else
    log_warning "tsconfig.json 파일을 찾을 수 없습니다"
    echo "⚠️  tsconfig.json 미존재" >> "$TEST_RESULTS_FILE"
fi

##############################################################################
# 4. 파일 구조 확인
##############################################################################

log_header "4. 필수 파일 구조 확인"

FILES_TO_CHECK=(
    "app/page.tsx"
    "app/layout.tsx"
    "app/login/page.tsx"
    "app/dashboard/page.tsx"
    "app/components/Navigation.tsx"
    "app/api/login/route.ts"
    "app/api/logout/route.ts"
    "app/api/portfolios/route.ts"
    "middleware.ts"
    "next.config.ts"
    ".env.local"
)

MISSING_FILES=0
for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        log_success "$file 존재"
        echo "✅ $file" >> "$TEST_RESULTS_FILE"
    else
        log_warning "$file 미존재"
        echo "⚠️  $file" >> "$TEST_RESULTS_FILE"
        ((MISSING_FILES++))
    fi
done

##############################################################################
# 5. 환경 변수 확인
##############################################################################

log_header "5. 환경 변수 확인"

if [ -f ".env.local" ]; then
    log_success ".env.local 파일 존재"
    echo "✅ .env.local 존재" >> "$TEST_RESULTS_FILE"

    ENV_VARS=("NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_ANON_KEY")
    for var in "${ENV_VARS[@]}"; do
        if grep -q "^$var=" .env.local; then
            log_success "$var 환경 변수 설정됨"
            echo "✅ $var 설정됨" >> "$TEST_RESULTS_FILE"
        else
            log_warning "$var 환경 변수 미설정"
            echo "⚠️  $var 미설정" >> "$TEST_RESULTS_FILE"
        fi
    done
else
    log_error ".env.local 파일이 없습니다. 설정이 필요합니다."
    echo "❌ .env.local 미존재" >> "$TEST_RESULTS_FILE"
fi

##############################################################################
# 6. 보안 검사
##############################################################################

log_header "6. 보안 검사"

# .gitignore 확인
if [ -f ".gitignore" ]; then
    log_success ".gitignore 파일 존재"

    if grep -q "\.env\.local" .gitignore; then
        log_success ".env.local이 .gitignore에 포함됨"
        echo "✅ .env.local .gitignore 포함" >> "$TEST_RESULTS_FILE"
    else
        log_error ".env.local이 .gitignore에 포함되지 않음"
        echo "❌ .env.local .gitignore 미포함" >> "$TEST_RESULTS_FILE"
    fi
else
    log_warning ".gitignore 파일을 찾을 수 없습니다"
    echo "⚠️  .gitignore 미존재" >> "$TEST_RESULTS_FILE"
fi

# API 키 노출 확인 (간단한 검사)
log_info "소스 코드에서 API 키 노출 확인 중..."
API_KEY_PATTERNS=("eyJ" "NEXT_PUBLIC_SUPABASE" "SUPABASE_SERVICE_ROLE")
EXPOSED_KEYS=0

for pattern in "${API_KEY_PATTERNS[@]}"; do
    # 소스 코드에서만 검사 (node_modules 제외)
    if grep -r "$pattern" app/ 2>/dev/null | grep -v "process.env" | grep -v "//" | head -1; then
        log_error "잠재적 API 키 노출 감지: $pattern"
        ((EXPOSED_KEYS++))
    fi
done

if [ $EXPOSED_KEYS -eq 0 ]; then
    log_success "API 키 노출 감지 안 됨"
    echo "✅ API 키 미노출" >> "$TEST_RESULTS_FILE"
else
    log_error "API 키 노출이 감지되었습니다. 검토하세요."
    echo "❌ API 키 노출 감지" >> "$TEST_RESULTS_FILE"
fi

##############################################################################
# 7. 코드 품질 검사 (ESLint)
##############################################################################

log_header "7. 코드 품질 검사 (ESLint)"

if command -v npx &> /dev/null; then
    log_info "ESLint 검사 실행 중..."

    # ESLint 실행 (오류는 경고로 표시)
    if npx eslint app/ --max-warnings 10 2>/dev/null; then
        log_success "ESLint 검사 통과"
        echo "✅ ESLint 검사 통과" >> "$TEST_RESULTS_FILE"
    else
        log_warning "ESLint 검사에서 경고/오류 발견"
        echo "⚠️  ESLint 경고/오류 발견" >> "$TEST_RESULTS_FILE"
    fi
else
    log_warning "npx를 찾을 수 없습니다"
    echo "⚠️  ESLint 검사 스킵" >> "$TEST_RESULTS_FILE"
fi

##############################################################################
# 8. 빌드 검사
##############################################################################

log_header "8. Next.js 빌드 검사"

log_info "프로젝트 빌드 중... (이 과정은 1-3분 소요될 수 있습니다)"
echo "📦 빌드 시작: $(date)" >> "$TEST_RESULTS_FILE"

if npm run build > /tmp/build.log 2>&1; then
    log_success "빌드 성공"
    echo "✅ 빌드 성공" >> "$TEST_RESULTS_FILE"

    # 빌드 결과물 확인
    if [ -d ".next" ]; then
        log_success ".next 디렉토리 생성됨"
        echo "✅ .next 디렉토리 생성" >> "$TEST_RESULTS_FILE"

        NEXT_SIZE=$(du -sh .next 2>/dev/null | awk '{print $1}')
        log_info "빌드 크기: $NEXT_SIZE"
        echo "📊 빌드 크기: $NEXT_SIZE" >> "$TEST_RESULTS_FILE"
    fi
else
    log_error "빌드 실패"
    echo "❌ 빌드 실패" >> "$TEST_RESULTS_FILE"
    log_info "빌드 로그:"
    tail -30 /tmp/build.log
fi

echo "📦 빌드 완료: $(date)" >> "$TEST_RESULTS_FILE"

##############################################################################
# 9. 테스트 요약
##############################################################################

log_header "9. 테스트 결과 요약"

echo "" >> "$TEST_RESULTS_FILE"
echo "================================================================" >> "$TEST_RESULTS_FILE"
echo "테스트 완료: $(date)" >> "$TEST_RESULTS_FILE"
echo "결과 파일: $TEST_RESULTS_FILE" >> "$TEST_RESULTS_FILE"

if [ $MISSING_FILES -eq 0 ]; then
    log_success "필수 파일 모두 존재"
else
    log_warning "필수 파일 $MISSING_FILES개 미존재"
fi

log_success "QA 테스트 완료!"
log_info "테스트 결과: $TEST_RESULTS_FILE"

echo ""
echo "📋 다음 단계:"
echo "1. 수동 테스트 체크리스트: QA_CHECKLIST.md 참고"
echo "2. 브라우저 테스트: npm run dev 후 http://localhost:3000 접속"
echo "3. 로그인 테스트: /login (ID: sinwoo, PW: 0909@@)"
echo "4. Lighthouse 검사: Chrome DevTools > Lighthouse"
echo "5. 성능 프로파일링: Chrome DevTools > Performance"

exit 0
