import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChatsService } from "./chat.service";
import { CreateChatControllerDto } from "./dto/chat.dto";

@ApiTags("chat")
@Controller("chat")
export class ChatController {
  constructor(private chatsService: ChatsService) {}

  @ApiOperation({ summary: "Get Current Chats of User." })
  @Get("getUserChats")
  @UseGuards(JwtAuthGuard)
  getUserChats(@Req() request) {
    return this.chatsService.getUserChats(request.user.id);
  }

  @ApiOperation({ summary: "Get Current Chats of User." })
  @ApiResponse({ status: 200 })
  @Post("createChatWithUser")
  @UseGuards(JwtAuthGuard)
  createChatWithUser(@Body() body: CreateChatControllerDto, @Req() request) {
    return this.chatsService.onJoinRoom({
      userId: request.user.id,
      targetUserId: body.userId,
    });
  }
}
