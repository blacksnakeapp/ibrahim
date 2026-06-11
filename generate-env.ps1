$envs = @{}
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $parts = $line -split '=', 2
            if ($parts.Count -eq 2) {
                $envs[$parts[0].Trim()] = $parts[1].Trim()
            }
        }
    }
}
if (Test-Path ".env.local") {
    Get-Content ".env.local" | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $parts = $line -split '=', 2
            if ($parts.Count -eq 2) {
                $envs[$parts[0].Trim()] = $parts[1].Trim()
            }
        }
    }
}

$apiKey = if ($env:FIREBASE_API_KEY) { $env:FIREBASE_API_KEY } else { $envs["FIREBASE_API_KEY"] }
$authDomain = if ($env:FIREBASE_AUTH_DOMAIN) { $env:FIREBASE_AUTH_DOMAIN } else { $envs["FIREBASE_AUTH_DOMAIN"] }
$projectId = if ($env:FIREBASE_PROJECT_ID) { $env:FIREBASE_PROJECT_ID } else { $envs["FIREBASE_PROJECT_ID"] }
$storageBucket = if ($env:FIREBASE_STORAGE_BUCKET) { $env:FIREBASE_STORAGE_BUCKET } else { $envs["FIREBASE_STORAGE_BUCKET"] }
$messagingSenderId = if ($env:FIREBASE_MESSAGING_SENDER_ID) { $env:FIREBASE_MESSAGING_SENDER_ID } else { $envs["FIREBASE_MESSAGING_SENDER_ID"] }
$appId = if ($env:FIREBASE_APP_ID) { $env:FIREBASE_APP_ID } else { $envs["FIREBASE_APP_ID"] }
$cloudinaryCloudName = if ($env:CLOUDINARY_CLOUD_NAME) { $env:CLOUDINARY_CLOUD_NAME } else { $envs["CLOUDINARY_CLOUD_NAME"] }
if (-not $cloudinaryCloudName) { $cloudinaryCloudName = "dsbryri1d" }
$cloudinaryPreset = if ($env:CLOUDINARY_UPLOAD_PRESET) { $env:CLOUDINARY_UPLOAD_PRESET } else { $envs["CLOUDINARY_UPLOAD_PRESET"] }
if (-not $cloudinaryPreset) { $cloudinaryPreset = "Portofolio" }

$json = @"
{
    "FIREBASE_API_KEY": "$apiKey",
    "FIREBASE_AUTH_DOMAIN": "$authDomain",
    "FIREBASE_PROJECT_ID": "$projectId",
    "FIREBASE_STORAGE_BUCKET": "$storageBucket",
    "FIREBASE_MESSAGING_SENDER_ID": "$messagingSenderId",
    "FIREBASE_APP_ID": "$appId",
    "CLOUDINARY_CLOUD_NAME": "$cloudinaryCloudName",
    "CLOUDINARY_UPLOAD_PRESET": "$cloudinaryPreset"
}
"@

$content = @"
/**
 * env-config.js — Dibuat secara otomatis saat build / run dev.
 * Berkas ini terdaftar di .gitignore dan TIDAK AKAN masuk ke Git/GitHub.
 */
window.__ENV__ = $json;
"@

Set-Content -Path "env-config.js" -Value $content -Encoding utf8
Write-Output "✅ env-config.js berhasil dibuat secara otomatis!"
