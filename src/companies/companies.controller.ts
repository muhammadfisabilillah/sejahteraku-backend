import { Controller, Post, Body, Get } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() data: { name: string; description?: string }) {
    return this.companiesService.create(data);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }
}