import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MessagesService } from "./messages.service";

@ApiTags("chat")
@Controller("chat")
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @ApiOperation({ summary: "Get All Messages by Chat Id" })
  @UseGuards(JwtAuthGuard)
  @Get("getMessagesByChatId/:chatId")
  getMessagesByChatId(@Param("chatId") chatId: number, @Req() req) {
    return this.messagesService.getMessagesByChatId(chatId, req.user.id);
  }
}
