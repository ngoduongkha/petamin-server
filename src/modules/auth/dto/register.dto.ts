import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'User email',
    nullable: false,
    example: 'kha@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    nullable: false,
    minLength: 8,
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    type: String,
    description: 'User name',
    nullable: false,
    example: 'kha',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
