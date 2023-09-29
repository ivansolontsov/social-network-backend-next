import { InjectModel } from "@nestjs/sequelize";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Chats } from "./chat.model";
import { CreateChatDto } from "./dto/chat.dto";
import { Messages } from "../messages/messages.model";
import { Op } from "sequelize";
import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { User } from "../users/users.model";

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chats) private chatsRepository: typeof Chats,
    @InjectModel(Messages) private messagesRepository: typeof Messages,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async onJoinRoom(joinRoomDto: { userId: number; targetUserId: number }) {
    const opponent = await this.userRepository.findByPk(
      joinRoomDto.targetUserId
    );
    if (!opponent) return null;

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
      members: [opponent],
    };
  }

  async onSendMessage(createMessageDto: CreateMessageDto) {
    if (!createMessageDto.message) return null;
    const message = await this.createMessage(createMessageDto);
    return message;
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
