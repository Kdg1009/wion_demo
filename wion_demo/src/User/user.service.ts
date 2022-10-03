import { Model } from 'mongoose'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './user.schema'
import { UserDto } from './user.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs';
import { Payload } from './Auth/jwt.payload'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService) {}

    // define any necessary func
    async signUp(userDto: UserDto): Promise<void> {
        
        await this.userModel.create(userDto);
    }

    async login(userDto: UserDto): Promise<{accessToken: string}> {
        const { email, password } = userDto;
        const user = await this.userModel.findOne({ email });

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload = { email: email, name: user.username};
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('no such user');
        }
    }

    async findOne({ email, username}) {
        return await this.userModel.findOne({ email, username });
    }
}