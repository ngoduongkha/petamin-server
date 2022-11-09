import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'buiminhhuy@gmail.com' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'abcd1234' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
