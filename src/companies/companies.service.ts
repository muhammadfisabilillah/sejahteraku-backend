import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  // BUAT PERUSAHAAN BARU
  async create(data: any) {
    return this.prisma.company.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  // LIHAT SEMUA PERUSAHAAN
  async findAll() {
    return this.prisma.company.findMany({
      include: { jobs: true }
    });
  }

  // LIHAT DAFTAR PELAMAR DI PERUSAHAAN INI
  async getApplicants(companyId: string) {
    return this.prisma.jobPosting.findMany({
      where: { companyId },
      include: {
        applications: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true
              }
            }
          }
        }
      }
    });
  }
}