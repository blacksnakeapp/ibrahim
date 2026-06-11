const fs = require('fs');
const path = require('path');

// Fungsi untuk membaca dan memparse file .env
function loadEnvFile(filePath) {
    const envs = {};
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        content.split('\n').forEach(line => {
            // Hapus whitespace dan baris kosong/komentar
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            
            // Temukan pembatas '='
            const index = trimmed.indexOf('=');
            if (index === -1) return;
            
            const key = trimmed.substring(0, index).trim();
            let val = trimmed.substring(index + 1).trim();
            
            // Bersihkan tanda kutip jika ada
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.substring(1, val.length - 1);
            }
            
            envs[key] = val;
        });
    }
    return envs;
}

// 1. Ambil nilai lokal dari .env.local atau .env
const localEnvs = {
    ...loadEnvFile(path.join(__dirname, '.env')),
    ...loadEnvFile(path.join(__dirname, '.env.local'))
};

// 2. Gabungkan dengan variabel lingkungan sistem (seperti di Vercel)
const config = {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || localEnvs.FIREBASE_API_KEY || "",
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || localEnvs.FIREBASE_AUTH_DOMAIN || "",
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || localEnvs.FIREBASE_PROJECT_ID || "",
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || localEnvs.FIREBASE_STORAGE_BUCKET || "",
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || localEnvs.FIREBASE_MESSAGING_SENDER_ID || "",
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || localEnvs.FIREBASE_APP_ID || "",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || localEnvs.CLOUDINARY_CLOUD_NAME || "dsbryri1d",
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET || localEnvs.CLOUDINARY_UPLOAD_PRESET || "Portofolio"
};

// 3. Susun isi dari env-config.js
const envConfigContent = `/**
 * env-config.js — Dibuat secara otomatis oleh generate-env.js saat build / run dev.
 * Berkas ini terdaftar di .gitignore dan TIDAK AKAN masuk ke Git/GitHub.
 */
window.__ENV__ = ${JSON.stringify(config, null, 4)};
`;

// 4. Tulis berkas env-config.js
fs.writeFileSync(path.join(__dirname, 'env-config.js'), envConfigContent);
console.log('✅ env-config.js berhasil dibuat secara otomatis dari Environment Variables!');
