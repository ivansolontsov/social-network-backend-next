import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { Post } from "./post/post.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FriendsModule } from "./friends/friends.module";
import { LikesModule } from "./likes/likes.module";
import * as path from "path";
import { Likes } from "./likes/likes.model";
import { UserFriends } from "./friends/user-friends.model";
import { ChatModule } from "./chat/chat.module";
import { Chats } from "./chat/chat.model";
import { Messages } from "./messages/messages.model";
import { MessagesModule } from "./messages/messages.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Post,
        Likes,
        UserFriends,
        Chats,
        Messages,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostModule,
    FilesModule,
    FriendsModule,
    LikesModule,
    ChatModule,
    MessagesModule,
  ],
})
export class AppModule {}
