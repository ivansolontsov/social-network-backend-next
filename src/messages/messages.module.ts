import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { Messages } from "./messages.model";
import { Chats } from "../chat/chat.model";
import { User } from "../users/users.model";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { ChatUsers } from "../chat/chat-users.model";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    SequelizeModule.forFeature([Messages, Chats, User, ChatUsers]),
    AuthModule,
    JwtModule,
  ],
  exports: [],
})
export class MessagesModule {}
