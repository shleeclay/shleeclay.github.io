<!-- AUTO-GENERATED-HISTORY: D:\20.git_research\scripts\daily_history\update_history.py
     매일 00:05 Windows 작업 스케줄러가 실행하여 전날 작업 요약을 ## YYYY-MM-DD 섹션으로 append.
     수동 편집 가능하지만 날짜 헤더 형식과 이 주석 블록은 유지할 것. -->

## 2026-05-21

- 출원 특허 리스트의 발명자/특허권자 표시에 한글 토글 기능 적용
- 등록 특허 카드와 출원 특허 리스트에 동일한 한글 토글 패턴 적용
- 빌드 통과 확인 후 코드 커밋 및 GitHub 저장소에 푸시

## 2026-05-22

- `update_history.py` 스크립트의 `init` 모드를 사용하여 모든 2단계 폴더에 `history.md` 파일 초기화
- `update_history.py` 스크립트를 사용하여 2026-05-21 날짜에 대한 `history.md` 업데이트 및 요약 생성
- `shleeclay.github.io` 폴더에 `history.md` 파일 수동 생성 및 Git 커밋/푸시
- `update_history.py` 스크립트와 함께 Gemini API 무료 티어 옵션을 사용하여 질문에 대한 답변 확인
- `update_history.py` 스크립트의 Google Auth 라이브러리 호환성 문제 해결 (Python 3.9 관련 경고)
- Git의 `add` 명령어를 사용하여 모든 2단계 폴더의 `history.md` 파일에 대한 초기 커밋 및 푸시 수행
- `CLAUDE.md` 및 `.env`, `.env.template` 파일 업데이트
- `project_daily_history.md` 파일 업데이트

## 2026-05-20

* 논문 표지/pdf의 파일명 규칙을 `연도_저널명(약어)_제목시작단어` 형식으로 변경하고 `public/papers/README.md`에 기록했습니다.
* 특허증 이미지 파일명 규칙을 `등록연도_기술분야_제목` 형식으로 변경하고 `public/patents/README.md`에 기록했습니다.
* 논문 카드에 3px hue 색띠 효과를 추가하고, 책 표지 경로를 연결했으며, 이미지 해상도 가이드를 추가했습니다.
* 이미지 자동 다운스케일 스크립트(`optimize-images.mjs`)를 작성하고 `package.json`의 build 스크립트에 prebuild 단계를 추가하여 이미지 최적화를 적용했습니다.
* Education/Career/Scholarships 로고 슬롯 크기를 1.5배 확대하고, 흰색 배경을 고정했습니다.
* 특허 카드뉴스 하단의 날짜에서 연도만 남기고, 발명자/특허권자를 한글로 변경했습니다.
* 논문 표지와 특허증 이미지의 깨짐 현상을 개선하기 위해 이미지 다운스케일 및 sharpen 옵션을 강화했습니다.
* 논문 카드에 Q1 하이라이트 옆에 임팩트 팩터(IF) 배지를 추가했습니다.

## 2026-05-28

*   drseunghyeonlee.com 도메인을 구매하고 GitHub Pages에 연결 완료
*   사이트 언어 전환 방식을 URL 경로 기반으로 변경 (`/` 한글, `/en` 영문)
*   논문 표지 렌더링 문제를 해결하기 위해 graphical abstract 또는 대표 figure로 교체
*   카드 컴포넌트의 hue highlight를 70% 수준으로 연하게 조정
*   다크모드에서 마우스 커서 하이라이트 강도를 70%로 낮춤
*   특허증 및 논문 표지 이미지의 hover 시 잔상 및 깨짐 현상 해결
*   책 표지 이미지의 최적화 기준 초과 여부 확인 후 추가 작업 불필요 판단
*   카드 이미지의 hover 시 `scale` 효과 제거로 잔상 문제 완전히 해결

## 2026-05-29

