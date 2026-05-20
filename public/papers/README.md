# 논문 자산 (Papers)

각 게재 논문의 표지 이미지와 원본 PDF를 여기에 저장합니다.

## 폴더 구조

```
papers/
├── covers/     # 논문 표지 이미지 (.jpg / .png / .webp)
└── pdfs/       # 논문 원본 PDF (다운로드용)
```

## 파일 이름 규칙

`{연도}_{저널약어}_{제목-시작-단어}.{확장자}` 형식.

- **연도**: 게재 연도 4자리 (`2026`, `2025`, ...)
- **저널약어**: 학계 통용 약어 (5자 이하면 풀이름, 길면 단축). 띄어쓰기·콤마 제거.
  - 예: `KOSERT`, `RSE`, `AEE`, `GEC` (5자 이하 → 풀이름)
  - 예: `EcolIndic` (Ecological Indicators), `RemoteSens` (Remote Sensing MDPI), `JGR-Bio` (J. Geophys. Res. Biogeosciences)
- **제목-시작-단어**: 제목 첫 1~3개 단어, 하이픈 연결. 영문만, 띄어쓰기 X, 특수문자 X.

### 현재 9개 논문 파일명 (참고 매핑)

| id | 파일명 |
|---|---|
| 9  | `2026_KOSERT_Comparing-LST` |
| 8  | `2026_KOSERT_Forest-Type-Seasonal` |
| 7  | `2026_EcolIndic_Multi-scale-typologies` |
| 6  | `2026_KOSERT_Non-destructive-Carbon` |
| 5  | `2026_RSE_Three-stage-framework` |
| 4  | `2026_AEE_Ecological-structures` |
| 3  | `2025_GEC_Assessing-Corvus` |
| 2  | `2024_KOSERT_Diel-Activity` |
| 1  | `2021_RemoteSens_Feasibility` |

예시:
- `covers/2026_EcolIndic_Multi-scale-typologies.jpg`
- `pdfs/2026_EcolIndic_Multi-scale-typologies.pdf`

## 표지 이미지 만드는 법

1. **저널 표지 캡처**: 출판 저널 홈페이지에서 해당 호(volume/issue)의 cover image 다운로드.
2. **논문 PDF 1페이지 캡처**: PDF 첫 페이지를 그래픽으로 캡처 (PowerPoint, Adobe, Preview 등에서 PDF → 이미지 export). A4 비율(210×297)을 유지하면 카드 안에 정확히 fit.
3. **Graphical abstract 활용**: 일부 저널은 graphical abstract를 제공 — 그것도 OK.

**권장 사양**:
- 비율: A4 세로 (210:297 = 1:1.414). 카드 컴포넌트가 `aspect-[210/297]` 박스 안에 `object-cover`로 표시합니다.
- 해상도: 가로 600~900px 정도면 충분.
- 형식: `.jpg` (사진형) 또는 `.png` (선명한 텍스트가 많을 때)

## site.json 연결

`src/data/site.json` → `publications.items[].cover` / `.pdf` 필드에 경로를 적어주세요.

```json
{
  "id": 7,
  "cover": "/papers/covers/2026_EcolIndic_Multi-scale-typologies.jpg",
  "pdf":   "/papers/pdfs/2026_EcolIndic_Multi-scale-typologies.pdf",
  ...
}
```

- 경로는 항상 `/papers/...` 로 시작 (public 폴더 기준 절대 경로).
- 파일이 없으면 빈 문자열 `""` 로 두세요 — 카드 컴포넌트가 자동으로 placeholder(저널명·연도 그라데이션)를 표시하고, PDF/Web 버튼은 회색 비활성 상태가 됩니다.

## 새 논문 추가 시 작업 흐름

1. 표지 + PDF 파일을 위 규칙으로 명명
2. 각각 `covers/`와 `pdfs/`에 저장
3. `site.json`의 `publications.items` 맨 앞에 새 항목 추가:
   - `id` 는 기존 최대값 + 1
   - `cover`, `pdf` 경로 입력
   - 나머지 필드 (date, year, role, journal, doi, authors, title) 채움
4. `git add . && git commit -m "add: 논문 #N 추가" && git push`

## 저작권 주의

논문 PDF를 자신의 사이트에 호스팅하려면 출판사 라이선스 확인 필요:
- **Open access (CC-BY 등)**: 자유롭게 게시 가능
- **Subscription 논문**: 보통 저자 accepted manuscript(피어리뷰 통과 후 출판 전 버전, "preprint" 또는 "postprint")만 공개 가능. publisher version은 불가
- **확실하지 않으면**: PDF 대신 DOI 링크만 두는 게 안전 (site.json `doi` 필드는 이미 활용 중)
