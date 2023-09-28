import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChatsService } from "./chat.service";

@ApiTags("chat")
@Controller("chat")
export class ChatController {
  constructor(private chatsService: ChatsService) {}

  @ApiOperation({ summary: "Placeholder" })
  @UseGuards(JwtAuthGuard)
  @Get("createChat")
  chatTest(@Req() request) {
    return request.user.id;
  }
}
