import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  // 1. POSTING LOKER BARU
  async create(data: any) {
    return this.prisma.jobPosting.create({
      data: {
        position: data.position,       // Jabatan (misal: Staff Gudang)
        requirements: data.requirements, // Syarat (misal: Min. SMK)
        salaryRange: data.salaryRange,   // Gaji (misal: 4-5 Juta)
        location: data.location,         // Lokasi (misal: Cikarang)
        company: {
          connect: { id: data.companyId }, // <--- INI PENTING! Disambung ke PT yg tadi dibuat
        },
      },
    });
  }

  // 2. LIHAT SEMUA LOKER
  async findAll() {
    return this.prisma.jobPosting.findMany({
      include: {
        company: true, // Biar kelihatan nama PT-nya apa
      },
      orderBy: {
        postedAt: 'desc', // Yang terbaru paling atas
      },
    });
  }
}