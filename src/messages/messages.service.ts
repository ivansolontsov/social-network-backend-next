import { InjectModel } from "@nestjs/sequelize";
import { Injectable } from "@nestjs/common";
import { Messages } from "./messages.model";
import { Chats } from "../chat/chat.model";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages) private messageRepository: typeof Messages,
    @InjectModel(Chats) private chatsRepository: typeof Chats
  ) {}

  // async createChat(createChatDto: any) {
  //   const chat = await this.chatsRepository.create({
  //     users: createChatDto.users,
  //   });
  //   return { chatId: chat.id };
  // }
}
