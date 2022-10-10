import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { array } from 'joi';
import { PhotoDto } from './dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetService } from './pet.service';

@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
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
  @ApiBody({
    isArray: true,
    type: PhotoDto,
  })
  async addPhotos(
    @Param('petId') petId: string,
    @Body(
      new ParseArrayPipe({
        items: PhotoDto,
      }),
    )
    photos: PhotoDto[],
  ) {
    await this.petService.addPhotos(petId, photos);
    return true;
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
    return true;
    // return this.petService.remove(id);
  }
}
