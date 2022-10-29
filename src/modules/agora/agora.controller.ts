import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgoraService } from './agora.service';
import { RtcTokenDto, RtcTokenResponse } from './dto/rtc-token.dto';
import { NoCacheInterceptor } from '../../common/interceptor';

@UseInterceptors(NoCacheInterceptor)
@Controller('agora')
@ApiTags('agora')
export class AgoraController {
  constructor(private readonly agoraService: AgoraService) {}

  @Get('/token')
  generateAccessToken(@Query() dto: RtcTokenDto): RtcTokenResponse {
    const token = this.agoraService.generateAccessToken(dto);
    return { token };
  }
}
