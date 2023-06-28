import { Injectable } from '@nestjs/common';
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

    async likePost(request: any, dto: LikePostDto) {
        console.log(request, 'wow, this is like')
    }
}
