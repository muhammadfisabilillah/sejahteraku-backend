import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // Pastikan ini me-return hasil create agar ID-nya bisa diambil
    return this.prisma.company.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async findAll() {
    return this.prisma.company.findMany();
  }
}