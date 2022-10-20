import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from '../Schemas/board.schema';
import { Model } from 'mongoose';
import { createBoardDto } from '../DTO/board.create.dto';
import { responseBoardDto } from '../DTO/board.response.dto';

@Injectable()
export class BoardRepository {
    constructor(@InjectModel(Board.name) private boardModel: Model<BoardDocument>) {}

    async create(createBoardDto: createBoardDto): Promise<responseBoardDto> {
        const { title, content, user } = createBoardDto;
        console.log('repo user: ',user.username);
        const board = new this.boardModel({ title: title,
                                            content: content,
                                            user: user });
        await board.save();
        
        return { _id: board._id, 
                title: board.title, 
                content: board.content, 
                comments: [],
                likes: board.likes, 
                username: user.username
        }
    }

    async delete() {
        await this.boardModel.remove();
    }

    async findOne(id: string): Promise<Board> {
        console.log('repo: ',id);
        const board =  await this.boardModel.findOne({_id: id});
        console.log('board: ',board);
        return board;
    }

    async a() {
        const id =  '635138b8904f2fadd61d47d6';
        const board = await this.boardModel.findOne({title: 'eeee'});
        if(!board) {
            throw new NotFoundException('board not found');
        }
        return board;
    }
}