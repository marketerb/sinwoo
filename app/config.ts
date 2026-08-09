/* 사이트 공용 설정 */

/**
 * 지명원(회사소개서) PDF 경로.
 *
 * 저장 파일명은 URL 인코딩 문제를 피하려고 영문으로 두고,
 * 실제 내려받을 때의 이름은 COMPANY_PROFILE_FILENAME 으로 지정합니다.
 *
 * 빈 문자열이면 버튼이 렌더링되지 않아 깨진 링크가 생기지 않습니다.
 */
export const COMPANY_PROFILE_PDF = "/sinwoo-company-profile-2025.pdf";

/** 사용자가 내려받을 때 저장되는 파일명 */
export const COMPANY_PROFILE_FILENAME = "신우아이앤씨 회사소개서 2025.11.pdf";

/** 대표 전화 (DB 값이 없을 때 사용하는 기본값) */
export const DEFAULT_PHONE = "1877-8489";
