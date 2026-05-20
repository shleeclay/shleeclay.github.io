# 특허 자산 (Patents)

등록 특허의 특허증 이미지(카드 표지용)만 저장합니다.

> **PDF 다운로드 기능은 비활성화되어 있습니다.** 한국 특허 정보는 모두 [KIPRIS](https://www.kipris.or.kr)와 [Google Patents](https://patents.google.com)에서 공식 PDF 조회·다운로드가 가능하기 때문에, 별도 호스팅보다 외부 조회가 더 신뢰성 있고 유지보수 부담도 적습니다.

## 폴더 구조

```
patents/
└── certificates/   # 특허증 표지 이미지 (.jpg / .png)
```

## 파일 이름 규칙

`patent_{id}_{short_name}.{ext}` 형식. `{id}`는 `src/data/site.json` → `patents.items[].id`.

예시:
- `certificates/patent_09_wetland_lidar.jpg` (드론 LiDAR 습지 식생 구조 — id 9)
- `certificates/patent_03_thermal_comfort.jpg` (옥외 열 쾌적성 — id 3)

## 등록 vs 출원 표시 방식

- **등록 특허** (`status: "registered"`) → 3열 카드 그리드. `certificate` 이미지가 카드 표지로 사용됨.
- **출원 중** (`status: "application"`) → 컴팩트 리스트. 표지 이미지 안 씀.

## 특허증 이미지 만드는 법

1. 등록 특허증 PDF를 발급받아 1페이지를 이미지로 캡처 (PowerPoint, Adobe, macOS Preview 등에서 export)
2. **민감 정보 마스킹**: 출원인 주민등록번호·주소 등이 보이면 검은 박스 처리. 출원/등록 번호, 발명자, 출원인, 등록일 등 공개 정보만 노출.
3. **권장 사양**: A4 세로 비율 (210:297), 가로 600~900px

## site.json 연결

```json
{
  "id": 9,
  "status": "registered",
  "certificate": "/patents/certificates/patent_09_wetland_lidar.jpg",
  ...
}
```

- 경로는 `/patents/certificates/...` 로 시작
- 빈 문자열이면 placeholder 그라데이션 표시
