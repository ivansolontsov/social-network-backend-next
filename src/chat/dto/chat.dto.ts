import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateChatDto {
  readonly userId: number;
}

export class CreateChatControllerDto {
  @ApiProperty({
    example: 1,
    description: "ID Пользователя с которым вы хотите создать чат",
  })
  readonly userId: number;
}
