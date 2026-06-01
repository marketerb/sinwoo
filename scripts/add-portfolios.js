const fs = require("fs");
const https = require("https");

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in environment variables");
  process.exit(1);
}

// 35개 프로젝트 데이터 (2025년부터 2015년 역순)
const projects = [
  {
    title: "신광교 클라우드시티",
    location: "경기도 수원시 팔달구",
    description: "지상 48층, 최고급 오피스텔 1,200세대, 업무/주거복합 시설",
    status: "완료",
    sales_date: "2025-05",
    image_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
  },
  {
    title: "한강 뷰 레지던스",
    location: "서울시 강남구 자곡동",
    description: "지상 55층, 초고층 아파트 850세대, 한강뷰 프리미엄",
    status: "완료",
    sales_date: "2024-12",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
  {
    title: "센트럴 파크 시티",
    location: "인천시 연수구 송도",
    description: "지하 6층/지상 42층, 주상복합 1,450세대, 스마트시티",
    status: "완료",
    sales_date: "2024-10",
    image_url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop",
  },
  {
    title: "대구 이스트 플레이스",
    location: "대구시 수성구 범어동",
    description: "지상 35층, 상업/주거 복합시설, 680세대",
    status: "완료",
    sales_date: "2024-08",
    image_url: "https://images.unsplash.com/photo-1486209869489-handled-image-005?w=800&h=600&fit=crop",
  },
  {
    title: "부산 마린 타워",
    location: "부산시 해운대구 중동",
    description: "지상 50층, 초호화 오피스텔 1,100세대, 해변 프리미엄",
    status: "완료",
    sales_date: "2024-06",
    image_url: "https://images.unsplash.com/photo-1512207736139-e1a0da6f59b5?w=800&h=600&fit=crop",
  },
  {
    title: "광주 금호아파트",
    location: "광주시 광산구 월곡동",
    description: "지상 32층, 중고급 아파트 920세대",
    status: "완료",
    sales_date: "2024-04",
    image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
  {
    title: "대전 혁신도시 스퀘어",
    location: "대전시 유성구 신성동",
    description: "지상 28층, 업무용 오피스 및 상업시설, 50,000m²",
    status: "완료",
    sales_date: "2024-02",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
  {
    title: "울산 현대타운",
    location: "울산시 동구 방어동",
    description: "지상 30층, 주거용 타운하우스 450세대",
    status: "완료",
    sales_date: "2023-12",
    image_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
  },
  {
    title: "경주 신라밀레니엄",
    location: "경주시 황성동",
    description: "지상 40층, 호텔 및 콘도미니엄 500실",
    status: "완료",
    sales_date: "2023-10",
    image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  },
  {
    title: "포항 스마트 빌리지",
    location: "포항시 북구 덕산동",
    description: "지상 25층, 스마트홈 아파트 680세대",
    status: "완료",
    sales_date: "2023-08",
    image_url: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop",
  },
  {
    title: "강원 평창 리조트",
    location: "강원도 평창군 봉평면",
    description: "지상 18층, 스키 리조트 및 펜션 280실",
    status: "완료",
    sales_date: "2023-06",
    image_url: "https://images.unsplash.com/photo-1549887534-7a0b3f0b7b3e?w=800&h=600&fit=crop",
  },
  {
    title: "춘천 호반타운",
    location: "강원도 춘천시 신동",
    description: "지상 32층, 전망 좋은 아파트 750세대",
    status: "완료",
    sales_date: "2023-04",
    image_url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=600&fit=crop",
  },
  {
    title: "여수 오션뷰",
    location: "전라남도 여수시 소호동",
    description: "지상 28층, 해변 리조트 아파트 520세대",
    status: "완료",
    sales_date: "2023-02",
    image_url: "https://images.unsplash.com/photo-1512207736139-e1a0da6f59b5?w=800&h=600&fit=crop",
  },
  {
    title: "전주 한옥마을 프리미엄",
    location: "전라북도 전주시 완산구",
    description: "지상 8층, 한옥 스타일 주거 및 상업시설 180실",
    status: "완료",
    sales_date: "2022-12",
    image_url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
  },
  {
    title: "목포 신항 국제도시",
    location: "전라남도 목포시 신항동",
    description: "지상 35층, 국제 비즈니스 타운 420,000m²",
    status: "완료",
    sales_date: "2022-10",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
  {
    title: "제주 라메르 리조트",
    location: "제주시 구좌읍",
    description: "지상 22층, 해변 럭셔리 콘도 350실",
    status: "완료",
    sales_date: "2022-08",
    image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  },
  {
    title: "서산 석유화학 커뮤니티",
    location: "충청남도 서산시 성연동",
    description: "지상 20층, 산업단지 주거시설 380세대",
    status: "완료",
    sales_date: "2022-06",
    image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
  {
    title: "천안 신도심 플러스",
    location: "충청남도 천안시 동남구",
    description: "지상 40층, 신도시 핵심시설 1,200세대",
    status: "완료",
    sales_date: "2022-04",
    image_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
  },
  {
    title: "청주 스마트시티",
    location: "충청북도 청주시 서원구",
    description: "지상 33층, 스마트 오피스 및 주거, 850세대",
    status: "완료",
    sales_date: "2022-02",
    image_url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop",
  },
  {
    title: "안동 하회마을 프리미엄",
    location: "경상북도 안동시 풍천면",
    description: "지상 12층, 문화유산 보존 주거시설 280세대",
    status: "완료",
    sales_date: "2021-12",
    image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
  },
  {
    title: "영주 선비문화마을",
    location: "경상북도 영주시 풍기읍",
    description: "지상 15층, 전통문화 테마 주거 240세대",
    status: "완료",
    sales_date: "2021-10",
    image_url: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop",
  },
  {
    title: "거제 조선소 도시",
    location: "경상남도 거제시 장평동",
    description: "지상 28층, 산업노동자 주거시설 620세대",
    status: "완료",
    sales_date: "2021-08",
    image_url: "https://images.unsplash.com/photo-1512207736139-e1a0da6f59b5?w=800&h=600&fit=crop",
  },
  {
    title: "통영 해상 테라스",
    location: "경상남도 통영시 중앙동",
    description: "지상 24층, 펜션 및 관광숙박 180실",
    status: "완료",
    sales_date: "2021-06",
    image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  },
  {
    title: "김해 인제대학교 타운",
    location: "경상남도 김해시 인제로",
    description: "지상 18층, 학생주택 및 상업시설 450세대",
    status: "완료",
    sales_date: "2021-04",
    image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
  {
    title: "창원 문화중심도시",
    location: "경상남도 창원시 성산구",
    description: "지상 42층, 문화시설 복합도시 980세대",
    status: "완료",
    sales_date: "2021-02",
    image_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
  },
  {
    title: "수원 광교 프리미엄",
    location: "경기도 수원시 영통구",
    description: "지상 50층, 초고급 아파트 1,050세대",
    status: "완료",
    sales_date: "2020-12",
    image_url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop",
  },
  {
    title: "의정부 경기북부 중심지",
    location: "경기도 의정부시 가능동",
    description: "지상 38층, 대규모 복합시설 1,100세대",
    status: "완료",
    sales_date: "2020-10",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
  {
    title: "하남 킹스타운",
    location: "경기도 하남시 신정동",
    description: "지상 45층, 강남 인접 고급주거 880세대",
    status: "완료",
    sales_date: "2020-08",
    image_url: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop",
  },
  {
    title: "성남 분당 갤러리아",
    location: "경기도 성남시 분당구",
    description: "지상 55층, 럭셔리 복합시설 1,200세대",
    status: "완료",
    sales_date: "2020-06",
    image_url: "https://images.unsplash.com/photo-1512207736139-e1a0da6f59b5?w=800&h=600&fit=crop",
  },
  {
    title: "남양주 별내신도시",
    location: "경기도 남양주시 별내동",
    description: "지상 40층, 신도시 대규모 아파트 1,450세대",
    status: "완료",
    sales_date: "2020-04",
    image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  },
  {
    title: "파주 출판도시 프리미엄",
    location: "경기도 파주시 문산읍",
    description: "지상 25층, 문화도시 주거시설 520세대",
    status: "완료",
    sales_date: "2020-02",
    image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
  {
    title: "고양 킹스타운 프라임",
    location: "경기도 고양시 덕양구",
    description: "지상 48층, 서울 인접 고급주거 1,080세대",
    status: "완료",
    sales_date: "2019-12",
    image_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
  },
  {
    title: "부천 중동 뉴타운",
    location: "경기도 부천시 중동",
    description: "지상 35층, 재개발 아파트 750세대",
    status: "완료",
    sales_date: "2019-10",
    image_url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop",
  },
  {
    title: "인천 청라 국제도시",
    location: "인천시 서구 청라동",
    description: "지상 50층, 국제 비즈니스 타운 1,300세대",
    status: "완료",
    sales_date: "2019-08",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
  {
    title: "중랑구 용마 리노베이션",
    location: "서울시 중랑구 용마산동",
    description: "지상 30층, 도시재생 사업 620세대",
    status: "완료",
    sales_date: "2019-06",
    image_url: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop",
  },
  {
    title: "도봉구 쌍문동 리모델링",
    location: "서울시 도봉구 쌍문동",
    description: "지상 32층, 노후주택 재건축 580세대",
    status: "완료",
    sales_date: "2019-04",
    image_url: "https://images.unsplash.com/photo-1512207736139-e1a0da6f59b5?w=800&h=600&fit=crop",
  },
  {
    title: "강동구 천호동 프리미엄",
    location: "서울시 강동구 천호동",
    description: "지상 45층, 강동 최고급 주거시설 850세대",
    status: "완료",
    sales_date: "2019-02",
    image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  },
  {
    title: "송파구 삼전동 메트로시티",
    location: "서울시 송파구 삼전동",
    description: "지상 52층, 강남 중심 초고층 1,150세대",
    status: "완료",
    sales_date: "2018-12",
    image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
];

// 프로젝트 데이터를 Supabase에 추가하는 함수
async function addProject(project) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(project);

    const options = {
      hostname: SUPABASE_URL.replace("https://", "").split(".")[0] + ".supabase.co",
      path: "/rest/v1/portfolios",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        apikey: SUPABASE_KEY,
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseData));
        } else {
          reject(
            new Error(`HTTP ${res.statusCode}: ${responseData}`)
          );
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// 모든 프로젝트 추가
async function addAllProjects() {
  console.log(`시작: ${projects.length}개 프로젝트 추가`);
  console.log("================================\n");

  let successCount = 0;
  let failureCount = 0;

  for (const project of projects) {
    try {
      await addProject(project);
      successCount++;
      console.log(`✓ [${successCount}/${projects.length}] ${project.title} - ${project.sales_date}`);
    } catch (error) {
      failureCount++;
      console.error(`✗ 실패: ${project.title}`);
      console.error(`  오류: ${error.message}\n`);
    }
    // 요청 간 딜레이 (API 레이트 제한 회피)
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n================================");
  console.log(`완료: 성공 ${successCount}개, 실패 ${failureCount}개`);
  console.log(`전체: ${successCount + failureCount}/${projects.length}`);
}

addAllProjects().catch(console.error);
