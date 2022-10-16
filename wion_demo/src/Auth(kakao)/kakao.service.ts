import { Injectable, HttpException } from '@nestjs/common';
import { KakaoCodeDto } from './DTO/kakao.accessCode';
import { kakao_id } from './kakao_ID';
import axios, { AxiosResponse } from 'axios';
import { UserDocument, User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class KakaoService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private userService: UserService) {}

    async loginKakao(): Promise<AxiosResponse> {
        const REST_API_KEY = kakao_id.client_id;
        const REDIRECT_URI = kakao_id.redirect_url;
        const getCodeUrl: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    
        return await axios.get(getCodeUrl);
    }
    
    async getKakaoInfo(KakaoCodeDto: KakaoCodeDto) {
        
        //authorization_code
        const { code } = KakaoCodeDto; 

        //geting access token
        const getAccessTokenUrl = `https://kauth.kakao.com/oauth/token`; 
        const request = { 
            grant_type: 'authorization_code',
            client_id: kakao_id.client_id,
            client_secret: kakao_id.client_secret,
            redirect_url: kakao_id.redirect_url,
            code: code
        };

        const token_res: AxiosResponse = await axios.post(getAccessTokenUrl, request, {
            headers: {
                accept: 'application/json',
            },
        }); 

        if(token_res.data.error) {
            throw new HttpException('로그인에 실패하였습니다.',401);
        }

        //access token
        const { access_token, refresh_token } = token_res.data; 

        //geting user Info using access token
        const getUserUrl = 'https://kapi.kakao.com/v2/user/me';
        const userInfo: AxiosResponse = await axios.get(getUserUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        //user`s kakao id
        const { userid } = userInfo.data;

        //if user haven`t sign up, gen user`s account
        const isExist = await this.userModel.findOne({kakaoId: userid});

        if(!isExist) {
            
        }
    }
}
