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
        const board = new this.boardModel({ title: title,
                                            content: content,
                                            user: user, });
        await board.save();
        
        return { /*_id: board._id, */
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
        const board =  await this.boardModel.findById(id);
        return (await board.populate('comments')).populate('user');
    }

    async update(id: string, content: string[]=null, new_comment=null) {
        // if user dosen`t updates content
        if(!content) {
            //update comment
            await this.boardModel.updateOne({_id: id}, {comments: new_comment});
        } else {
            //update content
            await this.boardModel.updateOne({_id:id},{content: content});
        }
    }
}