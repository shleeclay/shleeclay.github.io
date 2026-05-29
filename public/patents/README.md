# 특허 자산 (Patents)

등록 특허의 표지 이미지(`covers/`)와 보관용 원본 PDF(`pdfs/`)를 저장합니다.

> **사이트에는 표지 이미지만 표시됩니다.** PDF는 로컬/git 보관용이며 사이트에서
> 다운로드·노출되지 않습니다. 한국 특허 정보는 [KIPRIS](https://www.kipris.or.kr)와
> [Google Patents](https://patents.google.com)에서 공식 조회가 가능합니다.

## 폴더 구조

```
patents/
├── covers/   # 특허증 1페이지 표지 이미지 (.jpg / .png → 빌드 시 자동 webp 변환)
└── pdfs/     # 특허증/공보 원본 PDF (보관용 — 사이트 미노출)
```

`papers/`(covers + pdfs)와 동일한 구조입니다. 단, papers는 PDF 다운로드 버튼이
있지만 patents의 pdfs는 보관 전용입니다.

## 파일 이름 규칙

`{등록연도}_{기술분야}_{제목-영문-시작-단어}.{확장자}` 형식. (covers·pdfs 동일)

- **등록연도**: 4자리 (등록 특허만 — 출원 중은 카드 비표시이므로 표지 불필요)
- **기술분야**: `LiDAR` / `Drone` / `Thermal` / `Wildlife` / `Tree` / `Climate` / `Platform`
- **제목-영문-시작-단어**: 영문 1~3 단어, 하이픈 연결.

### 현재 7개 등록 특허 파일명 (참고 매핑)

| id | 등록일 | 분야 | 파일명 |
|---|---|---|---|
| 9 | 2025/04/28 | LiDAR     | `2025_LiDAR_Wetland-Vegetation-Structure` |
| 7 | 2025/09/17 | Platform  | `2025_Platform_Tree-Management` |
| 6 | 2024/11/26 | Tree      | `2024_Tree_Roadside-Tree-Info` |
| 5 | 2023/07/31 | Wildlife  | `2023_Wildlife_Tracker-Missing-Point` |
| 3 | 2022/04/12 | Climate   | `2022_Climate_Thermal-Comfort` |
| 2 | 2022/05/27 | Wildlife  | `2022_Wildlife_Drone-Thermal-Detection` |
| 1 | 2022/10/05 | Thermal   | `2022_Thermal_Self-Heating-Module` |

예시:
- `covers/2025_LiDAR_Wetland-Vegetation-Structure.jpg` (표지 — 사이트 표시)
- `pdfs/2025_LiDAR_Wetland-Vegetation-Structure.pdf` (원본 — 보관용)

## 등록 vs 출원 표시 방식

- **등록 특허** (`status: "registered"`) → 3열 카드 그리드. `certificate` 이미지가 카드 표지.
- **출원 중** (`status: "application"`) → 컴팩트 리스트. 표지 안 씀.

## 표지 이미지 만드는 법

1. **KIPRIS 또는 발급된 특허증 PDF**에서 1페이지를 이미지로 export.
2. **민감 정보 마스킹**: 주민등록번호·주소 등은 가림. 출원/등록 번호·발명자·출원인·등록일만 노출.
3. **권장 사양**: A4 세로 비율(210:297). 빌드 시 자동으로 800px webp로 변환됨.

## site.json 연결

```json
{
  "id": 9,
  "status": "registered",
  "certificate": "/patents/covers/2025_LiDAR_Wetland-Vegetation-Structure.jpg",
  ...
}
```

- `certificate` 경로는 `/patents/covers/...` 로 시작 (확장자는 .jpg로 적어도 빌드가 .webp로 매핑)
- 빈 문자열이면 placeholder 그라데이션 표시

## 새 특허 등록 시 작업 흐름

1. 특허증 1페이지 이미지 캡처(+마스킹) → `covers/`에 저장. 원본 PDF는 `pdfs/`에 보관.
2. `site.json`의 해당 항목: `status`를 `registered`로, `registrationDate`·`certificate` 입력.
3. `git add . && git commit -m "update: 특허 #N 등록" && git push`
