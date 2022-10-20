import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({ timestamps: { createdAt: "createAt", updatedAt: "updateAt"}})
export class Token {
    @Prop({
        type: mongoose.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
    })
    _id: mongoose.Types.ObjectId;

    @Prop()
    _refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);