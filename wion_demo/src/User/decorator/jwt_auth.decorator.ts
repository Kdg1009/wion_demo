import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//import { userInfoDto } from '../dto/user.info.dto';
import { User } from '../user.schema';

export const UserInfo = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    console.log('jwt auth: ' , req.user.username);
    return req.user;
    },
);