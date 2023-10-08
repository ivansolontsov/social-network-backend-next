import { Module } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { FriendsController } from "./friends.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserFriends } from "./friends.model";
import { User } from "src/users/users.model";
import { AuthModule } from "src/auth/auth.module";
import { ApiTags } from "@nestjs/swagger";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [
    SequelizeModule.forFeature([UserFriends, User]),
    AuthModule,
    JwtModule,
  ],
})
export class FriendsModule {}
