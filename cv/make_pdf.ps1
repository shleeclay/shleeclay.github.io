# make_pdf.ps1 — convert a .docx to PDF with LibreOffice (reliable spacing + font embedding).
# Word's COM export records wrong glyph widths -> uneven letter spacing. LibreOffice does not.
# Usage:  powershell -File make_pdf.ps1 [Lee_Seunghyeon_CV_v7.docx]
param([string]$Docx = "Lee_Seunghyeon_CV_v7.docx")

# clear conda PYTHON* vars so LibreOffice's bundled python doesn't warn
$env:PYTHONHOME = $null; $env:PYTHONPATH = $null

$soffice = "C:\Program Files\LibreOffice\program\soffice.exe"
$full = (Resolve-Path $Docx).Path
$dir  = Split-Path -Parent $full
& $soffice --headless --convert-to pdf --outdir $dir $full
Write-Output ("PDF -> " + ($full -replace '\.docx$', '.pdf'))
