import { IsString } from "class-validator";

export class KakaoCodeDto {
    @IsString()
    readonly code: string;
}