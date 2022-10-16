import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { KakaoController } from './kakao.controller';
import { KakaoService } from './kakao.service';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [KakaoController],
  providers: [KakaoService]
})
export class KakaoModule {}
