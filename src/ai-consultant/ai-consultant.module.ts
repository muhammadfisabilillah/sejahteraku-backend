import { Module } from '@nestjs/common';
import { AiConsultantService } from './ai-consultant.service';
import { AiConsultantController } from './ai-consultant.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HttpModule } from '@nestjs/axios'; // <--- WAJIB ADA BIAR BISA REQUEST KE GOOGLE

@Module({
  imports: [
    PrismaModule, // Biar bisa simpan ke database
    HttpModule,   // Biar bisa kirim pesan ke Google
  ],
  controllers: [AiConsultantController],
  providers: [AiConsultantService],
})
export class AiConsultantModule {}