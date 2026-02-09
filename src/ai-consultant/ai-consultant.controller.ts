import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AiConsultantService } from './ai-consultant.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ai-consultant')
export class AiConsultantController {
  constructor(private readonly aiService: AiConsultantService) {}

  // 1. ENDPOINT CHAT (POST)
  // Cara panggil: POST http://localhost:3000/ai-consultant/chat
  @UseGuards(AuthGuard('jwt')) // Hanya user login
  @Post('chat')
  async chat(@Request() req, @Body() body: { message: string }) {
    return this.aiService.chat(req.user.userId, body.message);
  }

  // 2. ENDPOINT HISTORY (GET) - BARU!
  // Cara panggil: GET http://localhost:3000/ai-consultant/history
  @UseGuards(AuthGuard('jwt')) // Hanya user login
  @Get('history')
  async getHistory(@Request() req) {
    return this.aiService.getHistory(req.user.userId);
  }
}