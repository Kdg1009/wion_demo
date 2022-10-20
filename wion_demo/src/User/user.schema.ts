import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { userGrade } from './userGrade/user.grade';
import { Increment } from 'mongoose-auto-increment-ts';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        type: mongoose.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
    })
    _id: string;
    
    //later, change to refresh token, or just remove this
    @Prop({ required: false})
    kakaoId: string;

    @Prop()
    email: string;
    
    @Prop({type: String, minLength: 8})
    password: string;

    @Prop({type: String, minLength: 1, maxLength: 20})
    username: string;

    @Prop({default: userGrade.REMNANT})
    grade: userGrade;
}

export const UserSchema = SchemaFactory.createForClass(User);