import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiConsultantModule } from './ai-consultant/ai-consultant.module';

@Module({
  imports: [AuthModule, PrismaModule, AiConsultantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
