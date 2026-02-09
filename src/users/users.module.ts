import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module'; // <--- JANGAN LUPA INI

@Module({
  imports: [PrismaModule], // <--- MASUKKAN SINI
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}