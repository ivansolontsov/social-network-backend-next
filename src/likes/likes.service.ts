import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Likes } from './likes.model';
import { LikePostDto } from './dto/like-post.dto';
import { Post } from 'src/post/post.model';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(Likes) private likeRepository: typeof Likes,
        @InjectModel(Post) private postRepository: typeof Post,
        private jwtService: JwtService,
    ) { }

    async likePost(dto: LikePostDto, userId: number) {
        const isLikeAlreadyExists = await this.likeRepository.findOne({ where: { postId: dto.postId, userId: userId } })
        if (isLikeAlreadyExists) throw new HttpException('Post already liked', HttpStatus.BAD_REQUEST)
        const like = await this.likeRepository.create({ userId: userId, postId: dto.postId })
        return like;
    }
    async unlikePost(dto: LikePostDto, userId: number) {
        const like = await this.likeRepository.findOne({ where: { postId: dto.postId, userId: userId } })
        if (!like) throw new HttpException('like not found', HttpStatus.BAD_REQUEST);
        await this.likeRepository.destroy({ where: { postId: like.postId, userId: like.userId } })
        return HttpStatus.ACCEPTED;;
    }
}
