import { InjectModel } from "@nestjs/sequelize";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Chats } from "./chat.model";
import { CreateChatDto } from "./dto/chat.dto";
import { Messages } from "../messages/messages.model";
import { Op } from "sequelize";
import { CreateMessageDto } from "../messages/dto/create-message.dto";

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chats) private chatsRepository: typeof Chats,
    @InjectModel(Messages) private messagesRepository: typeof Messages
  ) {}

  async onJoinRoom(joinRoomDto: any) {}

  async onSendMessage(createMessageDto: CreateMessageDto) {
    if (
      (!createMessageDto.ownerId && !createMessageDto.receiverId) ||
      createMessageDto.ownerId === createMessageDto.receiverId
    )
      throw HttpStatus.BAD_REQUEST;

    let chat = await this.chatsRepository.findOne({
      where: {
        users: {
          [Op.contains]: [
            createMessageDto.receiverId,
            createMessageDto.ownerId,
          ],
        },
      },
    });
    if (!chat)
      chat = await this.createChat({
        users: [createMessageDto.ownerId, createMessageDto.receiverId],
      });
    const message = await this.createMessage({
      chatId: chat.id,
      message: createMessageDto.message,
      ownerId: createMessageDto.ownerId,
      receiverId: createMessageDto.receiverId,
    });

    return {
      chatInstance: chat,
      messageInstance: message,
    };
  }

  private async createChat(createChatDto: CreateChatDto) {
    const chat = await this.chatsRepository.create({
      users: createChatDto.users,
    });
    return chat;
  }

  private async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messagesRepository.create({
      chatId: createMessageDto.chatId,
      ownerId: createMessageDto.ownerId,
      message: createMessageDto.message,
    });
    return message;
  }
}
