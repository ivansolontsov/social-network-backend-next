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
        if (!image) {
            await this.postRepository.create({ ...dto, userId: Number(userId) })
            return 'post created';
        }
        const fileName = await this.filesService.createFile(image);
        const post = await this.postRepository.create({ ...dto, userId: Number(userId), image: fileName })
        return post;
    }

    async getAll(userId: number) {
        const posts = await this.postRepository.findAll({ include: { all: true } })
        const postsViewModel = posts.map((post) => {
            const isLikedByCurrentUser = post.likes.some((e) => e.userId === userId)
            return {
                id: post.id,
                text: post.content,
                postCreatedDate: post.createdAt,
                author: {
                    id: post.author.id,
                    name: post.author.firstName + ' ' + post.author.lastName,
                    avatar: post.author.avatar
                },
                likes: post.likes.length,
                isLiked: isLikedByCurrentUser
            }
        })
        postsViewModel.sort((a, b) => {
            return b.postCreatedDate - a.postCreatedDate
        })
        return postsViewModel;
    }

    async getPostsByUserId(id: number, userId: number) {
        const posts = await this.postRepository.findAll({ include: { all: true }, where: { userId: id } })
        const postsViewModel = posts.map((post) => {
            const isLikedByCurrentUser = post.likes.some((e) => e.userId === userId)
            return {
                id: post.id,
                text: post.content,
                image: post.image,
                postCreatedDate: post.createdAt,
                author: {
                    id: post.author.id,
                    name: post.author.firstName + ' ' + post.author.lastName,
                    avatar: post.author.avatar
                },
                likes: post.likes.length,
                isLiked: isLikedByCurrentUser
            }
        })
        postsViewModel.sort((a, b) => {
            return b.postCreatedDate - a.postCreatedDate
        })
        return postsViewModel;
    }
}
