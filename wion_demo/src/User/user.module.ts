import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseMoudule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';
import { User } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/user/auth/auth.constants';
import { JwtStrategy } from 'src/user/auth/jwt.strategy';

@Module({
  imports: [DatabaseMoudule,
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
            PassportModule,
            JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: {expiresIn: '24h'},
            }),],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
