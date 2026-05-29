# CV 작업 폴더 — 참고자료 & 작업 노트

> 대상: 2026년 8월 박사 졸업 → 해외 포닥(forest remote sensing / LiDAR · GEDI / ecology) 지원용 academic CV
> 작업물: 이 폴더 안에서만 관리. 최종 PDF는 `../public/cv/` 로 내보내 포트폴리오 사이트에 연결.

## 1. 분야 현직 연구자 실제 CV (내용·구성 벤치마킹)
1. **Adrian Pascual** — UMD 조교수, GEDI Science Team. ⭐ 가장 가까운 레퍼런스 (GEDI·ALS·canopy height·biomass)
   https://bsosdev1.umd.edu/sites/geog.umd.edu/files/cv/Pascual_Adrian_CV_UMD_August_2024.pdf
2. **Brady S. Hardiman** — 산림생태·LiDAR 캐노피 구조 (※ 선생님 Purdue 인턴십 PI). 공개본은 2014년판
   https://bradyhardiman.wordpress.com/wp-content/uploads/2014/08/hardiman-curriculum-vitae.pdf
3. **The Savvy Scientist** — 분야별 실제 연구자 CV 모음
   https://www.thesavvyscientist.com/academic-cv-examples/
4. **Mordecai Lab (Stanford)** — 합격한 생태학 교수 지원서 + 샘플 CV 공개
   https://www.mordecailab.com/blog/2021/10/11/how-to-apply-for-a-tenure-track-faculty-job-in-ecology

## 2. 대학·기관 표준 샘플/가이드 (형식·섹션 순서)
5. **Harvard GSAS — CVs & Cover Letters** (포닥 샘플 포함) ⭐ 표준
   https://hwpi.harvard.edu/files/ocs/files/gsas-cvs-and-cover-letters.pdf
6. **UC Davis — Postdoctoral Scholar CV 샘플 (시간순)**
   https://icc.ucdavis.edu/sites/g/files/dgvnsk2236/files/local_resources/resume-samples/postdoc.pdf
7. **UPenn — PhD/Postdoc CV 샘플 모음**
   https://careerservices.upenn.edu/preparing-effective-resumes/phd-postdoc-resume-samples/
8. **UCC — CV Guide for PhD & Postdoctoral Researchers (유럽식)**
   https://www.ucc.ie/en/media/support/careers/CVGuideforPhDandPostdoctoralResearchers.pdf
9. **Cornell — Academic CVs 101**
   https://postdocs.cornell.edu/postdoc-careers/academic-job-search/curriculum-vitaes-cvs-101/
10. **UC Berkeley — The CV (Part 1) 개요 + 예시**
    https://career.berkeley.edu/grad-students-postdocs/academic-job-search/the-cv-part-1-overview/

## 형식 핵심 (위 자료 공통)
- 길이: 초기 경력 2–4p. 미국은 짧게(2p), 유럽은 길어도 무방. → 선생님은 실적이 많아 4–6p 풀버전 + 2p US 단축본 두 종 권장.
- 섹션 순서: 이름·연락처 → Research Interests → Education → Research Experience → **Publications**(1저자 강조) → Conference Presentations → Grants/Projects → Patents → Honors → Teaching → Skills → References
- 분야 특성: Technical Skills(Python·GEE·R·LAStools/PDAL·LiDAR) 및 데이터/소프트웨어 산출물을 별도 섹션으로 부각

## 이 폴더 파일
- `build_cv.py` — CV 생성 스크립트 (데이터 인라인 포함, site.json 기반)
- `Lee_Seunghyeon_CV_v1.docx` — 생성된 풀버전 CV (편집·버전관리 대상)
- 최종: `python build_cv.py` → docx → (Word에서) PDF 내보내기 → `../public/cv/`

## TODO / 채워 넣을 placeholder
- [ ] Google Scholar / ORCID 실제 URL (site.json 현재 비어 있음)
- [ ] References 3인 이메일 (지도교수 송영근, Prof. Brady Hardiman, Prof. Jaeyoung Ha)
- [ ] 박사학위 논문 제목(Dissertation title)
- [ ] 일부 KOSERT 논문 DOI/권호
