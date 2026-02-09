// File: cek_model.js
const https = require('https');

// Ambil API Key dari environment atau tulis manual disini kalau ragu
// CONTOH: const apiKey = "AIzaSy.....";
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyD6GGLJyEYKbE1LmYwSkPVG7EhAGuHSBQg"; 

if (apiKey === "KUNCI_KAMU_DISINI") {
    console.log("❌ ERROR: Masukkan API Key dulu di file cek_model.js baris ke-6!");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("🕵️‍♂️ SEDANG MENANYA KE GOOGLE...");
console.log(`🔑 Menggunakan Key berakhiran: ...${apiKey.slice(-4)}`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => { data += chunk; });

    res.on('end', () => {
        if (res.statusCode === 200) {
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
            console.log("💡 Pakai salah satu nama di atas untuk kodingan NestJS kamu!");
        } else {
            console.log(`\n❌ GAGAL (Status: ${res.statusCode})`);
            console.log("Pesan Error:", data);
        }
    });

}).on("error", (err) => {
    console.log("\n❌ ERROR KONEKSI TOTAL (ENOTFOUND):");
    console.log("Laptopmu tidak bisa menghubungi Google.");
    console.log("Saran: Matikan VPN, Ganti Koneksi HP (Tethering), atau Restart Modem.");
    console.log("Detail:", err.message);
});