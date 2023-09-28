import { Module, Post } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { ChatGateway } from "./chat.gateway";
import { SequelizeModule } from "@nestjs/sequelize";
import { ChatController } from "./chat.controller";
import { ChatsService } from "./chat.service";
import { Chats } from "./chat.model";
import { Messages } from "../messages/messages.model";
import { User } from "../users/users.model";

@Module({
  controllers: [ChatController],
  providers: [ChatsService, ChatGateway],
  imports: [
    SequelizeModule.forFeature([Chats, Messages, User]),
    AuthModule,
    JwtModule,
  ],
})
export class ChatModule {}
