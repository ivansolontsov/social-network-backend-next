import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateChatDto {
  // @ApiProperty({ example: 1, description: "Post id that must be unliked" })
  // @IsNumber({}, { message: "ID Must to be a number" })
  readonly users: number[];

  // @ApiProperty({ example: 1, description: "Post id that must be unliked" })
  // @IsNumber({}, { message: "ID Must to be a number" })
  // readonly receiverId: number;

  // @ApiProperty({ example: 1, description: "Post id that must be unliked" })
  // @IsString({ message: "Message Must to be a string" })
  // readonly message: string;
}
