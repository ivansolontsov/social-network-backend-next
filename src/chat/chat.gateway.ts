import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from "@nestjs/websockets";
import { Logger, UseGuards } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { ChatsService } from "./chat.service";
import { JwtWsGuard } from "../auth/jwt-auth.guard";
import { SendMessageDto } from "./dto/send-message.dto";

@UseGuards(JwtWsGuard)
@WebSocketGateway({
  namespace: "chats",
  cors: {
    origin: true,
    credentials: false,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatsService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("ChatGateway");

  afterInit(server: Server) {
    this.logger.log("Initialized!");
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage("joinChat")
  async handleJoinChat(client: Socket, payload: { userId: number }) {
    const chatInfo = await this.chatService.onJoinRoom({
      userId: client.data.user.id,
      targetUserId: payload.userId,
    });
    if (!chatInfo)
      return client.emit(
        "errorEvent",
        `Ошибка присоединения к беседе с ${chatInfo.members[0].firstName} + ${chatInfo.members[0].lastName}`
      );

    await client.join(chatInfo.chatId.toString());
    client.emit("roomJoined", { ...chatInfo });

    this.logger.log(
      `user ${client.data.user.email} succesfully connected to ${chatInfo.chatId} room.`
    );
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage("sendMessage")
  async handleSendMessage(client: Socket, payload: SendMessageDto) {
    const createdMessage = await this.chatService.onSendMessage({
      chatId: payload.chatId,
      ownerId: client.data.user.id,
      message: payload.message,
    });
    if (!createdMessage) console.log("wtf?");
    this.server
      .to(payload.chatId.toString())
      .emit("newMessage", { ...createdMessage });
  }
}
