import { Module } from '@nestjs/common';
import { DatabaseMoudule } from 'src/database/database.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './Schemas/board.schema';
import { KakaoModule } from 'src/Auth(kakao)/kakao.module';
import { BoardRepository } from './repository/board.repository';
import { UserModule } from 'src/user/user.module';
import { Comment,CommentSchema } from './Schemas/comment.schema';
import { CommentRepository } from './repository/comment.repository';

@Module({
  imports: [
    DatabaseMoudule,
    MongooseModule.forFeature([{name: Board.name, schema: BoardSchema }, {name: Comment.name, schema: CommentSchema}]),
    KakaoModule,
    UserModule,
  ],
  controllers: [BoardController],
  providers: [BoardService,BoardRepository,CommentRepository],
  exports: [BoardService]
})
export class BoardModule {}
