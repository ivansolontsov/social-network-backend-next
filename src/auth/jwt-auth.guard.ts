import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Socket } from "socket.io";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(public jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "Unauthorized" });
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: "Unauthorized" });
    }
  }
}

@Injectable()
export class JwtWsGuard extends JwtAuthGuard {
  constructor(public jwtService: JwtService) {
    super(jwtService);
    this.jwtService = jwtService;
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const authHeader = client.handshake.headers.authorization;
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Unauthorized" });
    }
    const user = this.jwtService.verify(token);
    client.data.user = user;
    if (user) return true;
  }
}
