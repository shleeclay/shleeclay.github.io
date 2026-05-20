# 특허 자산 (Patents)

등록 특허의 표지(특허증 1페이지 이미지)만 저장합니다.

> **PDF 다운로드 기능은 비활성화되어 있습니다.** 한국 특허 정보는 모두 [KIPRIS](https://www.kipris.or.kr)와 [Google Patents](https://patents.google.com)에서 공식 PDF 조회·다운로드가 가능하기 때문에, 별도 호스팅보다 외부 조회가 더 신뢰성 있고 유지보수 부담도 적습니다.

## 폴더 구조

```
patents/
└── certificates/   # 특허증 1페이지 이미지 (.jpg / .png)
```

## 파일 이름 규칙

`{등록연도}_{기술분야}_{제목-영문-시작-단어}.{확장자}` 형식.

- **등록연도**: 4자리 (등록 특허만 — 출원 중인 경우 카드 비표시이므로 파일 불필요)
- **기술분야**: 7가지 영문 카테고리 중 선택
  - `LiDAR` (라이다)
  - `Drone` (드론, LiDAR 외)
  - `Thermal` (열화상 카메라/센서)
  - `Wildlife` (야생동물 모니터링)
  - `Tree` (수목/가로수 관리)
  - `Climate` (기후/열 쾌적성)
  - `Platform` (소프트웨어/플랫폼)
- **제목-영문-시작-단어**: 영문 1~3 단어, 하이픈 연결. 띄어쓰기·특수문자 제거.

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
- `certificates/2025_LiDAR_Wetland-Vegetation-Structure.jpg`
- `certificates/2022_Climate_Thermal-Comfort.jpg`

## 등록 vs 출원 표시 방식

- **등록 특허** (`status: "registered"`) → 3열 카드 그리드. `certificate` 이미지가 카드 표지로 사용됨.
- **출원 중** (`status: "application"`) → 컴팩트 리스트. 표지 이미지 안 씀 → 파일 불필요.

## 특허증 이미지 만드는 법

1. **키프리스(KIPRIS) 또는 발급된 특허증 PDF**에서 1페이지를 이미지로 캡처 (PowerPoint, Adobe, macOS Preview 등에서 PDF → 이미지 export).
2. **민감 정보 마스킹**: 출원인 주민등록번호·주소 등이 보이면 검은 박스로 가림. 출원/등록 번호, 발명자, 출원인, 등록일 등 공개 정보만 노출.
3. **권장 사양**: A4 세로 비율 (210:297). 가로 600~900px.

## site.json 연결

```json
{
  "id": 9,
  "status": "registered",
  "certificate": "/patents/certificates/2025_LiDAR_Wetland-Vegetation-Structure.jpg",
  ...
}
```

- 경로는 `/patents/certificates/...` 로 시작
- 빈 문자열이면 placeholder 그라데이션 표시 (어떤 표지든 안전하게 fallback)

## 새 특허 등록 시 작업 흐름

1. 특허증 1페이지 이미지 캡처 + 민감 정보 마스킹
2. 위 규칙으로 파일 명명 → `certificates/`에 저장
3. `site.json`의 해당 항목:
   - `status` 를 `"application"` → `"registered"` 로 변경
   - `registrationDate` 입력
   - `certificate` 경로 입력
4. `git add . && git commit -m "update: 특허 #N 등록" && git push`
