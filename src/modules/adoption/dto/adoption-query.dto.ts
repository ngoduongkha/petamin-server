import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginateQuery } from 'nestjs-paginate';

// interface AdoptionFilter  {
//   'pet.species'?: string | string[];
//   price?: string | string[];
// }

export class AdoptionQueryDto implements PaginateQuery {
  @ApiPropertyOptional({ type: Number, default: 1 })
  page: number;

  @ApiPropertyOptional({ type: Number, default: 100 })
  limit: number;

  searchBy?: string[];

  sortBy?: [string, string][];

  @ApiPropertyOptional({ type: String })
  search?: string;

  filter?: {
    'pet.species'?: string | string[];
    price?: string | string[];
  };

  path: string;
}
