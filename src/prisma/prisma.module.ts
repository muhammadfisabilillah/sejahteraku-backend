import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Tambahkan @Global() biar bisa dipanggil dimana saja
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Wajib diexport
})
export class PrismaModule {}