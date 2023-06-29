import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private filesService: FilesService
    ) { }

    async create(dto: CreatePostDto, image: any, userId: number) {
        const fileName = await this.filesService.createFile(image);
        const post = await this.postRepository.create({ ...dto, userId: Number(userId), image: fileName })
        return post;
    }

    async getAll() {
        const posts = await this.postRepository.findAll({ include: { all: true } })
        const postsViewModel = posts.map((post) => {
            return {
                id: post.id,
                title: post.title,
                text: post.content,
                postCreatedDate: post.createdAt,
                author: {
                    id: post.author.id,
                    name: post.author.firstName + ' ' + post.author.lastName,
                    avatar: post.author.avatar
                }
            }
        })
        return postsViewModel;
    }
}
