import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Messages } from "../messages/messages.model";
import { ChatUsers } from "./chat-users.model";

interface ChatCreationAttrs {
  id: number;
}
@Table({ tableName: "chats" })
export class Chats extends Model<Chats, ChatCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Chats)
  @HasMany(() => Messages)
  messages: Messages[];

  @ForeignKey(() => User)
  @BelongsToMany(() => User, () => ChatUsers)
  users: User[];
}
