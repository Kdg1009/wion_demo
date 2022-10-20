import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseMoudule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { UserSchema, User } from './user.schema';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/user/auth/auth.constants';
import { JwtStrategy } from 'src/user/auth/jwt.strategy';

@Module({
  imports: [DatabaseMoudule,
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
            PassportModule.register({ defaultStrategy: 'jwt'}),
            JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: {expiresIn: '3600'},
            }),],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, JwtStrategy, PassportModule]
})
export class UserModule {}
