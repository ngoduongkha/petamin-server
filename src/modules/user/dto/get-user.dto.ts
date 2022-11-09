import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginateQuery } from 'nestjs-paginate';

export class GetUserDto implements PaginateQuery {
  @ApiPropertyOptional({ type: Number })
  page?: number;

  @ApiPropertyOptional({ type: Number })
  limit?: number;

  searchBy?: string[];

  sortBy?: [string, string][];

  @ApiPropertyOptional({ type: String })
  search?: string;

  filter?: { [column: string]: string | string[] };

  path: string;
}
