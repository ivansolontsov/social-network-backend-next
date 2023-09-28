import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class LikePostDto {
  @ApiProperty({ example: 1, description: "Post id that must be unliked" })
  @IsNumber({}, { message: "Must to be a number" })
  readonly postId: number;
}
