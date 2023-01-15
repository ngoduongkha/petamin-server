import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterOperator, Paginate, Paginated } from 'nestjs-paginate';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { Adoption } from 'src/database/entities';
import { AdoptionService } from './adoption.service';
import {
  CreateAdoptionDto,
  AdoptionQueryDto,
  UpdateAdoptionDto,
  UpdateAdoptionStatus,
} from './dto';

@ApiTags('adoptions')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('adoptions')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post()
  create(
    @GetUser('id') userId: string,
    @Body() createAdoptDto: CreateAdoptionDto,
  ): Promise<Adoption> {
    return this.adoptionService.create(userId, createAdoptDto);
  }

  @ApiQuery({ type: AdoptionQueryDto })
  @ApiQuery({
    type: 'string',
    required: false,
    name: 'species',
    example: 'DOG,CAT',
  })
  @ApiQuery({
    type: 'string',
    required: false,
    name: 'btw_price',
    example: '1,100',
  })
  @ApiOkResponse({ type: Paginated<Adoption> })
  @Get()
  async findAll(
    @Query('species') species: string,
    @Query('btw_price') btwPrice: string,
    @Paginate() query: AdoptionQueryDto,
  ): Promise<Paginated<Adoption>> {
    let filter = {};
    if (species) {
      filter = {
        'pet.species': `${FilterOperator.IN}:${species}`,
      };
    }

    if (btwPrice) {
      filter = {
        price: `${FilterOperator.BTW}:${btwPrice}`,
        ...filter,
      };
    }

    const queryCombine = { ...query, filter };

    return this.adoptionService.findAll(queryCombine);
  }

  @Get('/me')
  findByMe(@GetUser('id') userId: string): Promise<Adoption[]> {
    return this.adoptionService.findByUserId(userId, true);
  }

  @Get('/pet/:petId')
  findByPetId(@Param('petId', new ParseUUIDPipe()) petId: string): Promise<Adoption> {
    return this.adoptionService.findByPetId(petId);
  }

  @Patch(':adoptionId')
  @ApiBody({ type: UpdateAdoptionDto })
  update(
    @Param('adoptionId', new ParseUUIDPipe()) adoptionId: string,
    @Body() updateAdoptionDto: UpdateAdoptionDto,
  ): Promise<void> {
    return this.adoptionService.update(adoptionId, updateAdoptionDto);
  }

  @Patch(':adoptionId/status')
  @ApiBody({ type: UpdateAdoptionStatus })
  updateStatus(
    @Param('adoptionId', new ParseUUIDPipe()) adoptionId: string,
    @Body() adoptionStatus: UpdateAdoptionStatus,
  ): Promise<void> {
    const { status } = adoptionStatus;
    return this.adoptionService.updateStatus(adoptionId, status);
  }

  @ApiOkResponse()
  @Delete(':adoptionId')
  delete(@Param('adoptionId', new ParseUUIDPipe()) adoptionId: string): Promise<void> {
    return this.adoptionService.delete(adoptionId);
  }
}
