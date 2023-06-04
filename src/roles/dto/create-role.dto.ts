import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {

    @IsString({ message: 'Must to be a string' })
    readonly value: string;

    @IsString({ message: 'Must to be a string' })
    readonly description: string;
}