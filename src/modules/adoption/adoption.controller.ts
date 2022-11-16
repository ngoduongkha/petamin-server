import { Adoption } from '@entity';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { info } from 'console';
import {
  FilterOperator,
  Paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
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
  ) {
    console.log('111111111111 :>> ', 111111111111);
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
  ) {
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

    // const alibaba = await this.adoptionService.findAll(filter);
    return this.adoptionService.findAll(queryCombine);
  }

  @Get('/me')
  findByMe(@GetUser('id') userId: string) {
    return this.adoptionService.findByUserId(userId, true);
  }

  @Get('/pet/:petId')
  findByPetId(@Param('petId') petId: string) {
    return this.adoptionService.findByPetId(petId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adoptionService.findOne(+id);
  // }

  @Patch(':adoptionId')
  @ApiBody({ type: UpdateAdoptionDto })
  update(
    @Param('adoptionId') adoptionId: string,
    @Body() updateAdoptionDto: UpdateAdoptionDto,
  ) {
    return this.adoptionService.update(adoptionId, updateAdoptionDto);
  }

  @Patch(':adoptionId/status')
  @ApiBody({ type: UpdateAdoptionStatus })
  updateStatus(
    @Param('adoptionId') adoptionId: string,
    @Body() adoptionStatus: UpdateAdoptionStatus,
  ) {
    const { status } = adoptionStatus;
    return this.adoptionService.updateStatus(adoptionId, status);
  }

  @ApiOkResponse()
  @Delete(':adoptionId')
  async delete(@Param('adoptionId') adoptionId: string) {
    await this.adoptionService.delete(adoptionId);
  }
}
