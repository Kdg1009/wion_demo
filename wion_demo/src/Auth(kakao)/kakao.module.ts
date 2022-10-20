import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseMoudule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { KakaoController } from './kakao.controller';
import { Token, TokenSchema } from './kakao.token.schema';
import { KakaoService } from './kakao.service';

@Module({
  imports: [
    DatabaseMoudule,
    UserModule,
    MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}]),
  ],
  controllers: [KakaoController],
  providers: [KakaoService]
})
export class KakaoModule {}
