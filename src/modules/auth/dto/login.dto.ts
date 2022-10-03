import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'kha@gmail.com' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
