import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Express } from 'express';

export type BoardDocument = Board & Document;

@Schema({ timestamps: { createdAt: "createAt", updatedAt: "updateAt" }})
export class Board {
    @Prop()
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ require: false })
    content: string[];

    @Prop({ required: false })
    file: Express.Multer.File[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);