# 논문 자산 (Papers)

각 게재 논문의 표지 이미지와 원본 PDF를 여기에 저장합니다.

## 폴더 구조

```
papers/
├── covers/     # 논문 표지 이미지 (.jpg / .png / .webp)
└── pdfs/       # 논문 원본 PDF (다운로드용)
```

## 파일 이름 규칙

`pub_{id}_{short_name}.{ext}` 형식 사용. `{id}`는 `src/data/site.json` 의 `publications.items` 배열에서 각 항목의 `id` 필드와 동일.

예시:
- `covers/pub_07_ecological_indicators.jpg` (Ecological Indicators 논문 표지)
- `covers/pub_05_rse.jpg` (Remote Sensing of Environment 논문 표지)
- `pdfs/pub_07_ecological_indicators.pdf` (Ecological Indicators 논문 PDF)

## 표지 이미지 만드는 법

1. **저널 표지 캡처**: 출판 저널 홈페이지에서 해당 호(volume/issue)의 cover image 다운로드.
2. **논문 PDF 1페이지 캡처**: PDF 첫 페이지를 그래픽으로 캡처 (PowerPoint, Adobe, Preview 등에서 PDF → 이미지 export). A4 비율(210×297)을 유지하면 카드 안에 정확히 fit.
3. **Graphical abstract 활용**: 일부 저널은 graphical abstract를 제공 — 그것도 OK.

**권장 사양**:
- 비율: A4 세로 (210:297 = 1:1.414). 카드 컴포넌트가 `aspect-[210/297]` 박스 안에 `object-cover`로 표시합니다.
- 해상도: 가로 600~900px 정도면 충분. 너무 크면 빌드 시 자동 최적화되지 않음 (sharp 미사용).
- 형식: `.jpg` (사진 caps) 또는 `.png` (선명한 텍스트가 많을 때)

## site.json 연결

`src/data/site.json` → `publications.items[].cover` / `.pdf` 필드에 경로를 적어주세요.

```json
{
  "id": 7,
  "cover": "/papers/covers/pub_07_ecological_indicators.jpg",
  "pdf":   "/papers/pdfs/pub_07_ecological_indicators.pdf",
  ...
}
```

- 경로는 항상 `/papers/...` 로 시작 (public 폴더 기준 절대 경로).
- 파일이 없으면 빈 문자열 `""` 또는 필드 자체를 빈 채로 두세요 — 카드 컴포넌트가 자동으로 placeholder(저널명·연도 그라데이션)와 다운로드 버튼 비표시로 처리합니다.

## 저작권 주의

논문 PDF를 자신의 사이트에 호스팅하려면 출판사 라이선스 확인 필요:
- **Open access (CC-BY 등)**: 자유롭게 게시 가능
- **Subscription 논문**: 보통 저자 accepted manuscript(피어리뷰 통과 후 출판 전 버전, "preprint" 또는 "postprint")만 공개 가능. publisher version은 불가
- **확실하지 않으면**: PDF 대신 DOI 링크만 두는 게 안전 (site.json `doi` 필드는 이미 활용 중)
