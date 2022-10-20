import { User } from "src/user/user.schema";

export class createBoardDto {
    title: string;
    content: string;
    user: User
}