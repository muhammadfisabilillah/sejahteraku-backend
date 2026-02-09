import { PartialType } from '@nestjs/mapped-types';
import { CreateAiConsultantDto } from './create-ai-consultant.dto';

export class UpdateAiConsultantDto extends PartialType(CreateAiConsultantDto) {}
