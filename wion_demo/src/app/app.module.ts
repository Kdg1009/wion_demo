import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseMoudule } from 'src/database/database.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { UserModule } from 'src/User/user.module';

@Module({
  imports: [DatabaseMoudule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('User');
  }
}
