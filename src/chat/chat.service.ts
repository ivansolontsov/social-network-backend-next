import { InjectModel } from "@nestjs/sequelize";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Chats } from "./chat.model";
import { Messages } from "../messages/messages.model";
import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { User } from "../users/users.model";
import { ChatUsers } from "./chat-users.model";

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chats) private chatsRepository: typeof Chats,
    @InjectModel(Messages) private messagesRepository: typeof Messages,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(ChatUsers) private chatUsersRepository: typeof ChatUsers
  ) {}

  async getUserChats(userId: number) {
    const user = await this.userRepository.findByPk(userId, {
      include: { all: true },
    });
    const chats = await this.chatsRepository.findAll({
      where: { id: user.chats.map((e) => e.id) },
      include: { all: true },
    });

    return chats
      .sort((a, b) => {
        if (a.messages.length > 0 && b.messages.length > 0) {
          if (a.messages.pop().createdAt < b.messages.pop().createdAt) {
            return 1;
          } else {
            return -1;
          }
        }
        if (a.messages.length > 0 && b.messages.length === 0) return 1;
      })
      .map((e) => {
        const enemyUser = e.users.find((user) => user.id !== userId);
        return {
          enemyUser: {
            id: enemyUser.id,
            name: enemyUser.firstName + " " + enemyUser.lastName,
            avatar: enemyUser.avatar,
          },
          chat: {
            id: e.id,
            lastMessageDate:
              e.messages.length > 0 ? e.messages.pop().createdAt : e.createdAt,
          },
        };
      });
  }

  async joinRoomByChatId(chatId: number, userId: number) {
    const chatUsersRecord = await this.chatUsersRepository.findAll({
      where: { chatId: chatId, userId: userId },
    });
    if (chatUsersRecord.length === 0) {
      return null;
    }

    const chat = await this.chatsRepository.findByPk(
      chatUsersRecord.shift().chatId,
      { include: { all: true } }
    );
    return {
      chatId: chat.id,
      members: chat.users,
    };
  }

  async createChatWithUser(userId: number, targetUserId: number) {
    const targetUser = await this.userRepository.findByPk(targetUserId);
    if (!targetUser)
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);

    const chatsOfUser = await this.chatUsersRepository.findAll({
      attributes: ["chatId"],
      where: { userId: userId },
    });

    const chatIdsOfUser = new Set(chatsOfUser.map((e) => e.chatId));

    const chatsOfTargetUser = await this.chatUsersRepository.findAll({
      attributes: ["chatId"],
      where: { userId: targetUserId },
    });

    const chat = chatsOfTargetUser.find((e) => chatIdsOfUser.has(e.chatId));
    if (!chat) {
      const newChat = await this.createChat(userId, targetUserId);
      return { chatId: newChat.id };
    }

    return chat;
  }

  async onSendMessage(createMessageDto: CreateMessageDto) {
    if (!createMessageDto.message) return null;

    const chat = await this.chatsRepository.findByPk(createMessageDto.chatId, {
      include: { all: true },
    });
    const chatUserIds = new Set(chat.users.map((e) => e.id));
    if (chatUserIds.has(createMessageDto.ownerId)) {
      return await this.createMessage(createMessageDto);
    } else {
      return null;
    }
  }

  private async createChat(userId: number, targetUserId: number) {
    const newChat = await this.chatsRepository.create();
    await this.chatUsersRepository.bulkCreate([
      {
        userId: userId,
        chatId: newChat.id,
      },
      {
        userId: targetUserId,
        chatId: newChat.id,
      },
    ]);
    return newChat;
  }

  private async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messagesRepository.create({
      message: createMessageDto.message,
      chatId: createMessageDto.chatId,
      ownerId: createMessageDto.ownerId,
    });
    const user = await this.userRepository.findByPk(createMessageDto.ownerId);
    return {
      id: message.id,
      message: message.message,
      avatar: user.avatar,
      name: user.firstName + " " + user.lastName,
      userId: user.id,
      createdAt: message.createdAt,
    };
  }
}
