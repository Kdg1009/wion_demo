import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { DatabaseMoudule } from "src/database/database.module";
import { UserService } from "./user.service";
import { User, UserSchema } from "./user.schema";
//import { LoggerMiddleware } from "src/middleware/logger.middleware";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./Auth/jwt.constants";

@Module({
    imports: [DatabaseMoudule,
              MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
              JwtModule.register({
                secret: jwtConstants.secret,
                signOptions: { expiresIn: 86400 },
              })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {}