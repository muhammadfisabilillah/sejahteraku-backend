import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() data: { userId: number; jobId: string }) {
    return this.applicationsService.create(data);
  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string, 
    @Body() body: { status: string }
  ) {
    // Pastikan body status dikirim dengan benar
    return this.applicationsService.updateStatus(id, body.status);
  }
}