module.exports = (req, res) => {
    // Mengatur header respons agar berupa JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    res.status(200).json({
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "",
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || "",
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "",
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || "",
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || "",
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "dsbryri1d",
        CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET || "Portofolio"
    });
};
