import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async applyJob(userId: number, jobId: string) {
    // Pastikan userId dicari sebagai angka (Int)
    const user = await this.prisma.user.findUnique({ 
      where: { id: userId } 
    });
    if (!user) throw new BadRequestException('User tidak ditemukan');

    const job = await this.prisma.jobPosting.findUnique({ 
      where: { id: jobId } 
    });
    if (!job) throw new BadRequestException('Lowongan tidak ditemukan');

    // Cek duplikasi
    const existing = await this.prisma.application.findFirst({
      where: { 
        userId: userId, 
        jobId: jobId 
      },
    });
    if (existing) throw new BadRequestException('Anda sudah melamar di posisi ini!');

    return this.prisma.application.create({
      data: {
        userId,
        jobId,
      },
    });
  }

  async findMyApplications(userId: number) {
    return this.prisma.application.findMany({
      where: { userId: userId },
      include: {
        job: {
          include: { company: true },
        },
      },
    });
  }
}