*   CV 작업을 위한 `cv/` 폴더 생성 및 CV 관련 파일 작성
*   연구 분야에 맞는 CV 예시 10개 수집 및 분류
*   `build_cv.py` 스크립트를 사용하여 포트폴리오 데이터를 기반으로 CV `.docx` 파일 생성
*   1저자 표시(`†`) 버그 수정 및 저자 순서 오류 교정
*   카드 이미지 파일 형식을 JPG/PNG에서 WebP로 자동 변환하는 스크립트 적용
*   WebP 변환 시 특허증 텍스트의 노이즈 문제를 해결하기 위해 sharpen 제거 및 품질 상향
*   게재 논문을 SCI(최신순) → KCI(최신순) 순서로 자동 정렬되도록 로직 추가
*   모바일 화면에서 카드가 2열로 표시되도록 변경하여 가독성 향상
*   논문 카드에 SCI/KCI 등재 구분 배지 추가
*   모바일 환경에서 섹션 접기/펼치기 기능 구현

## 2026-05-31

* 두 워크시트를 하나로 合병하여 `CV_worksheet.docx` 파일 생성
* `build_cv_worksheet.py` 스크립트 생성하여 워크시트 생성
* `CV_worksheet.docx` 파일을 검증하여 6개 파트가 정상적으로 합쳐졌는지 확인
* `treeid.svg` 로고 파일명 변경
* 경력 항목에 TREE:ID (2023.09–2025.03) 추가
* CV 영역에 "이력서 준비 중 / CV — coming soon" placeholder 표시
* 폰트를 통일하기 위해 `font-mono`를 `Pretendard`로 변경
* TREE:ID의 직무를 CEO로 수정하여 커밋 및 푸시 진행

## 2026-06-01

* `CV_worksheet.docx`에 6개 과제의 총연구비를 '① 연구비' 칸에 채움
* `build_cv.py`를 수정하여 CV를 v2로 업데이트함 (과제 섹션 제외)
* 워크시트의 예산 정보를 CV에 반영
* 컨퍼런스 발표에서 Seunghyeon Lee를 1저자로 정렬
* 특허를 Registered 7건 전부 + Pending 4건까지 모두 수록
* 온라인 강의를 "an online learning platform"으로 수정
* TREE:ID 직무를 "스타트업 대표 / Startup CEO"로 변경
* `02.projects/04.Bi-temporal_ALS_Vertical-Horizontal`와 `01.topics/04.fst_revision` 폴더를 합침

## 2026-05-30

* CV 예시 파일들을 확인하고, 두 CV의 공통 성공 패턴 및 보완점을 분석하여 제공했습니다.
* 연구과제(Research Projects) 항목에 대한 구체적인 보완 사항을 상세히 안내하고, 채워넣을 템플릿을 제공했습니다.
* `cv/CV_projects_worksheet.docx` 파일을 생성하여 연구과제 정보 작성을 위한 워크시트를 제공했습니다.
* `cv/CV_worksheet_other_parts.docx` 파일을 생성하여 학위·논문, 출판 파이프라인, 수상·명예 등 기타 CV 항목 작성을 위한 워크시트를 제공했습니다.
* Google Scholar, ORCID, LinkedIn 프로필 링크를 `site.json`에 추가하고 웹사이트에 반영했습니다.
* GitHub 자리를 CV 다운로드 버튼으로 교체하고, 필요한 폴더 및 README를 생성했습니다.
* 다크모드에서 "Get in Touch" 버튼의 가시성 문제를 해결하여 라이트모드와 동일한 위계로 보이도록 수정했습니다.
* 라이트모드 Contact 섹션의 색상 블록이 다크모드 컬러 위계로 보이는 문제를 수정하여 라이트모드에 맞는 밝은 디자인으로 변경했습니다.
* `99.refs` 폴더의 역할과 기능 설명을 포함하여 claude.md와 history.md 파일의 부재에 대한 설명을 제공했습니다.

## 2026-06-08

무엇을 도와드릴까요?

말씀하신 메시지에는 "아래는 2026-06-08 작업 요약입니다"라는 안내만 있고, **실제 요약 내용과 요청하실 작업이 빠져 있습니다.** 아마 붙여넣기가 누락된 것 같습니다.

다음 중 어떤 것을 원하시는지 알려주시면 바로 진행하겠습니다:

