import { InjectModel } from "@nestjs/sequelize";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Chats } from "./chat.model";
import { CreateChatDto } from "./dto/chat.dto";
import { Messages } from "../messages/messages.model";
import { Op, where } from "sequelize";
import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { User } from "../users/users.model";

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chats) private chatsRepository: typeof Chats,
    @InjectModel(Messages) private messagesRepository: typeof Messages,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async getUserChats(userId: string) {
    const chats = await this.chatsRepository.findAll({
      where: {
        users: {
          [Op.contains]: [userId],
        },
      },
    });
    const enemyUserIds = chats.map((e) =>
      e.users.filter((e) => e !== Number(userId)).shift()
    );
    const enemyUsers = await this.userRepository.findAll({
      where: { id: enemyUserIds },
    });

    return chats.map((e) => {
      const userInChat = enemyUsers
        .filter((user) => e.users.includes(user.id))
        .shift();
      return {
        enemyUser: {
          id: userInChat.id,
          name: userInChat.firstName + " " + userInChat.lastName,
          avatar: userInChat.avatar,
        },
        chat: {
          id: e.id,
          lastMessageDate: e.updatedAt,
        },
      };
    });
  }

  async joinRoomByChatId(chatId: number, userId: number) {
    const chat = await this.chatsRepository.findByPk(chatId);
    if (chat && chat.users.includes(userId)) {
      const users = await this.userRepository.findAll({
        where: { id: chat.users.find((e) => e !== userId) },
      });
      return {
        chatId: chat.id,
        members: users,
      };
    }
    return null;
  }

  async onJoinRoom(joinRoomDto: { userId: number; targetUserId: number }) {
    const opponent = await this.userRepository.findByPk(
      joinRoomDto.targetUserId
    );
    if (!opponent)
      throw new HttpException(
        "Пользователь с таким ID не найден",
        HttpStatus.NOT_FOUND
      );

    let chat = await this.chatsRepository.findOne({
      where: {
        users: {
          [Op.contains]: [joinRoomDto.userId, joinRoomDto.targetUserId],
        },
      },
    });

    if (!chat)
      chat = await this.createChat({
        users: [joinRoomDto.userId, joinRoomDto.targetUserId],
      });

    return {
      chatId: chat.id,
    };
  }

  async onSendMessage(createMessageDto: CreateMessageDto) {
    if (!createMessageDto.message) return null;
    const chat = await this.chatsRepository.findByPk(createMessageDto.chatId);
    if (chat.users.includes(createMessageDto.ownerId)) {
      const user = await this.userRepository.findByPk(createMessageDto.ownerId);
      const message = await this.createMessage(createMessageDto);
      return {
        id: message.id,
        message: message.message,
        avatar: user.avatar,
        name: user.firstName,
        userId: user.id,
        createdAt: message.createdAt,
      };
    }
    return null;
  }

  private async createChat(createChatDto: CreateChatDto) {
    const chat = await this.chatsRepository.create({
      users: createChatDto.users,
    });
    return chat;
  }

  private async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messagesRepository.create(createMessageDto);
    return message.dataValues;
  }
}
