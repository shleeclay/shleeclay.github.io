# -*- coding: utf-8 -*-
"""add_paper.py — 새 논문 1편을 세 정본(+파생물)에 일괄 등록한다.

하는 일 (전부 멱등 — 이미 있으면 그 단계는 스킵):
  1. xlsx 'Publications' 행 추가 (백업 cv/old/ 생성 후)
  2. site.json publications.items 맨 앞에 항목 골격 삽입 (텍스트 국소 삽입, json.dump 미사용)
  3. (spec 에 figures 가 있으면) src/data/figures.json 에 캐러셀 등록
  4. public/papers/README.md 매핑 표에 slug 행 추가
  5. (spec 에 cover_src/pdf_src 가 있으면) public/papers/ 에 자산 복사
  6. _export_csv.py + _check_sync.py 실행해 즉시 검증

실행:  python add_paper.py --spec <spec.json>
spec 예시는 add_paper_spec_example.json 참조. bib 은 별도다:
  citations/original/ + individual/ 에 저장 → normalize_bib.py → merge_bib.py (citations/README.md)
"""
import argparse
import datetime
import glob
import io
import json
import os
import shutil
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
XLSX = os.path.join(HERE, "application_info.xlsx")
SITE = os.path.join(HERE, "..", "src", "data", "site.json")
FIGJ = os.path.join(HERE, "..", "src", "data", "figures.json")
PAPERS = os.path.join(HERE, "..", "public", "papers")

REQUIRED = ["doi", "date", "role", "index", "journal_en", "journal_ko",
            "title_ko", "title_en", "authors_en", "authors_ko",
            "corr_ko", "corr_en", "author_rank", "author_total", "slug"]


def load_spec(path):
    spec = json.load(io.open(path, encoding="utf-8"))
    missing = [k for k in REQUIRED if k not in spec or spec[k] in (None, "", [])]
    if missing:
        sys.exit(f"spec 필수 키 누락: {', '.join(missing)}")
    if not spec["date"].count("/") == 2:
        sys.exit('date 는 "YYYY/MM/DD" 형식이어야 합니다')
    return spec


def backup_xlsx():
    ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    dst = os.path.join(HERE, "old", f"application_info_backup_{ts}.xlsx")
    shutil.copy2(XLSX, dst)
    print(f"xlsx 백업: old/{os.path.basename(dst)}")


def add_xlsx_row(spec, pub_id):
    import openpyxl
    from openpyxl.styles import Font, Alignment, Border, Side
    wb = openpyxl.load_workbook(XLSX)
    ws = wb["Publications"]
    h = [c.value for c in ws[1]]
    col = {n: h.index(n) for n in h if n}
    if any(r[col["DOI"]].value == spec["doi"] for r in ws.iter_rows(min_row=2)):
        print("xlsx Publications: DOI 이미 존재 — 스킵")
        return False
    backup_xlsx()
    row = [None] * len(h)

    def put(name, val):
        if val not in (None, ""):
            row[col[name]] = val

    put("No.", pub_id)
    put("Year", int(spec["date"][:4]))
    put("Role", spec["role"])
    put("Index", spec["index"])
    put("IF", spec.get("if"))
    put("Quartile", spec.get("quartile"))
    put("학술지(KO)", spec["journal_ko"])
    put("Journal(EN)", spec["journal_en"])
    put("DOI", spec["doi"])
    put("저자(KO)", ", ".join(spec["authors_ko"]))
    put("Authors(EN)", ", ".join(spec["authors_en"]))
    put("교신저자(KO)", spec["corr_ko"])
    put("교신저자(EN)", spec["corr_en"])
    put("논문제목(KO)", spec["title_ko"])
    put("Title(EN)", spec["title_en"])
    put("권(Volume)", spec.get("volume"))
    put("호(Issue)", spec.get("issue"))
    put("페이지(Pages)", spec.get("pages"))
    put("게재일자", spec["date"].replace("/", ". "))   # "2026/10/31" → "2026. 10. 31" (_sync_site 역변환과 호환)
    put("저자순위(본인)", spec["author_rank"])
    put("총저자수", spec["author_total"])
    ws.append(row)
    thin = Side(style="thin", color="D9D9D9")
    bd = Border(left=thin, right=thin, top=thin, bottom=thin)
    for c in ws[ws.max_row]:
        c.font = Font(size=10)
        c.alignment = Alignment(vertical="top", wrap_text=True)
        c.border = bd
    wb.save(XLSX)
    print(f"xlsx Publications: No.{pub_id} 추가")
    return True


def detect_asset(sub, slug, ext_hint=None):
    """public/papers/<sub>/ 에서 slug 로 시작하는 파일을 찾아 site 경로를 돌려준다."""
    hits = glob.glob(os.path.join(PAPERS, sub, slug + ".*"))
    if hits:
        return f"/papers/{sub}/{os.path.basename(hits[0])}"
    return ""


def copy_assets(spec):
    for key, sub, fixed_ext in (("cover_src", "covers", None), ("pdf_src", "pdfs", ".pdf")):
        src = spec.get(key)
        if not src:
            continue
        ext = fixed_ext or os.path.splitext(src)[1]
        dst = os.path.join(PAPERS, sub, spec["slug"] + ext)
        if os.path.exists(dst):
            print(f"{sub}/: 이미 존재 — 스킵")
        else:
            shutil.copy2(src, dst)
            print(f"{sub}/{os.path.basename(dst)} 복사")


