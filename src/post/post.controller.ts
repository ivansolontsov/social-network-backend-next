import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from './post.model'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Social Posts')
@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @Post('/createPost')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    createPost(
        @Body() dto: CreatePostDto,
        @UploadedFile() image,
        @Request() req
    ) {
        console.log(req.user.id)
        return this.postService.create(dto, image)
    }

    @ApiOperation({ summary: 'Get All Posts' })
    @ApiResponse({ status: 200, type: [PostModel] })
    @UseGuards(JwtAuthGuard)
    @Get('getAll')
    getAll() {
        return this.postService.getAll();
    }

}
