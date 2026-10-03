param([switch]$Authenticated, [ValidateSet('Tutor','Student','Organiser','Master')][string]$Role='Tutor')
$ErrorActionPreference='Stop'
$api='https://tutor-mx-api.onrender.com'
function Test-Read([string]$path, [hashtable]$headers, [int]$expected) {
  $watch=[Diagnostics.Stopwatch]::StartNew()
  try { $r=Invoke-WebRequest -Uri ($api+$path) -Method Get -Headers $headers -UseBasicParsing -TimeoutSec 90; $status=[int]$r.StatusCode }
  catch { if ($_.Exception.Response) { $status=[int]$_.Exception.Response.StatusCode } else { Write-Output "$path NETWORK ERROR"; return } }
  $watch.Stop()
  [pscustomobject]@{Path=$path;Status=$status;Expected=$expected;Pass=($status -eq $expected);Milliseconds=$watch.ElapsedMilliseconds}
}
Test-Read '/health' @{} 200
Test-Read '/ready' @{} 200
Test-Read '/api/tutors' @{} 401
if ($Authenticated) {
  $secure=Read-Host 'API access token (kept local; not printed)' -AsSecureString
  $ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try { $token=[Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
  finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
  try {
    $headers=@{Authorization="Bearer $token"}
    Test-Read '/api/me' $headers 200
    switch ($Role) {
      'Tutor' { Test-Read '/api/tutor/dashboard' $headers 200; Test-Read '/api/tutor/time-slots' $headers 200 }
      'Student' { Test-Read '/api/student/open-work' $headers 200; Test-Read '/api/student/volunteer-requests' $headers 200 }
      'Organiser' { Test-Read '/api/tutors' $headers 200 }
      'Master' { Test-Read '/api/master-organiser/organiser-applications' $headers 200 }
    }
  } finally { Remove-Variable token,secure,ptr,headers -ErrorAction SilentlyContinue }
}
# GET only. No private response bodies, tokens, writes or production load test.
