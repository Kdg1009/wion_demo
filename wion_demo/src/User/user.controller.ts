import { Body, Controller,Get,Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userLoginDto } from './dto/user.login.dto';
import { userSignupDto } from './dto/user.signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // < Routes for JWT Authentication >
    @Post('/login')
    returnJwt(@Body() userLoginDto: userLoginDto): Promise<{accessToken: string}> {
        return this.userService.returnJwt(userLoginDto);
    }

    // 쿠키에 있는 jwt token 만료일을 1초미만으로 잡기
    @Get('/logout')
    @UseGuards(AuthGuard())
    logout() {
        
    }

    // < Routes for Kakao api >
    @Post('/signup')
    signup(@Body() userSignupDto: userSignupDto): Promise<void> {
        return this.userService.createUser(userSignupDto);
    }
}
