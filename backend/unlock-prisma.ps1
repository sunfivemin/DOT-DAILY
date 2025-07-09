# unlock-prisma.ps1
Write-Host "🔓 Prisma DLL 잠금 해제 중..."

# 잠긴 파일 경로
$dllPath = "C:\Users\GAY\Desktop\project\dot-daily\DOT-DAILY\backend\node_modules\.prisma\client\query_engine-windows.dll.node"

# 잠긴 프로세스 찾기
$lockedProcesses = Get-Process | Where-Object {
    $_.Modules | Where-Object { $_.FileName -eq $dllPath }
} -ErrorAction SilentlyContinue

if ($lockedProcesses) {
    Write-Host "⚠ 잠긴 프로세스 발견: $($lockedProcesses.Name)"
    foreach ($proc in $lockedProcesses) {
        Write-Host "❌ 프로세스 종료 중: $($proc.Name)"
        Stop-Process -Id $proc.Id -Force
    }
} else {
    Write-Host "✅ 잠긴 프로세스 없음"
}

# 잠긴 파일 삭제 시도
if (Test-Path $dllPath) {
    Write-Host "🗑 DLL 파일 삭제 중..."
    Remove-Item $dllPath -Force
} else {
    Write-Host "✅ DLL 파일 이미 없음"
}

# Prisma 클라이언트 재빌드
Write-Host "⚙ Prisma Client 재빌드 중..."
npm run db:generate

Write-Host "🎉 완료! Prisma Client 잠금이 해제되었습니다."
