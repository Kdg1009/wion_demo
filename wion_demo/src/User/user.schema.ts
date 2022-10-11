import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { userGrade } from './userGrade/user.grade';
import { Increment } from 'mongoose-auto-increment-ts';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({type: String, minLength: 4, maxLength: 20})
    userId: string;

    @Prop({type: String, minLength: 4})
    password: string;

    @Prop()
    email: string;

    @Prop({default: userGrade.REMNANT})
    grade: userGrade;

    @Prop()
    nickname: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    id: Number;
}

export const UserSchema = SchemaFactory.createForClass(User);