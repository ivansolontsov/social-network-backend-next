import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MessagesService } from "./messages.service";

@ApiTags("messages")
@Controller("messages")
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @ApiOperation({ summary: "Placeholder" })
  @UseGuards(JwtAuthGuard)
  @Get("getMessages")
  chatTest(@Req() request) {
    return request.user.id;
  }
}
