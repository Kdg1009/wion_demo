import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './auth.constants';
import { User, UserDocument } from 'src/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload) {
        const { email } = payload;
        const user: User = await this.userModel.findOne({email});

        if(!user) {
            throw new UnauthorizedException();
        }

        return { userid: user.userId, email: user.email, grade: user.grade, nickname: user.nickname, phoneNumber: user.phoneNumber, id: user.id };
    }
}