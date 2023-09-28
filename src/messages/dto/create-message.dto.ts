export class CreateMessageDto {
  // @ApiProperty({ example: 1, description: "Post id that must be unliked" })
  // @IsNumber({}, { message: "ID Must to be a number" })
  readonly chatId: number;

  // @ApiProperty({ example: 1, description: "Post id that must be unliked" })
  // @IsNumber({}, { message: "ID Must to be a number" })
  readonly receiverId: number;

  // @ApiProperty({ example: 1, description: "Post id that must be unliked" })
  // @IsNumber({}, { message: "ID Must to be a number" })
  readonly ownerId: number;

  // @ApiProperty({ example: 1, description: "Post id that must be unliked" })
  // @IsString({ message: "Message Must to be a string" })
  readonly message: string;
}
