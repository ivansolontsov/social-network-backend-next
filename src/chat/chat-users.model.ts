import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Chats } from "./chat.model";
interface ChatsUsersCreationAttrs {
  id: number;
  chatId: number;
  userId: number;
}
@Table({ tableName: "chat_users" })
export class ChatUsers extends Model<ChatUsers, ChatsUsersCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Chats)
  @Column({ type: DataType.INTEGER, allowNull: false })
  chatId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => Chats)
  chat: Chats;

  @BelongsTo(() => User)
  user: User;
}
