import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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

    @Post('createPost')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    createPost(
        @Body() dto: CreatePostDto,
        @UploadedFile() image,
        @Request() req
    ) {
        return this.postService.create(dto, image, req.user.id)
    }

    @ApiOperation({ summary: 'Get All Posts' })
    @ApiResponse({ status: 200, type: [PostModel] })
    @UseGuards(JwtAuthGuard)
    @Get('getAll')
    getAll() {
        return this.postService.getAll();
    }

    @ApiOperation({ summary: 'Get Posts by user id' })
    @ApiResponse({ status: 200, type: [PostModel] })
    @UseGuards(JwtAuthGuard)
    @Get('getPostsByUserId/:id')
    getPostsByUserId(@Param('id') id: string) {
        return this.postService.getPostsByUserId(Number(id));
    }

}
