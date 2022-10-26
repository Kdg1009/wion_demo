import { Controller, Get, Post, Res, Param, Body, UseGuards, Req, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';
import { createBoardDto } from './DTO/board.create.dto';
//import { Response, Request } from 'express';
import { UserInfo } from 'src/user/decorator/jwt_auth.decorator';
import { User } from 'src/user/user.schema';
import { responseBoardDto } from './DTO/board.response.dto';
import { createCommentDto } from './DTO/comment.create.dto';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    // @Get('/getAllBoard')
    // @UseGuards(AuthGuard())
    // getAllBoards(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    //     return this.boardService.getAllBoard;
    // }

    @Get('/getBoard/:id')
    getBoard(@Param('id') id: string): Promise<responseBoardDto> {
        return this.boardService.getBoardById(id);
    }

    @Post('/createBoard')
    @UseGuards(AuthGuard())
    createBoard(@UserInfo() user: User, @Body() createBoardDto: createBoardDto): Promise<responseBoardDto> {
        return this.boardService.createBoard(user, createBoardDto);
    }

    @Post('/getBoard/:id/comments')
    @UseGuards(AuthGuard())
    postComment(@UserInfo() user: User, @Body('content') createCommentDto: createCommentDto, @Param('id') id: string) {
        return this.boardService.addComment(user, createCommentDto, id);
    }

    @Delete('/getBoard/:id/delete/')
    @UseGuards(AuthGuard())
    deleteBoard() {

    }
}
