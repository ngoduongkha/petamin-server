import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UploadedFile, UploadedFiles } from '@nestjs/common/decorators';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorators';
import { ApiFiles } from 'src/common/decorators/api-files.decorator';
import { imageFileFilter } from 'src/common/utils';
import { CreatePetDto, UpdatePetDto } from './dto';
import { PetService } from './pet.service';

@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @ApiBody({ type: CreatePetDto })
  @ApiFile('avatar', false, { fileFilter: imageFileFilter })
  create(
    @Body() createPetDto: CreatePetDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.petService.create(createPetDto, avatar);
  }

  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }

  @Post(':petId/photos')
  @ApiFiles('files', true)
  async addPhotos(
    @Param('petId') petId: string,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    await this.petService.addPhotos(petId, files);
    // return true;
  }

  @Get(':petId/photos')
  async getPetPhotos(@Param('petId') petId: string) {
    return await this.petService.getPetPhotos(petId);
  }

  @Post(':petId/photos/delete')
  async removePhotos(
    @Param('petId') petId: string,
    @Body() photoIds: string[],
  ) {
    await this.petService.removePhotos(petId, photoIds);
    // return this.petService.remove(id);
  }
}
