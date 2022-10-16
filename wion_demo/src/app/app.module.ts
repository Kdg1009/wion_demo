import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { KakaoModule } from 'src/Auth(kakao)/kakao.module';
import { BoardModule } from 'src/board/board.module';
import { DatabaseMoudule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseMoudule, BoardModule,UserModule, KakaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
