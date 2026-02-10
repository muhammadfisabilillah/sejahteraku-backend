// File: cek_model.js
const https = require('https');

/**
 * 🔒 KEAMANAN: Jangan pernah tulis API Key langsung di sini.
 * Kunci akan diambil dari environment variable laptop kamu.
 * Cara jalannya di PowerShell:
 * $env:GEMINI_API_KEY="KUNCI_BARU_KAMU"; node cek_model.js
 */
const apiKey = process.env.GEMINI_API_KEY; 

if (!apiKey || apiKey === "KUNCI_KAMU_DISINI") {
    console.log("\n❌ ERROR: API Key tidak ditemukan!");
    console.log("---------------------------------------------------------");
    console.log("💡 CARA MENJALANKAN AGAR AMAN:");
    console.log("1. Set kunci di terminal (PowerShell):");
    console.log("   $env:GEMINI_API_KEY='AIzaSy...' ");
    console.log("2. Jalankan filenya:");
    console.log("   node cek_model.js");
    console.log("---------------------------------------------------------");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("\n🕵️‍♂️ SEDANG MENANYA KE GOOGLE...");
console.log(`🔑 Menggunakan Key berakhiran: ...${apiKey.slice(-4)}`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => { data += chunk; });

    res.on('end', () => {
        if (res.statusCode === 200) {
            try {
                const models = JSON.parse(data).models;
                console.log("\n✅ KONEKSI SUKSES! DAFTAR MODEL YANG TERSEDIA:");
                console.log("=============================================");
                models.forEach(m => {
                    // Tampilkan hanya model yang support 'generateContent'
                    if (m.supportedGenerationMethods.includes("generateContent")) {
                        console.log(`👉 ${m.name.replace('models/', '')}`);
                    }
                });
                console.log("=============================================");
                console.log("💡 Tips: Pakai 'gemini-1.5-flash' untuk respon cepat di NestJS!");
            } catch (e) {
                console.log("❌ Gagal memproses data JSON dari Google.");
            }
        } else {
            console.log(`\n❌ GAGAL (Status: ${res.statusCode})`);
            console.log("Pesan Error dari Google:", data);
        }
    });

}).on("error", (err) => {
    console.log("\n❌ ERROR KONEKSI TOTAL:");
    console.log("Laptopmu tidak bisa menghubungi server Google.");
    console.log("Detail:", err.message);
});