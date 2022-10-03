import { Controller,Get,Post,Put,Delete, Body, UseGuards } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "./Auth/jwt.guard";

@Controller('User')
export class UserController{
    constructor(private userService: UserService) {}

    @Post('/signUp')
    signUp(@Body() userDto: UserDto): Promise<void> {
        return this.userService.signUp(userDto);
    } 

    @UseGuards(JwtAuthGuard)
    @Post('/login')
    login(@Body() userDto: UserDto): Promise<{accessToken: string}> {
        return this.userService.login(userDto);
    } 
}