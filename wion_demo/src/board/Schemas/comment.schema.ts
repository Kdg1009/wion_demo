import { InjectModel, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/user/user.schema";
import { CommentRepository } from "../repository/comment.repository";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    // @Prop({
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     default: () => new mongoose.Types.ObjectId(),
    // })
    // id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'User'})
    user: User;

    @Prop()
    content: string;

    constructor(private commentRepository: CommentRepository) { };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);