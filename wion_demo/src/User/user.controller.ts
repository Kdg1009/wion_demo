import { Body, Controller,Get,Post, UseGuards } from '@nestjs/common';
import { userLoginDto } from './dto/user.login.dto';
import { userSignupDto } from './dto/user.signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/login')
    LoginPage() {
        return;
    }

    @Post('/login')
    login(@Body() userLoginDto: userLoginDto): Promise<{accessToken: string}> {
        return this.userService.login(userLoginDto);
    }

    @Get('/signup')
    SignUpPage() {
        return;
    }

    @Post('/signup')
    signup(@Body() userSignupDto: userSignupDto): Promise<void> {
        return this.userService.signup(userSignupDto);
    }
}
