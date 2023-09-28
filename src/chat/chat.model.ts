import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Post } from "../post/post.model";
import { Messages } from "../messages/messages.model";

interface ChatCreationAttrs {
  id: number;
  users: number[];
}
@Table({ tableName: "privateChats" })
export class Chats extends Model<Chats, ChatCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: false })
  users: number[];

  @HasMany(() => Messages)
  messages: Messages[];
}
