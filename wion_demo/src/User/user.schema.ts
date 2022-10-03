import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document} from 'mongoose';
import { accessAuth } from './user.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: false }})
export class User {
    @Prop({ default: new Date(), type: mongoose.Schema.Types.Date})
    createdAt: Date;

    @Prop({ require: true })
    email: string;

    @Prop({ require: true, type: mongoose.Schema.Types.String })
    password: string;

    @Prop({ require: true, type: mongoose.Schema.Types.String })
    username: string;

    @Prop({ require: true, default: accessAuth.GUEST })
    accessAuth: accessAuth;
}

export const UserSchema = SchemaFactory.createForClass(User);