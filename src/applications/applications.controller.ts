import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  apply(@Body() data: { userId: number; jobId: string }) {
    // Memastikan userId benar-benar angka sebelum dikirim ke service
    return this.applicationsService.applyJob(Number(data.userId), data.jobId);
  }

  @Get(':userId')
  myApplications(@Param('userId') userId: string) {
    return this.applicationsService.findMyApplications(Number(userId));
  }
}