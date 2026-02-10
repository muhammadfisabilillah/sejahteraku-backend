import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  // 1. KIRIM LAMARAN
  async create(data: { userId: number; jobId: string }) {
    return this.prisma.application.create({
      data: {
        userId: data.userId,
        jobId: data.jobId,
        status: 'PENDING',
      },
    });
  }

  // 2. LIHAT SEMUA LAMARAN (Admin)
  async findAll() {
    return this.prisma.application.findMany({
      include: {
        user: true,
        job: {
          include: { company: true }
        },
      },
    });
  }

  // 3. UPDATE STATUS LAMARAN
  async updateStatus(id: string, status: string) {
    const validStatuses = ['PENDING', 'INTERVIEW', 'ACCEPTED', 'REJECTED'];
    
    if (!validStatuses.includes(status.toUpperCase())) {
      throw new BadRequestException(`Status harus salah satu dari: ${validStatuses.join(', ')}`);
    }

    try {
      return await this.prisma.application.update({
        where: { id: Number(id) }, // <--- DI SINI PERBAIKANNYA: Paksa jadi Number
        data: { status: status.toUpperCase() },
      });
    } catch (error) {
      throw new NotFoundException('ID Lamaran tidak ditemukan!');
    }
  }
}