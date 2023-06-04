import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserFriends } from './user-friends.model';
import { AddFriendDto } from './dto/AddFriend.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FriendsService {
    constructor(
        @InjectModel(UserFriends) private friendsRepository: typeof UserFriends,
        private jwtService: JwtService,
    ) { }

    async addFriend(request: any, dto: AddFriendDto) {
        const userToken = request.headers.authorization.split(' ')[1];
        const user: any = this.jwtService.decode(userToken)
        if (user.id) {
            await this.friendsRepository.create({ userId: user.id, friendId: dto.userId });
            return HttpStatus.ACCEPTED;
        }
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND)
    }
}