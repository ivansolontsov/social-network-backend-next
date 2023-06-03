import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'test@mail.ru', description: 'Unique email' })
    readonly email: string;
    @ApiProperty({ example: 'password', description: 'User Password' })
    readonly password: string;
}