import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiConsultantService { // Nama class harus AiConsultantService
  private genAI: GoogleGenerativeAI;

  constructor(private prisma: PrismaService) {
    // Tambahkan '!' di akhir untuk meyakinkan TS bahwa API Key ada
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }

  async askAi(userId: number, prompt: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    await this.prisma.chatHistory.create({
      data: {
        userId: userId,
        message: prompt,
        response: aiResponse,
      },
    });

    return { response: aiResponse };
  }

  async getHistory(userId: number) {
    return this.prisma.chatHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}