import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // 1. LIHAT PROFIL (Perbaikan: Mengambil relasi profile)
  async getMyProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true, // <--- KITA AMBIL DARI TABEL SEBELAH (UserProfile)
      },
    });
  }

  // 2. UPDATE PROFIL (Perbaikan: Pakai teknik Upsert ke tabel UserProfile)
  async updateProfile(userId: string, data: any) {
    
    // Jaga-jaga kalau skills dikirim sebagai string "Las, Supir"
    let skillsData = data.skills;
    if (typeof data.skills === 'string') {
      skillsData = data.skills.split(',').map(s => s.trim());
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        // Update data dasar di tabel User
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,

        // Update/Buat data di tabel UserProfile
        profile: {
          upsert: {
            create: {
              bio: data.bio,
              lastEdu: data.lastEdu,
              skills: skillsData || [],
            },
            update: {
              bio: data.bio,
              lastEdu: data.lastEdu,
              skills: skillsData,
            },
          },
        },
      },
      include: {
        profile: true, // Kembalikan data profil terbaru
      },
    });
  }
}