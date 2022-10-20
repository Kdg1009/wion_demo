import { Injectable, HttpException } from '@nestjs/common';
import { KakaoCodeDto } from './DTO/kakao.accessCode';
import { kakao_id } from './kakao_ID';
import axios, { AxiosResponse } from 'axios';
import { UserService } from 'src/user/user.service';
import { response, Request, Response } from 'express'; 
import cookieParser from 'cookie-parser';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './kakao.token.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class KakaoService {
    constructor(private userService: UserService,
                @InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

    //1. Running this app, first render authLoading page
    //2. get refresh token`s id from user`s broswer
    //2-1) if refresh id exists in db, get new accessToken from kakao server
    //2-2) else, move to login page
    async authLoading(req: Request) {
        const refresh_id = req.cookies['wion_token'];

        const isExist = this.tokenModel.findOne({_id: refresh_id});
        if(!isExist) {
            return response.redirect('/kakao/login');
        } else {
            
        }
    }   

    async loginKakao(): Promise<AxiosResponse> {
        const REST_API_KEY = kakao_id.client_id;
        const REDIRECT_URI = kakao_id.redirect_url;
        const getCodeUrl: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    
        return await axios.get(getCodeUrl);
    }
    
    async getKakaoInfo(KakaoCodeDto: KakaoCodeDto, res: Response) {
        
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
        //access token은 쿠키에 넣고, refresh token은 db에 넣고 index값을 쿠키에 저장
        const { access_token, refresh_token } = token_res.data;
        // const refresh_id = new mongoose.Types.ObjectId();
        // this.tokenModel.create({refresh_id, refresh_token});
        let newToken = new this.tokenModel({_refreshToken: refresh_token});
        await newToken.save();

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
        const isExist = await this.userService.findOne(userid);

        if(!isExist) {
            return response.redirect('../user/user/signup')
        } else {
            //return refresh token id
            res.setHeader('Authorization', 'Bearer ' + newToken._id);
            res.cookie('wion_token', newToken._id, {
                httpOnly: true,
            });
            //return to main page
        }
    }
}
