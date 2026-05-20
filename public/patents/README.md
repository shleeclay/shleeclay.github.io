# 특허 자산 (Patents)

등록된 특허의 특허증 이미지와 원본 PDF를 여기에 저장합니다.

## 폴더 구조

```
patents/
├── certificates/   # 특허증 이미지 (.jpg / .png)
└── pdfs/           # 특허증/공보 PDF (다운로드용)
```

## 파일 이름 규칙

`patent_{id}_{short_name}.{ext}` 형식. `{id}`는 `src/data/site.json` → `patents.items[].id`.

예시:
- `certificates/patent_09_wetland_lidar.jpg` (드론 LiDAR 습지 식생 구조 판별 — id 9)
- `pdfs/patent_09_wetland_lidar.pdf`
- `certificates/patent_03_thermal_comfort.jpg` (옥외 열 쾌적성 — id 3)

## 출원 중인 특허 (status: application)

- 특허증이 없으므로 `certificate`/`pdf` 필드를 빈 문자열로 두면 됩니다.
- 카드 컴포넌트가 자동으로 "Application" 칩 + placeholder 그라데이션으로 표시.

## 특허증 이미지 만드는 법

1. **키프리스 / 특허청 발급 특허증**: PDF로 발급받은 특허증의 1페이지를 이미지로 캡처.
2. **여러 페이지 결합**: 필요하면 첫 페이지(요약+청구항)만 캡처해서 cover로 사용, 전체는 pdf로.

**권장 사양**: A4 세로 비율 (210:297). 카드와 동일 비율로 맞춤.

## site.json 연결

```json
{
  "id": 9,
  "certificate": "/patents/certificates/patent_09_wetland_lidar.jpg",
  "pdf":         "/patents/pdfs/patent_09_wetland_lidar.pdf",
  ...
}
```

## 보안 주의

특허증에는 출원인 주민등록번호 등 민감 정보가 포함될 수 있습니다. 게시 전에:
- 주민등록번호, 주소 등 민감 정보 마스킹 (검은 박스 처리)
- 출원/등록 번호, 발명자, 출원인, 등록일 등 공개 가능한 정보만 노출
