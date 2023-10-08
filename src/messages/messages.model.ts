import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Chats } from "../chat/chat.model";

interface MessagesCreationAttrs {
  id: number;
  message: string;
  viewed: boolean;
  chatId: number;
  ownerId: number;
}
@Table({ tableName: "messages" })
export class Messages extends Model<Messages, MessagesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  viewed: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  message: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  ownerId: number;

  @ForeignKey(() => Chats)
  @Column({ type: DataType.INTEGER })
  chatId: number;

  @ForeignKey(() => User)
  @BelongsTo(() => User, { as: "messageAuthor" })
  messageAuthor: User;

  @ForeignKey(() => Chats)
  @BelongsTo(() => Chats, { as: "chatInstance" })
  chatInstance: Chats;
}
