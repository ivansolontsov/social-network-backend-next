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
    // client.join(payload.chatId.toString());
  }
  @UseGuards(JwtWsGuard)
  @SubscribeMessage("sendMessage")
  async handleSendMessage(client: Socket, payload: SendMessageDto) {
    const response = await this.chatService.onSendMessage({
      chatId: payload.chatId,
      ownerId: client.data.user.id,
      receiverId: payload.receiverId,
      message: payload.message,
    });
    this.server
      .to(payload.chatId.toString())
      .emit("newMessage", { ...response });
  }
}
