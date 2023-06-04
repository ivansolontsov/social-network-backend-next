import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({ example: 'Reason string', description: 'Ban Reason' })
    readonly banReason: string;
    @ApiProperty({ example: '1', description: 'User Id' })
    readonly userId: number;
}