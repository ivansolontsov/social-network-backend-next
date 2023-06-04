import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Social Posts')
@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @Post('/createPost')
    @UseInterceptors(FileInterceptor('image'))
    createPost(
        @Body() dto: CreatePostDto,
        @UploadedFile() image,
    ) {
        return this.postService.create(dto, image)
    }
}
