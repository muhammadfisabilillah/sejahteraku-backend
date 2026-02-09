import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiConsultantService {
  private apiKey: string;
  private apiUrl: string;

  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService
  ) {
    this.apiKey = process.env.GEMINI_API_KEY || "";
    
    // KITA PAKAI MODEL PEMENANG TADI: 'gemini-2.5-flash'
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
  }

  // --- FUNGSI 1: CHAT KE GOOGLE ---
  async chat(userId: string, message: string) {
    // Instruksi Karakter AI
    const systemPrompt = `
      Peran: Kamu adalah "Kakak Sejahtera", asisten karir di aplikasi SejahteraKu.
      Tugas: Jawab pertanyaan user dengan bahasa Indonesia yang santai, ramah, dan membumi.
      Konteks: User adalah pencari kerja (lulusan SD/SMP/SMA). Berikan saran pekerjaan konkret.
      User bertanya: "${message}"
    `;

    const payload = {
      contents: [{ parts: [{ text: systemPrompt }] }]
    };

    try {
      console.log("🚀 Mengirim pesan ke Google (gemini-2.5-flash)...");

      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, payload)
      );

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("Google tidak memberikan jawaban.");
      }

      const responseText = data.candidates[0].content.parts[0].text;
      console.log("✅ Jawaban diterima!");

      // Simpan ke Database
      await this.prisma.consultation.create({
        data: {
          userId: userId,
          chatLogs: { prompt: message, answer: responseText, model: 'gemini-2.5-flash' },
          summary: 'Konsultasi Sukses',
        },
      });

      return { reply: responseText };

    } catch (error) {
      console.error("🔥 Error AI Detail:");
      if (error.response) {
        console.error(`- Status: ${error.response.status}`);
        console.error(`- Pesan: ${JSON.stringify(error.response.data, null, 2)}`);
      } else {
        console.error(`- Error: ${error.message}`);
      }
      
      return { 
        reply: "Waduh, Kakak Sejahtera lagi pusing (Server Error). Coba tanya lagi nanti ya!" 
      };
    }
  }

  // --- FUNGSI 2: AMBIL RIWAYAT CHAT (BARU) ---
  async getHistory(userId: string) {
    return this.prisma.consultation.findMany({
      where: { 
        userId: userId // Ambil data milik user yang sedang login saja
      },
      orderBy: { 
        createdAt: 'desc' // Urutkan dari yang paling baru
      },
      take: 20, // Batasi 20 pesan terakhir biar ringan
    });
  }
}