import { InjectModel } from "@nestjs/sequelize";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Messages } from "./messages.model";
import { Chats } from "../chat/chat.model";
import { User } from "../users/users.model";
import { ChatUsers } from "../chat/chat-users.model";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages) private messageRepository: typeof Messages,
    @InjectModel(Chats) private chatsRepository: typeof Chats,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(ChatUsers) private chatUsersRepository: typeof ChatUsers
  ) {}

  async getMessagesByChatId(chatId: number, userId: number) {
    const isUserInChat = await this.chatUsersRepository.findOne({
      where: { chatId: chatId, userId: userId },
    });
    if (!isUserInChat)
      throw new HttpException(
        "Вы не находитесь в этом чате",
        HttpStatus.NOT_FOUND
      );

    const messages = await this.messageRepository.findAll({
      where: { chatId: chatId },
      include: { all: true },
    });

    return messages.map((e) => {
      return {
        id: e.id,
        message: e.message,
        avatar: e.messageAuthor.avatar,
        name: e.messageAuthor.firstName + " " + e.messageAuthor.lastName,
        userId: e.ownerId,
        createdAt: e.createdAt,
      };
    });
  }
}
