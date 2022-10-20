import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { BoardRepository } from './repository/board.repository';
import { createBoardDto } from './DTO/board.create.dto';
import { responseBoardDto } from './DTO/board.response.dto';
import { createCommentDto } from './DTO/comment.create.dto';
import { CommentRepository } from './repository/comment.repository';
import { response } from 'express';

@Injectable()
export class BoardService {
    constructor(private boardRepository: BoardRepository,
                private commentRepository: CommentRepository) {}

    async getBoardById(id: string): Promise<responseBoardDto> {
        console.log(id);
        const board = await this.boardRepository.findOne(id);

        if(!board) {
            throw new NotFoundException(`no board found by id: ${id}`);
        }
        const comments = [];
        try {
            for (let comment of board.comments) {
                const username = comment.user.username;
                const content = comment.content;
                console.log('content success');
                comments.push({
                    username: username,
                    content: content
                })
            }
        } catch {
            console.log('no comments');
        }
        return { _id: board._id.toString(),
            title: board.title,
            content: board.content,
            likes: board.likes,
            comments: comments,
            username: board.user.username};
    }

    async createBoard(user: User, createBoardDto: createBoardDto): Promise<responseBoardDto> {
        const { title, content } = createBoardDto;
        console.log('service user: ',user.username);
        const board = await this.boardRepository.create({
            title: title,
            content: content,
            user: user
        })

        console.log('new board: \n',board);
        return board;
    }

    async addComment(user: User, createCommentDto: createCommentDto, id: string) {
        const board = await this.boardRepository.findOne(id);
        if(!board) {
            throw new NotFoundException(`no board found by id: ${id}`);
        }
        const comment = await this.commentRepository.create(user, createCommentDto);
        
        board.comments.push(comment);

        return response.redirect('board/getBoard/:id');
    }

    async a() {
        return this.boardRepository.a();
    }
}
