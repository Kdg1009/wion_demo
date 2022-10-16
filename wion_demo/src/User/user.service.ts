import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './user.schema';
import { Model } from 'mongoose';
import { userLoginDto } from './dto/user.login.dto';
import { userSignupDto } from './dto/user.signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private JwtService: JwtService) {}

    async createUser(signUpDto: userSignupDto) {
        await this.userModel.create(signUpDto);
    }
    // async login(userLoginDto: userLoginDto): Promise<{accessToken: string}> {
    //     const { email, password } = userLoginDto;
    //     const user = await this.userModel.findOne({ email });

    //     if(user && (await bcrypt.compare(password, user.password))) {
    //         const payload = { email }
    //         const accessToken = await this.JwtService.sign(payload);

    //         return { accessToken };
    //     } else {
    //         throw new UnauthorizedException('login failed');
    //     }
    // }
    
    // async signup(userSignupDto: userSignupDto) {
    //     // const { userId, password, email, nickname, phoneNumber } = userSignupDto;

    //     // const salt = await bcrypt.genSalt();
    //     // const hashedPassword = await bcrypt.hash(password, salt);

    //     // const user = await this.userModel.create({ userId, password: hashedPassword, email, nickname, phoneNumber });
    // }
}

// class signupFucns {
//     constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
//     async checkUserExists(email: string, userId: string): Promise<boolean> {
//         const isExists = await this.userModel.findOne({email, userId});
        
//         if(!isExists) {
//             return true;
//         } else {
//             throw new UnauthorizedException('user already exists');
//         }
//     }

//     async saveUser(userSignupDto: userSignupDto) {
//         const { userId, password, email, nickname, phoneNumber } = userSignupDto;
        
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(password, salt);
        
//         await this.userModel.create({ userId, password: hashedPassword, email, nickname, phoneNumber });
//     }

//     async sendMemberJoinEmail(email: string) {

//     }
// }