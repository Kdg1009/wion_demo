import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport/dist';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { User } from '../user.schema';
import { UserService } from '../user.service';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderBearerToken(),
            secretOrKey: process.env.JWT_SECRET || jwtConstants.secret,
        });
    }

    async validate(payload: Payload) {
        const { email, username } = payload;
        const user: User = await this.userService.findOne({ email, username });  // if validation success what will server return?
        
        if(!user) {
            throw new UnauthorizedException('no such user');
        }

        return user;
    }
}