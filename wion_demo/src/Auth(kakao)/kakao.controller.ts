import { Controller, Get, Query, Post, Req, Res } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { KakaoCodeDto } from './DTO/kakao.accessCode';
import { Request, Response } from 'express';

@Controller('kakao')
export class KakaoController {
    constructor(private kakaoService: KakaoService) {}

    //runnig this app, first render this page
    @Get('/authLoding')
    authLoaing(@Req() req: Request) {
        return this.kakaoService.authLoading(req)
    }

    //herf 태그로 카카오톡 로그인 링크 설정
    //<a id="kakao" href="/auth/kakao" class="btn">카카오톡 로그인</a>
    @Get('/login')
    login() {
        return this.kakaoService.loginKakao();
    }

    @Get('/callback')
    getKakaoInfo(@Query('code') KakaoCodeDto: KakaoCodeDto, @Res() res: Response) {
        return this.kakaoService.getKakaoInfo(KakaoCodeDto, res);
    }

    @Post('/logout')
    logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        res.cookie('wion_token','', {
            maxAge: 0
        });
    }
}
