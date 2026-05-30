# CV (이력서)

Contact 섹션의 "CV (PDF)" 다운로드 버튼이 가리키는 파일을 여기에 둡니다.

## 사용법

1. CV를 **PDF로 export** 합니다.
2. 파일명을 **`Seunghyeon_Lee_CV.pdf`** 로 하여 이 폴더(`public/cv/`)에 저장합니다.
   - site.json `contact.cvUrl` 이 `/cv/Seunghyeon_Lee_CV.pdf` 를 가리킵니다.
   - 다른 파일명을 쓰려면 site.json 의 `cvUrl` 도 같이 바꾸세요.
3. `git add . && git commit -m "add: CV PDF" && git push`

## 동작

- PDF가 있으면 → Contact 카드 + 사이드바에 "CV (PDF)" 다운로드 버튼이 표시됩니다.
- `cvUrl` 이 빈 문자열이거나 파일이 없으면 → 버튼 자동 숨김 (단, 경로만 있고 파일이
  없으면 클릭 시 404 가 되므로, PDF를 올린 뒤 push 하세요).

## CV 갱신

새 버전이 나오면 같은 파일명으로 덮어쓰고 push 하면 됩니다 (링크 그대로 유지).
버전 관리가 필요하면 `_archive/` 하위에 날짜별로 보관하세요 (사이트 미노출).
