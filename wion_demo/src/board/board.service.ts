import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { BoardRepository } from './repository/board.repository';
import { createBoardDto } from './DTO/board.create.dto';
import { responseBoardDto } from './DTO/board.response.dto';
import { createCommentDto } from './DTO/comment.create.dto';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class BoardService {
    constructor(private boardRepository: BoardRepository,
                private commentRepository: CommentRepository) {}

    async getBoardById(id: string): Promise<responseBoardDto> {
        const board = await this.boardRepository.findOne(id);

        if(!board) {
            throw new NotFoundException(`no board found by id: ${id}`);
        }
        const comments = [];
        try {
            for (let comment of board.comments) {
                const username = comment.user.username;
                console.log(`username: ${username}`);
                const content = comment.content;
                comments.push({
                    username: username,
                    content: content
                })
            }
        } catch {
            console.log('no comments');
        }
        return { /*_id: board._id.toString(),*/
            title: board.title,
            content: board.content,
            likes: board.likes,
            comments: comments,
            username: board.user.username};
    }

    async createBoard(user: User, createBoardDto: createBoardDto): Promise<responseBoardDto> {
        const { title, content } = createBoardDto;
        const board = await this.boardRepository.create({
            title: title,
            content: content,
            user: user
        })

        return board;
    }

    async addComment(user: User, createCommentDto: createCommentDto, id: string) {
        const board = await this.boardRepository.findOne(id);
        if(!board) {
            throw new NotFoundException(`no board found by id: ${id}`);
        }

        const comment = await this.commentRepository.create(user, createCommentDto);
        const newComment = board.comments;
        newComment.push(comment);

        this.boardRepository.update(id,undefined,newComment);

        //return response.redirect('board/getBoard/:id');
    }
}
