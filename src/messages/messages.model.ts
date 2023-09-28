import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Chats } from "../chat/chat.model";

interface MessagesCreationAttrs {
  id: number;
  chatId: number;
  ownerId: number;
  message: string;
  viewed: boolean;
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

  @ForeignKey(() => Chats)
  @Column({ type: DataType.INTEGER, allowNull: false })
  chatId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ownerId: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  viewed: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  message: string;
}
