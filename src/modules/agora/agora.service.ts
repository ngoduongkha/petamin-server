import { AgoraConfig } from '@config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { RtcTokenDto } from './dto';
import { AppRtcRole } from './enum';

@Injectable()
export class AgoraService {
  constructor(
    @Inject(AgoraConfig.KEY)
    private readonly agoraConfig: ConfigType<typeof AgoraConfig>,
  ) {}

  generateAccessToken(dto: RtcTokenDto): string {
    const { appId, appCertificate } = this.agoraConfig;
    const { channelName, uid, role, expiredTime } = dto;
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTime + expiredTime;

    switch (role) {
      case AppRtcRole.PUBLISHER:
        return RtcTokenBuilder.buildTokenWithUid(
          appId,
          appCertificate,
          channelName,
          uid,
          RtcRole.PUBLISHER,
          privilegeExpiredTs,
        );
      case AppRtcRole.SUBSCRIBER:
        return RtcTokenBuilder.buildTokenWithUid(
          appId,
          appCertificate,
          channelName,
          uid,
          RtcRole.SUBSCRIBER,
          privilegeExpiredTs,
        );
      default:
        return null;
    }
  }
}
