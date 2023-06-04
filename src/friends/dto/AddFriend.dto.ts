import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddFriendDto {
    @ApiProperty({ example: 1, description: 'User that want to be added in friends' })
    @IsNumber({}, { message: 'Must to be a number' })
    readonly userId: number;
}