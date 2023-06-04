import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    // @IsString({ message: 'Must to be a string' })
    readonly title: string;

    // @IsString({ message: 'Must to be a string' })
    readonly content: string;

    // @IsNumber({}, { message: 'Must to be a number' })
    readonly userId: number;
} 