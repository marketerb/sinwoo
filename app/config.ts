/* 사이트 공용 설정 */

/**
 * 지명원(회사소개서) PDF 경로.
 *
 * 사용법: PDF 파일을 public/ 폴더에 넣고 아래 경로를 채우면
 * 히어로와 네비게이션에 "지명원 다운로드" 버튼이 자동으로 나타납니다.
 *   예) public/sinwoo-company-profile.pdf 로 넣었다면
 *       "/sinwoo-company-profile.pdf"
 *
 * 빈 문자열이면 버튼이 렌더링되지 않아 깨진 링크가 생기지 않습니다.
 */
export const COMPANY_PROFILE_PDF = "";

/** 대표 전화 (DB 값이 없을 때 사용하는 기본값) */
export const DEFAULT_PHONE = "1877-8489";
