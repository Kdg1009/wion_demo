import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './user.schema';
import { Model } from 'mongoose';
import { userLoginDto } from './dto/user.login.dto';
import { userSignupDto } from './dto/user.signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private JwtService: JwtService) {}

    // < Functions for kakao api >
    async findOne(userId: string) {
        const user = await this.userModel.findOne({kakaoId: userId});
        return user;
    }
    
    async createUser(signUpDto: userSignupDto) {
        //await this.userModel.create(signUpDto);
        
        const { username, password, email } = signUpDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await this.userModel.create({ username, password: hashedPassword, email });
    }

    // < Functions for JWT Token >

    // < 변경할 사항 >
    // 1. access token과 refresh token을 생성
    // 2. access token은 쿠키에, refresh token은 db에 저장
    // 3. 쿠키에서 access token 값을 받아오기
    // 3-1. access token이 없으면 login page로 이동
    // 4. access token 만료 시 access token 안의 refresh token 가져오기
    // 4-1. refresh token이 일치하면 새로운 access token 발급
    async returnJwt(userLoginDto: userLoginDto): Promise<{accessToken: string}> {
        const { email, password } = userLoginDto;
        const user = await this.userModel.findOne({ email });

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload = { email }
            const accessToken = await this.JwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
    
    async signup(userSignupDto: userSignupDto) {
        const { username, password, email } = userSignupDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await this.userModel.create({ username, password: hashedPassword, email });

        return response.redirect('/user/login');
    }
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