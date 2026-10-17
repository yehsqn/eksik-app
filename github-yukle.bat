@echo off
title GitHub'a Otomatik Yukle
chcp 65001 >nul
echo ===================================================
echo   🚀 GitHub'a Eksik Dosyalar Yukleniyor...
echo ===================================================
echo.

cd /d "%~dp0"

git add .
git commit -m "Fix static assets and auto unzip" 2>nul
git push -u origin main

echo.
echo ===================================================
if %ERRORLEVEL% equ 0 (
    echo   [OK] TEBRIKLER! Dosyalar basariyla GitHub'a yuklendi.
    echo   Render 1-2 dakika icinde yehsqn.info'yu guncelleyecektir.
) else (
    echo   [!] Lutfen acilan tarayici sekmesinde GitHub girisini onaylayin.
)
echo ===================================================
echo.
pause
