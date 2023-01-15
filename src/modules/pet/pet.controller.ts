import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { Pet, PetPhoto } from 'src/database/entities';
import { DeletePetPhotoDto, PhotoDto } from './dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetService } from './pet.service';

@ApiTags('pets')
@Controller('pets')
@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto, @GetUser('id') userId: string): Promise<Pet> {
    return this.petService.create(createPetDto, userId);
  }

  @Get()
  findAll(@GetUser('id') userId: string): Promise<Pet[]> {
    return this.petService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pet> {
    return this.petService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto): Promise<Pet> {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.petService.delete(id);
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
  ): Promise<boolean> {
    await this.petService.addPhotos(petId, photos);
    return true;
  }

  @Get(':petId/photos')
  getPetPhotos(@Param('petId') petId: string): Promise<PetPhoto[]> {
    return this.petService.getPetPhotos(petId);
  }

  @Post(':petId/photos/delete')
  @HttpCode(HttpStatus.OK)
  async removePhotos(
    @Param('petId') petId: string,
    @Body() dto: DeletePetPhotoDto,
  ): Promise<boolean> {
    await this.petService.deletePhotos(petId, dto);
    return true;
  }
}
