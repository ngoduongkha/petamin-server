import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../common/guard/jwt.guard';
import { ApiFile, ApiFiles } from 'src/common/decorators';
import { imageFileFilter } from 'src/common/utils';

@ApiTags('species')
// @ApiBearerAuth('access-token')
// @UseGuards(JwtGuard)
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @ApiFile('image', false, { fileFilter: imageFileFilter })
  @ApiBody({ type: CreateSpeciesDto })
  async create(
    @Body() createSpeciesDto: CreateSpeciesDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.speciesService.create(createSpeciesDto, image);
  }

  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.getById(id);
  }

  @Patch(':id')
  @ApiFile('image', false, { fileFilter: imageFileFilter })
  @ApiBody({ type: UpdateSpeciesDto })
  update(
    @Param('id') id: string,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.speciesService.update(id, updateSpeciesDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(id);
  }
}