- **요약 내용을 다시 붙여넣기** — 그 내용을 검토하고 다음 작업을 이어서 진행
- **해당 폴더에서 작업 이어가기** — `01.topics/21.shleeclay.github.io` 폴더에서 하실 일을 알려주시면 시작 (참고: 현재 작업 디렉터리가 `C:\Users\claylee`이고 git 저장소가 아닌 것으로 감지됩니다)
- **특정 질문에 답변** — 그날 작업에 대해 궁금하신 점

참고로 해당 폴더가 보이지 않습니다. 경로를 확인하거나 전체 경로를 알려주시겠어요?

## 2026-06-02

- site.json 학회 발표 16건의 저자 순서를 이승현 1순위로 재정렬 (특허 inventors 목록은 보존)
- build_cv.py CV 학회 섹션을 국제 발표만 포함하도록 변경 (개인 11건 + 단체 2건 team 표기, 국내 10건은 요청 시 제공으로 요약)
- citations 폴더 구조 생성 및 게재 9편을 출판 오름차순으로 정리한 마스터 `publications.bib` 작성 (Crossref 자동 취득 + KOSERT 수기 작성)
- merge_bib.py 추가하여 individual/*.bib를 DOI 중복제거·오름차순 정렬로 합본 생성
- bib_to_xlsx.py 추가하여 DOI 클릭 링크·1저자 표시 포함한 `publications.xlsx` 생성
- 깨진 KOSERT bib 4편 수리(콤마·저자명 분리·doi 필드 추가), 본인/지도교수 이름 통일, site.json 기준 month 보강으로 정렬 정확화
- normalize_bib.py 추가 및 original/individual 폴더 구조로 원본 보호 워크플로우 정립, site.json Salix 논문 연도(2026→2025)·저자 순서를 공식본 기준으로 수정
- build_cv.py publication 섹션을 publications.bib 기반 APA 7th·오름차순·IF/Quartile 표시로 재작성

## 2026-06-03

- Word COM으로 풀버전 CV(`Lee_Seunghyeon_CV_v3.docx`)를 PDF 변환하고 하이퍼링크 14개(헤더 5 + DOI 9) 보존을 검증
- `build_cv_short.py` 작성하여 2페이지 간소화 CV(`Lee_Seunghyeon_CV_short.docx`/`.pdf`)를 생성하고 링크·페이지 수 검증
- `Home.astro`의 upwise 배지 링크를 페이지 언어(ko/en)에 맞게 분기
- `BaseHead.astro`(upwise)와 `Home.astro`를 수정해 `?theme=` URL 파라미터로 두 사이트 간 라이트/다크 테마 연동
- `LangToggle.astro`(KO|EN 분절 토글) 생성 후 `Header.astro`·`SideBar.astro`·`SideBarFooter.astro`에 배치하고 푸터 언어 버튼 정리
- education·scholarship 로고를 work와 동일한 72×72 스타일·좌측 정렬로 통일하고 다크모드 upwise 배지 톤다운(`global.css`)
- 소셜 아이콘(LinkedIn·Google Scholar·ORCID)을 공식 브랜드 컬러 SVG로 교체(Contact 카드 + 푸터)
- 영어판에 남은 한글(국내 학회명·발명자명)을 이중언어화 — `site.json`·`index.ts`·`CardPatent.astro` 수정

## 2026-06-04

- `build_cv.py`를 v4로 수정 — 한글·중국어 제거, 상단 이름/Curriculum Vitae 헤더·페이지번호 추가, Funding 섹션을 publications 뒤로 이동, 추천인 이메일·서명란 추가 등 요청 11개 항목 반영 후 PDF 빌드·검증
- 참고 CV(Hardiman·Sohn·Ha·Hahm)의 펀딩·연구경험 표기법을 추출·분석하여 적용 기준 도출
- `site.json`에서 Virginia Tech·Purdue 직무를 Internship → Visiting Scholar로 변경
- `Header.astro`에 모바일 우상단 다크/라이트 테마 토글 버튼 추가, `Home.astro`에서 모바일 특허권자 줄바꿈 처리
- GEDI 산불 특허(id 11) 특허권자 순서를 서울대 → 단국대로 변경
- 펀딩 금액 USD 환산(1USD=1,400원, 정수 절삭) 후 `index.ts`·`site.json`·`Home.astro`에 영문 전용 `fundingUsd` 필드로 표기, 경북대 장학금 추가
- 주요 섹션 제목 옆에 항목 개수 배지(예: `Publications (9)`) 추가
- 연구과제 12건에 PI·예산(USD) 추가 및 제목을 "Participated Research Projects & Roles"로 변경, 핵심 5개 과제에 기여 내용(What I did)·성과물(Outputs) 영문 정리

## 2026-06-05

- CV 헤더의 GitHub 링크를 제거하고 포트폴리오 주소를 `drseunghyeonlee.com`(영문 `/en` 하이퍼링크)으로 교체, `build_cv.py`/`build_cv_short.py` 수정 후 DOCX·PDF 재생성
- Carlos Silva 교수에게 보낼 포스트닥 지원 영문 이메일을 문법·메일 작성 베스트프랙티스 반영해 작성하고 제목안 추천
- `site.json`의 연구과제를 PDF acknowledgement 기준으로 grant↔논문↔과제 출처 정정
- under-review 논문 5편을 사사 기준으로 과제별 배치하고 id 7(과천)·id 8(묵논) 과제 상세화(기여·성과)
- RSE 2026 논문을 퍼듀 방문연구 경력 성과로 추가하고 GEDI-ALS 논문을 id 10→id 7(과천)으로 이동
- 과제·경력의 성과 표기를 `Paper(s)`/`Patent(s)`로 분리(둘 다 있으면 줄바꿈)하도록 `index.ts`/`site.json`/`Home.astro` 수정
- 섹션 순서를 About→…→Career→Funding→Projects→Patents로 재배치하고 honors 분해(저서→Publications, 자격증→Career 내 포함, 장학금→Funding), nav·eyebrow 번호 재정렬
- TREE:ID에 "A web platform for individual-tree detection & mapping" 설명 추가 및 경북대 펀딩액 600만원 증액(영문 버전만)

## 2026-06-06

- v6 직접 편집본 내용을 `build_cv.py`에 반영해 스크립트를 source of truth로 통일하고 v7 생성 (헤더 "Ph.D., expected Aug 2026", 서명 날짜 자동화, Skills·References 섹션 제거)
- PDF 자간 깨짐 문제를 글자별 폰트·advance 측정과 렌더링 비교로 진단해 Calibri 폰트 서브셋 분할 및 Word COM 변환 오류가 원인임을 규명
- 본문 폰트를 Calibri→Arial을 거쳐 최종 Cambria로 변경하고 OpenType 커닝 비활성화
- PDF 변환 방식을 Word COM에서 LibreOffice headless로 전환하고 `make_pdf.ps1` 변환 헬퍼 작성
- 인프런 온라인 강의 4개와 논문 DOI 등 하이퍼링크를 연결해 총 17개 클릭 링크 적용
- 연락처 줄의 구분자 간격을 조정해 drseunghyeonlee.com(/en)이 이메일 등과 한 줄에 들어가도록 정리

## 2026-06-07

- 자신의 CV와 레퍼런스 CV들을 렌더링·수치화하여 가독성 저하 원인(높은 밀도·작은 본문·약한 위계·색상 과다)을 비교 분석
- 현재 `build_cv.py`의 항목별 폰트·색상·여백 수치를 정리한 뒤 위계 강화·본문 확대 방향의 개선 수치안을 제안
- `build_cv.py`에 색상(회색 진하게)·여백·본문 크기·줄간격·섹션 간격 및 사이즈 매핑 테이블을 반영하고 v8 docx/PDF로 빌드(밀도 9.06→5.37)
- v3~v7 docx/pdf를 `old/`로 이동하고 분석용 임시 png 파일들을 삭제
- conference·invited talks·patents·teaching 등 불릿 목록 섹션의 항목 간격을 `Pt(2)`→`Pt(4)`로 확대
- 전체 간격 설정을 점검·자동 스캔하여 누락된 Professional Memberships 행 간격을 `Pt(1)`→`Pt(3)`로 수정
- 좌우 여백을 0.85"→0.7"로 넓혀 단어 단위 줄바꿈(orphan) 현상을 거의 제거
- Research Experience(Visiting Scholar) 순서를 최근순(VT→Purdue)으로 재정렬

## 2026-06-14

*   `BaseHead.astro`, `public/sitemap.xml`, `Header.astro`, `SideBar.astro`, `SideBarMenu.astro`, `LangToggle.astro`, `site.json` 파일을 수정하여 `/en` 대신 `/en/`으로 통일하는 SEO 관련 문제를 해결했습니다.
*   `Home.astro`에서 전화번호를 마우스 오버 시에만 표시되도록 수정하여 봇 수집을 방지하는 기능을 구현했습니다.
*   `site.json`의 한글 about 통계에서 "4강"을 "4개 과정"으로 변경했습니다.
*   "있어보이는" 웹사이트를 위해 대표 논문 1~2편을 큰 figure와 함께 Featured 섹션에 전시하는 방식을 제안했습니다.
*   논문의 핵심 figure를 보여주기 위한 프로토타입 페이지 `/lab`을 생성하고, 클릭 시 캐러셀 모달이 뜨도록 업데이트했습니다.
*   `_figures_inbox/` 폴더와 `.gitignore`를 설정하여 논문 figure 원본을 로컬에 보관하고, 최적화된 결과만 Git에 반영하도록 했습니다.
*   2021년 Remote Sensing 논문의 figure 13장과 원본 캡션을 업로드하여 캐러셀 모달 데모를 구현했습니다.
*   캐러셀 figure의 최적화 설정을 2000px, webp q90으로 확정했습니다.

## 2026-06-19

* Three-stage(RSE) 논문에 사용자 제공 이미지 13장(fig1~13) 추가 및 최적화
* 운곡 Salix 논문에 fig5 이미지 교체
* Three-stage fig2와 Salix fig5 이미지 정상 확인
* 게재 논문 9편 전체 figure 캐러셀 기능 라이브 적용
* Figure 캐러셀에서 인접 이미지를 미리 받아오는 prefetch 기능 적용
* /lab 페이지 삭제 및 Diel Fig3 캡션 누락분 보완
* 데스크톱 환경에서 Figure 캐러셀 제목이 좌측 메뉴와 겹치는 문제 수정

## 2026-06-16

* `site.json` 파일을 수정하여 타이틀 및 설명에 이름 변형과 핵심 키워드를 강화함.
* `BaseHead.astro` 파일에 JSON-LD Person 정보를 확장하고 키워드 메타를 추가함.
* Astro 웹사이트의 스택(GitHub Pages, Astro, TailwindCSS, DaisyUI) 정보를 확인하고 정리함.
* Zack의 이메일에 대한 답장 초안을 검토하고, 반복 표현 및 문장 시작 패턴을 다듬어 자연스러움을 더함.

## 2026-06-27

* CV PDF에서 지도교수 연락처 정보 제거
* build_cv.py를 백업하고 CV v9 생성
* CV v9 docx 파일을 PDF로 변환
* 이전 버전 CV 파일들을 정리하고 새 버전 CV를 공개용으로 이동

## 2026-07-01

* KCI 논문 3편의 `title.ko`를 PDF에서 추출한 공식 국문 원제로 수정했습니다.
* KCI 논문 4편(id2·6·8·9)의 한글 페이지 저널명과 저자를 국문으로 추가했습니다.
* KCI 논문 id9의 영문 저자 순서를 PDF 원본과 일치하도록 수정했습니다.
* KCI 논문(id2·6·8·9)의 `journalKo` 및 `authorsKo` 추가 후, `CardPaper.astro` 컴포넌트를 수정하여 이중언어 렌더링을 구현했습니다.
* KCI 논문의 제목, 저널명, 저자를 한국어 페이지에 한글로 표시되도록 `site.json` 파일을 업데이트했습니다.
* `site.json` 및 관련 컴포넌트 수정 후 빌드하여 한글 페이지에 변경 사항이 올바르게 적용되는지 검증했습니다.
* 최종 변경 사항을 `site.json`, `index.ts`, `CardPaper.astro` 파일에 대해 커밋하고 푸시했습니다.

## 2026-07-03

*   `RowPaper.astro`를 추가하여 목록 보기 컴포넌트 구현
*   `Home.astro`에 카드/목록 보기 전환 토글 및 관련 CSS/JS 추가
*   `global.css`에 보기 전환 토글 관련 스타일 및 전환 규칙 추가
*   `site.json`에서 hero 소개 문구를 전문 한 문장과 연구 분야 목록(칩) 형태로 재구성
*   `site.json`의 hero 연구 분야 칩에 '도시 미기후·열 원격탐사' 추가
*   `RowPaper.astro`를 수정하여 목록 보기 행 구조 변경 (배지↔버튼을 한 행에, 제목·저자는 전체 폭으로)

## 2026-07-04

- `Home.astro` 파일에서 게재 논문 목록/카드 보기 토글 기능이 섹션 접기 기능과 충돌하던 버그를 `stopPropagation`으로 수정
- `Home.astro` 파일에서 게재 논문 목록/카드 보기 토글 버튼을 섹션 접기 헤더 밖으로 이동시켜 버튼 중첩 문제를 해결
- GitHub Pages 배포 실패 (`syncing_files` 오류) 발생 후, 이전 커밋의 배포를 재실행하여 사이트 정상화
- GitHub Pages 배포 실패 (`syncing_files` 오류) 발생 후, 최신 커밋의 배포를 재실행하여 모바일 토글 수정본 반영

## 2026-07-07

- `build_cv.py` 수정하여 긴 프로젝트 제목으로 인한 기간 잘림 문제 해결
- `build_cv.py`에 도시 미기후·열 원격탐사 관련 내용을 추가하여 Research Interests 최신화
- `build_cv.py`를 사용하여 `Lee_Seunghyeon_CV_v9.docx` 및 `Lee_Seunghyeon_CV_v9.pdf` 재생성
- `public/cv/Lee_Seunghyeon_Clay_CV.pdf`를 최신 버전으로 업데이트 및 커밋
- `build_cv.py` 원본 파일 백업 (`cv/pys_old/260704_build_cv.py`)

## 2026-07-11

*   특허 섹션에 등록 특허를 위한 카드/목록 토글 기능 추가
*   `ViewToggle.astro` 컴포넌트 생성하여 토글 로직 범용화
*   `RowPatent.astro` 컴포넌트 생성하여 특허 목록 행 UI 구현
*   특허 목록 보기의 라벨 "인증서"를 "특허증"으로 변경
*   about 통계 영문 라벨 "Online courses"를 "Online lectures"로 변경
*   본인 소유 등록 특허에 "특허권자 본인 / Self-owned" 골드 배지 추가
*   목록 행의 골드 배경색 제거
*   카드 보기의 골드 테두리 제거

## 2026-07-13

- CV 사이트 빌드 및 GitHub Pages 배포 확인
- QGIS 강의와 관련된 robots, GA4, hreflang 설정 검토
- "QGIS 전문가로 향하는 로드맵" PDF 및 TXT 파일 추가
- QGIS 로드맵 관련 이미지 썸네일 및 프로필 이미지 정보 확인
- QGIS 로드맵 페이지 수 5개 확인

## 2026-07-18

- CV 학위논문 제목을 확인하고 웹사이트 education 렌더 방식에 반영하는 방안을 제안했습니다.
- 웹사이트 education 항목에 학위논문 제목 필드를 추가하고 렌더링 로직을 구현했습니다.
- 학술지 논문 실적을 정리하여 '논문실적_지원용.xlsx' 파일로 생성했습니다.
- 지원용 논문 실적 엑셀에 투고 중 논문의 IF와 투고일을 추가했습니다.
- 특허 시트에 등록된 특허의 출원번호와 등록번호를 추가했습니다.
- 'application_info.xlsx' 파일의 모든 시트를 한글과 영문 정보를 별도 열로 구분하여 재구성했습니다.
- 웹사이트의 Education 항목에 학위논문 제목을 추가하는 업데이트를 완료했습니다.
- 지원용 논문 실적 엑셀 파일의 세부 내용을 검증하고 사용자에게 전달했습니다.
- 특허 시트에 등록된 7건의 특허에 대한 출원번호와 등록번호를 추가하고, 출원 중 4건의 출원번호는 찾지 못했음을 알렸습니다.

