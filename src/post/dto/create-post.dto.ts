import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsString({ message: 'Must to be a string' })
    readonly content: string;
} 