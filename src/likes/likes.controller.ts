import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LikePostDto } from "./dto/like-post.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("Like")
@Controller("likes")
export class LikesController {
  constructor(private likesServices: LikesService) {}

  @ApiOperation({ summary: "Like Post" })
  @Post("/likePost")
  @UseGuards(JwtAuthGuard)
  likePost(@Body() dto: LikePostDto, @Req() request) {
    return this.likesServices.likePost(dto, request.user.id);
  }

  @ApiOperation({ summary: "Unlike Post" })
  @Delete("/unlikePost/:id")
  @UseGuards(JwtAuthGuard)
  @Get("getUserById/:id")
  unlikePost(@Param("id") id: number, @Req() request) {
    return this.likesServices.unlikePost(id, request.user.id);
  }
}
