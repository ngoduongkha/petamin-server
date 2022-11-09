import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Information } from '@entity';

@Module({
  imports: [TypeOrmModule.forFeature([Information])],
  providers: [InformationService],
  exports: [InformationService],
})
export class InformationModule {}
