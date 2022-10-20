import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '../Schemas/comment.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { createCommentDto } from '../DTO/comment.create.dto';

@Injectable()
export class CommentRepository {
    constructor(@InjectModel (Comment.name) private commentModel: Model<CommentDocument>) {}

    async create(user: User, createCommentDto: createCommentDto) {
        const { content } = createCommentDto;
        const comment = new this.commentModel({
            user: user,
            content: content
        })

        return comment;
    }
}