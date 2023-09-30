import { InjectModel } from "@nestjs/sequelize";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Messages } from "./messages.model";
import { Chats } from "../chat/chat.model";
import { User } from "../users/users.model";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages) private messageRepository: typeof Messages,
    @InjectModel(Chats) private chatsRepository: typeof Chats,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async getMessagesByChatId(chatId: number, userId: number) {
    const chat = await this.chatsRepository.findByPk(chatId);
    if (chat.users.includes(userId)) {
      const chatUsers = await this.userRepository.findAll({
        where: { id: chat.users },
      });
      const messages = await this.messageRepository.findAll({
        where: { chatId: chatId },
      });
      return messages.map((e) => {
        const messageOwner = chatUsers
          .filter((user) => user.id === e.ownerId)
          .shift();
        return {
          id: e.id,
          userId: e.ownerId,
          message: e.message,
          avatar: messageOwner.avatar,
          name: messageOwner.firstName,
          createdAt: e.createdAt,
        };
      });
    } else {
      return new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
