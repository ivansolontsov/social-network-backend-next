import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AddFriendDto } from './dto/AddFriend.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
    constructor(
        private friendsService: FriendsService
    ) { }

    @ApiOperation({ summary: 'Add friend' })
    @Post('/addFriend')
    @UseGuards(JwtAuthGuard)
    createPost(
        @Req() request,
        @Body() dto: AddFriendDto,
    ) {
        return this.friendsService.addFriend(request, dto)
    }
}
