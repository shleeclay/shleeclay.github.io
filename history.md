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

