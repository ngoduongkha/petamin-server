import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../../database/entities';

export class LoginDto {
  @ApiProperty({ default: 'cheng.cit@gmail.com' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
