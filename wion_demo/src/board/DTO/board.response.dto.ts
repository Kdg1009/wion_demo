import { Comment } from "../Schemas/comment.schema";
import { commentResponseDto } from "./comment.response.dto";

export class responseBoardDto {
    _id:string;
    title: string;
    content: string[];
    likes: number;
    comments: commentResponseDto[];
    //comments: Comment[];
    username: string;
}