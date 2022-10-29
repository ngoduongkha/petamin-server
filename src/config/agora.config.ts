import { registerAs } from '@nestjs/config';

export const AgoraConfig = registerAs('agora', () => ({
  appId: process.env.AGORA_APP_ID || 'appId',
  appCertificate: process.env.AGORA_APP_CERTIFICATE || 'appCertificate',
  expireTime: process.env.AGORA_EXPIRE_TIME || 3600,
}));
