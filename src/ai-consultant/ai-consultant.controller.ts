import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AiConsultantService } from './ai-consultant.service'; // Pastikan nama ini cocok
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai-consultant')
export class AiConsultantController {
  constructor(private readonly aiConsultantService: AiConsultantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('ask')
  async askAi(@Request() req, @Body('prompt') prompt: string) {
    return this.aiConsultantService.askAi(req.user.userId, prompt);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@Request() req) {
    return this.aiConsultantService.getHistory(req.user.userId);
  }
}