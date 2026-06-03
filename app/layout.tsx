import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getCompanyInfo } from "@/lib/supabase-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "신우아이앤씨 | 분양대행·부동산 개발 전문기업 SINWOO Inc.",
  description: "서울 마곡 기반 전문 부동산 솔루션 프로바이더. 분양대행, 개발컨설팅, 투자자문, PM 서비스. 10년 40건+ 성공 프로젝트.",
  keywords: "분양대행, 부동산개발, 분양대행사, 마곡분양, 투자자문, 개발PM, 신우아이앤씨, SINWOO",
  openGraph: {
    title: "신우아이앤씨 SINWOO Inc. — 전문 부동산 솔루션",
    description: "분양대행·개발컨설팅·투자자문·PM. Above & Beyond — 기대를 뛰어넘는 부동산 파트너",
    type: "website",
    locale: "ko_KR",
  },
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /* GA4 ID를 Supabase에서 서버사이드로 읽어옴 */
  let gaId: string | undefined;
  try {
    const company = await getCompanyInfo();
    gaId = company?.ga_tracking_id || undefined;
  } catch {
    /* DB 미연결 시 GA 없이 정상 렌더 */
  }

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics 4 — 관리자에서 ID 입력 시 자동 활성화 */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
