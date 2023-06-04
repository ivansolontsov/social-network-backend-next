import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Role Name' })
    @IsString({ message: 'Must to be a string' })
    readonly value: string;

    @ApiProperty({ example: '1', description: 'User Id' })
    @IsNumber({}, { message: 'Must to be a number' })
    readonly userId: number;
}