import { Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get('/getAllBoard')
    getAllBoards() {
        return;
    }

    @Get('/getBoard/:title')
    getBoard(title: string) {
        return;
    }
}
