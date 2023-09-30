import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChatsService } from "./chat.service";

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
}
