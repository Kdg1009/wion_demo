import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './auth.constants';
import { User, UserDocument } from 'src/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload): Promise<any> {
        const { email } = payload;
        const user: User = await this.userModel.findOne({email});

        if(!user) {
            Logger.log("jwt_strategy: no such user");
            throw new UnauthorizedException('no such user');
        }

        Logger.log('login success');
        //const userInfo = { id: user.id, userId: user.userId, grade: user.grade };
        //return userInfo;
        return user;
    }
}