import { Module } from '@nestjs/common';
import { DatabaseMoudule } from 'src/database/database.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './board.schema';

@Module({
  imports: [
    DatabaseMoudule,
    MongooseModule.forFeature([{name: Board.name, schema: BoardSchema }]),
  ],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
