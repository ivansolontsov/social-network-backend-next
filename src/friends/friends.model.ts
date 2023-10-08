import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/users.model";

interface AddFriendAttrs {
    userId: number;
    friendId: number;
}

@Table({ tableName: 'user_friends' })
export class UserFriends extends Model<UserFriends, AddFriendAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Id of user that wants to add friend' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ApiProperty({ example: 1, description: 'Id of user that wants to be added in friends' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    friendId: number;
}