def insert_site_item(spec, pub_id):
    s = io.open(SITE, encoding="utf-8").read()
    data = json.loads(s)
    if any((it.get("doi") or "").lower() == spec["doi"].lower()
           for it in data["publications"]["items"]):
        print("site.json publications: DOI 이미 존재 — 스킵")
        return False
    cover = spec.get("cover") or detect_asset("covers", spec["slug"])
    pdf = spec.get("pdf") or detect_asset("pdfs", spec["slug"])
    j = lambda v: json.dumps(v, ensure_ascii=False)
    block = [
        '      {',
        f'        "id": {pub_id},',
        f'        "date": {j(spec["date"])},',
        f'        "year": {int(spec["date"][:4])},',
        f'        "role": {j(spec["role"])},',
        f'        "journal": {j(spec["journal_en"])},',
        f'        "index": {j(spec["index"])},',
        f'        "if": {j(str(spec.get("if") or ""))},',
        f'        "quartile": {j(str(spec.get("quartile") or ""))},',
        f'        "doi": {j(spec["doi"])},',
        f'        "cover": {j(cover)},',
        f'        "pdf":   {j(pdf)},',
        f'        "authors": {j(spec["authors_en"])},',
        f'        "journalKo": {j(spec["journal_ko"])},',
        f'        "authorsKo": {j(spec["authors_ko"])},',
        '        "title": {',
        f'          "ko": {j(spec["title_ko"])},',
        f'          "en": {j(spec["title_en"])}',
        '        }',
        '      },',
    ]
    lines = s.split("\n")
    si = next(i for i, l in enumerate(lines) if l.strip().startswith('"publications":'))
    ii = next(i for i in range(si, len(lines)) if lines[i].strip() == '"items": [')
    lines = lines[:ii + 1] + block + lines[ii + 1:]
    s2 = "\n".join(lines)
    json.loads(s2)                       # 파싱 검증 — 실패 시 저장 안 함
    io.open(SITE, "w", encoding="utf-8", newline="\n").write(s2)
    print(f"site.json publications: id={pub_id} 삽입 (JSON 파싱 OK)")
    return True


def add_figures(spec, pub_id):
    figs = spec.get("figures")
    if not figs:
        return
    data = json.load(io.open(FIGJ, encoding="utf-8"))
    if str(pub_id) in data:
        print("figures.json: 이미 존재 — 스킵")
        return
    data[str(pub_id)] = [
        {"src": f.get("src") or f"/papers/figures/{spec['slug']}/fig{i + 1}.webp",
         "caption": f["caption"]}
        for i, f in enumerate(figs)
    ]
    io.open(FIGJ, "w", encoding="utf-8", newline="\n").write(
        json.dumps(data, ensure_ascii=False, indent=1) + "\n")
    print(f"figures.json: id={pub_id} ({len(figs)}매) 추가")


def update_readme(spec, pub_id):
    import re
    path = os.path.join(PAPERS, "README.md")
    s = io.open(path, encoding="utf-8").read()
    if spec["slug"] in s:
        print("papers/README.md: slug 이미 존재 — 스킵")
        return
    s = re.sub(r"### 현재 (\d+)개", lambda m: f"### 현재 {int(m.group(1)) + 1}개", s, count=1)
    lines = s.split("\n")
    sep = next(i for i, l in enumerate(lines) if l.strip() == "|---|---|")
    lines.insert(sep + 1, f"| {pub_id} | `{spec['slug']}` |")
    io.open(path, "w", encoding="utf-8", newline="\n").write("\n".join(lines))
    print(f"papers/README.md: id={pub_id} 행 추가")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--spec", required=True, help="논문 1편의 spec JSON 경로")
    ap.add_argument("--no-check", action="store_true", help="_export_csv/_check_sync 실행 생략")
    a = ap.parse_args()
    spec = load_spec(a.spec)

    items = json.load(io.open(SITE, encoding="utf-8"))["publications"]["items"]
    existing = next((it for it in items
                     if (it.get("doi") or "").lower() == spec["doi"].lower()), None)
    # 재실행 시 새 id 를 또 따지 않도록, 이미 삽입된 항목이 있으면 그 id 를 쓴다
    pub_id = spec.get("no") or (existing["id"] if existing else max(it["id"] for it in items) + 1)
    print(f"== add_paper: id={pub_id}  {spec['slug']} ==")

    copy_assets(spec)
    xlsx_changed = add_xlsx_row(spec, pub_id)
    insert_site_item(spec, pub_id)
    add_figures(spec, pub_id)
    update_readme(spec, pub_id)

    if not a.no_check:
        if xlsx_changed:
            subprocess.run([sys.executable, os.path.join(HERE, "_export_csv.py")], cwd=HERE)
        subprocess.run([sys.executable, os.path.join(HERE, "_check_sync.py")], cwd=HERE)

    print("""
남은 수동 단계 (CLAUDE.md §3·§9):
  1. bib: citations/original/ + individual/ 저장 → normalize_bib.py → merge_bib.py && bib_to_xlsx.py
  2. python _sync_site.py          → "반영할 변경 없음" 확인
  3. python build_cv.py && python _cv_baseline.py --check → powershell -File make_pdf.ps1 -Publish
  4. cd .. && npm run build""")


if __name__ == "__main__":
    main()
