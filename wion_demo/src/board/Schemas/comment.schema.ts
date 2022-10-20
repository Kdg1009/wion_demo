import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/user/user.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({
        type: mongoose.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
    })
    id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'User'})
    user: User;

    @Prop()
    content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);