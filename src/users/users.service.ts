import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Tambahkan ini untuk memperbaiki error getMyProfile
  async getMyProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  async updateProfile(userId: number, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: {
              bio: data.bio,
              skills: data.skills,
              education: data.education,
            },
            update: {
              bio: data.bio,
              skills: data.skills,
              education: data.education,
            },
          },
        },
      },
    });
  }
}