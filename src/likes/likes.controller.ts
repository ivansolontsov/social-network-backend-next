import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LikePostDto } from './dto/like-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Like')
@Controller('likes')
export class LikesController {
    constructor(
        private likesServices: LikesService
    ) { }

    @ApiOperation({ summary: 'Like Post' })
    @Post('/likePost')
    @UseGuards(JwtAuthGuard)
    createPost(
        @Req() request,
        @Body() dto: LikePostDto,
    ) {
        return this.likesServices.likePost(request, dto);
    }
}
