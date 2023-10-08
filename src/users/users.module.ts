import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";
import { Post } from "src/post/post.model";
import { FilesModule } from "src/files/files.module";
import { Likes } from "src/likes/likes.model";
import { Messages } from "../messages/messages.model";
import { Chats } from "../chat/chat.model";
import { ChatUsers } from "../chat/chat-users.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Post,
      Likes,
      Messages,
      Chats,
      ChatUsers,
    ]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
