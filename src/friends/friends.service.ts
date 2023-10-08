import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserFriends } from "./friends.model";
import { AddFriendDto } from "./dto/AddFriend.dto";
@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(UserFriends) private friendsRepository: typeof UserFriends
  ) {}

  async addFriend(userId: number, dto: AddFriendDto) {
    if (userId) {
      await this.friendsRepository.create({
        userId: userId,
        friendId: dto.userId,
      });
      return HttpStatus.ACCEPTED;
    }
    throw new HttpException(
      { message: "User not found" },
      HttpStatus.NOT_FOUND
    );
  }
}
