import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { FilesService } from "src/files/files.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private filesService: FilesService
  ) {}

  async getUser(userId: number) {
    const user = await this.userRepository.findByPk(userId);
    if (user) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        banned: user.banned,
        banReason: user.banReason,
        avatar: user.avatar,
        background: user.background,
        createdAt: user.createdAt,
        updateAt: user.updatedAt,
        email: user.email,
      };
    }
    throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
  }

  async updateAvatar(userId: number, image: any) {
    const fileName = await this.filesService.createFile(image);
    const user = await this.userRepository.findByPk(userId);
    user.avatar = fileName;
    await user.save();
    return "Avatar Updated";
  }

  async updateBackground(userId: number, image: any) {
    const fileName = await this.filesService.createFile(image);
    const user = await this.userRepository.findByPk(userId);
    user.background = fileName;
    await user.save();
    return "Background Updated";
  }

  async createUser(dto: CreateUserDto) {
    const { email } = dto;
    const isUserExists = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    if (isUserExists) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.create(dto);
    const roles = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [roles.id]);
    user.roles = [roles];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users.map((e) => e.id);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }
}
