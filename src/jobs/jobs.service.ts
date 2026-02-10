import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  // 1. POSTING LOKER BARU
  async create(data: any) {
    if (!data.companyId) {
      throw new BadRequestException('companyId tidak boleh kosong!');
    }

    return this.prisma.jobPosting.create({
      data: {
        position: data.position,
        requirements: data.requirements,
        salaryRange: data.salaryRange,
        location: data.location,
        company: {
          connect: { id: data.companyId } // Dia butuh ID string di sini
        }
      }
    });
  }

  // 2. LIHAT SEMUA LOKER
  async findAll() {
    return this.prisma.jobPosting.findMany({
      include: { company: true }
    });
  }
}