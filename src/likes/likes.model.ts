import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from "sequelize-typescript";
import { Post } from "src/post/post.model";
import { User } from "src/users/users.model";
import { UserRoles } from "../roles/user-roles.model";

interface LikeCreationAttrs {
  postId: number;
  userId: number;
}

@Table({ tableName: "likes" })
export class Likes extends Model<Likes, LikeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: false })
  postId: number;

  @BelongsTo(() => User)
  users: User;
}
