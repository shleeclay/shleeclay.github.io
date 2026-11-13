# -*- coding: utf-8 -*-
"""add_talk.py — 초청 강연 1건을 xlsx + site.json 에 일괄 등록한다.

하는 일 (전부 멱등 — 이미 있으면 그 단계는 스킵):
  1. xlsx 'Invited Talks' 행 추가 — 기존 No. 전부 +1, 새 행이 No.1 (최신순 재부여, 백업 후)
  2. site.json invitedTalks.items 맨 앞에 항목 골격 삽입 (텍스트 국소 삽입, json.dump 미사용)
  3. _export_csv.py + _check_sync.py 실행해 즉시 검증

실행:  python add_talk.py --spec <spec.json>
시트 판정(Teaching/Invited Talks/Conferences)은 CLAUDE.md §4 "세 시트의 경계" 한 줄로 먼저 확인.
Type 어휘: seminar · colloquium · keynote · panel · guest lecture · conference
"""
import argparse
import datetime
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

REQUIRED = ["date", "type", "scope", "title_ko", "title_en",
            "host_ko", "host_en", "venue_ko", "venue_en"]
TYPES = {"seminar", "colloquium", "keynote", "panel", "guest lecture", "conference"}


def load_spec(path):
    spec = json.load(io.open(path, encoding="utf-8"))
    missing = [k for k in REQUIRED if k not in spec or spec[k] in (None, "")]
    if missing:
        sys.exit(f"spec 필수 키 누락: {', '.join(missing)}")
    if spec["type"] not in TYPES:
        sys.exit(f'Type "{spec["type"]}" 는 어휘 밖입니다: {sorted(TYPES)}')
    if not spec["date"].count("/") == 2:
        sys.exit('date 는 "YYYY/MM/DD" 형식이어야 합니다')
    return spec


def add_xlsx_row(spec):
    import openpyxl
    from openpyxl.styles import Font, Alignment, Border, Side
    wb = openpyxl.load_workbook(XLSX)
    ws = wb["Invited Talks"]
    h = [c.value for c in ws[1]]
    col = {n: h.index(n) for n in h if n}
    if any(str(r[col["Date"]].value) == spec["date"] for r in ws.iter_rows(min_row=2)):
        print("xlsx Invited Talks: Date 이미 존재 — 스킵")
        return False
    ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    dst = os.path.join(HERE, "old", f"application_info_backup_{ts}.xlsx")
    shutil.copy2(XLSX, dst)
    print(f"xlsx 백업: old/{os.path.basename(dst)}")
    for r in ws.iter_rows(min_row=2):            # 최신순 재부여: 기존 전부 +1
        if isinstance(r[col["No."]].value, int):
            r[col["No."]].value += 1
    row = [None] * len(h)
    row[col["No."]] = 1
    row[col["Date"]] = spec["date"]
    row[col["Year"]] = int(spec["date"][:4])
    row[col["Type"]] = spec["type"]
    row[col["Scope"]] = spec["scope"]
    row[col["제목(KO)"]] = spec["title_ko"]
    row[col["Title(EN)"]] = spec["title_en"]
    row[col["주최(KO)"]] = spec["host_ko"]
    row[col["Host(EN)"]] = spec["host_en"]
    row[col["장소(KO)"]] = spec["venue_ko"]
    row[col["Venue(EN)"]] = spec["venue_en"]
    row[col["웹 표시"]] = spec.get("web", "Y")
    ws.append(row)
    thin = Side(style="thin", color="D9D9D9")
    bd = Border(left=thin, right=thin, top=thin, bottom=thin)
    for c in ws[ws.max_row]:
        c.font = Font(size=10)
        c.alignment = Alignment(vertical="top", wrap_text=True)
        c.border = bd
    wb.save(XLSX)
    print(f"xlsx Invited Talks: {spec['date']} 추가 (No.1, 기존 No. +1)")
    return True


def insert_site_item(spec):
    s = io.open(SITE, encoding="utf-8").read()
    data = json.loads(s)
    if any(it.get("date") == spec["date"]
           for it in data.get("invitedTalks", {}).get("items", [])):
        print("site.json invitedTalks: date 이미 존재 — 스킵")
        return False
    j = lambda v: json.dumps(v, ensure_ascii=False)
    block = [
        '      {',
        f'        "date": {j(spec["date"])},',
        f'        "year": {int(spec["date"][:4])},',
        f'        "type": {j(spec["type"])},',
        f'        "scope": {j(spec["scope"])},',
        '        "title": {',
        f'          "ko": {j(spec["title_ko"])},',
        f'          "en": {j(spec["title_en"])}',
        '        },',
        '        "host": {',
        f'          "ko": {j(spec["host_ko"])},',
        f'          "en": {j(spec["host_en"])}',
        '        },',
        '        "venue": {',
        f'          "ko": {j(spec["venue_ko"])},',
        f'          "en": {j(spec["venue_en"])}',
        '        }',
        '      },',
    ]
    lines = s.split("\n")
    si = next(i for i, l in enumerate(lines) if l.strip().startswith('"invitedTalks":'))
    ii = next(i for i in range(si, len(lines)) if lines[i].strip() == '"items": [')
    lines = lines[:ii + 1] + block + lines[ii + 1:]
    s2 = "\n".join(lines)
    json.loads(s2)                       # 파싱 검증 — 실패 시 저장 안 함
    io.open(SITE, "w", encoding="utf-8", newline="\n").write(s2)
    print(f"site.json invitedTalks: {spec['date']} 삽입 (JSON 파싱 OK)")
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--spec", required=True, help="강연 1건의 spec JSON 경로")
    ap.add_argument("--no-check", action="store_true", help="_export_csv/_check_sync 실행 생략")
    a = ap.parse_args()
    spec = load_spec(a.spec)
    print(f"== add_talk: {spec['date']}  {spec['title_ko']} ==")

    xlsx_changed = add_xlsx_row(spec)
    insert_site_item(spec)

    if not a.no_check:
        if xlsx_changed:
            subprocess.run([sys.executable, os.path.join(HERE, "_export_csv.py")], cwd=HERE)
        subprocess.run([sys.executable, os.path.join(HERE, "_check_sync.py")], cwd=HERE)

    print("""
남은 수동 단계 (CLAUDE.md §3·§9):
  1. python _sync_site.py          → "반영할 변경 없음" 확인
  2. python build_cv.py && python _cv_baseline.py --check → powershell -File make_pdf.ps1 -Publish
  3. cd .. && npm run build""")


if __name__ == "__main__":
    main()
