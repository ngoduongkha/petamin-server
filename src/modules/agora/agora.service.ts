import { AgoraConfig } from '@config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { RtcTokenDto } from './dto';

@Injectable()
export class AgoraService {
  constructor(
    @Inject(AgoraConfig.KEY)
    private readonly agoraConfig: ConfigType<typeof AgoraConfig>,
  ) {}

  generateAccessToken(channelName: string): string {
    const { appId, appCertificate } = this.agoraConfig;
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTime + 3600;

    return RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      0,
      RtcRole.PUBLISHER,
      privilegeExpiredTs,
    );
  }
}
