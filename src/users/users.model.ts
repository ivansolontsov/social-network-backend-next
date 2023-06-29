import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Likes } from "src/likes/likes.model";
import { Post } from "src/post/post.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique Id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'test@mail.ru', description: 'EMail' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: 'Ivan', description: 'First Name' })
    @Column({ type: DataType.STRING })
    firstName: string;

    @ApiProperty({ example: 'Solontsov', description: 'Last Name' })
    @Column({ type: DataType.STRING })
    lastName: string;

    @ApiProperty({ example: 'password', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'false', description: 'Is user banned or not' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'none', description: 'Ban Reason' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @ApiProperty({ example: 'url', description: 'Avatar URL' })
    @Column({ type: DataType.STRING, allowNull: true })
    avatar: string;

    @ApiProperty({ example: 'url', description: "Background URL" })
    @Column({ type: DataType.STRING, allowNull: true })
    background: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Likes)
    likes: Likes[];

    @HasMany(() => Post)
    posts: Post[]
}