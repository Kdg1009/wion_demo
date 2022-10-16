import { Controller, Get, Query, Post, Redirect } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { KakaoCodeDto } from './DTO/kakao.accessCode';
import { kakao_id } from './kakao_ID';

@Controller('kakao')
export class KakaoController {
    constructor(private kakaoService: KakaoService) {}

    //herf 태그로 카카오톡 로그인 링크 설정
    //<a id="kakao" href="/auth/kakao" class="btn">카카오톡 로그인</a>
    @Get('/login')
    login() {
        return this.kakaoService.loginKakao();
    }

    @Get('/callback')
    getKakaoInfo(@Query('code') KakaoCodeDto: KakaoCodeDto) {
        return this.kakaoService.getKakaoInfo(KakaoCodeDto);
    }
}
