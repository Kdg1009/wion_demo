import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
import { Comment, CommentDocument } from './comment.schema';

export type BoardDocument = Board & Document;

@Schema({ timestamps: { createdAt: "createAt", updatedAt: "updateAt" }})
export class Board {
    // @Prop({
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     default: () => new mongoose.Types.ObjectId(),
    // })
    // _id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ require: false })
    content: string[];

    @Prop({ required: false })
    file: Express.Multer.File[];

    @Prop({ default: 0 })
    likes: number;

    //one to one mapping with user document
    //need to reference parent
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: [] })
    comments: Comment[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
}

export const BoardSchema = SchemaFactory.createForClass(Board);