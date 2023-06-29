import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    // @ApiOperation({ summary: 'Create User' })
    // @ApiResponse({ status: 200, type: User })
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    // @Post()
    // create(@Body() userDto: CreateUserDto) {
    //     return this.usersService.createUser(userDto);
    // }

    @ApiOperation({ summary: 'Get All Users' })
    @ApiResponse({ status: 200, type: [User] })
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Get Current User Info' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get('/getUser')
    getUser(@Request() req) {
        return this.usersService.getUser(req.user.id);
    }

    @ApiOperation({ summary: 'Get Current User Info' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post('/updateAvatar')
    updateAvatar(@Request() req, @UploadedFile() image) {
        return this.usersService.updateAvatar(req.user.id, image);
    }

    @ApiOperation({ summary: 'Get Current User Info' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post('/updateBackground')
    updateBackgorund(@Request() req, @UploadedFile() image) {
        return this.usersService.updateBackground(req.user.id, image);
    }

    // @ApiOperation({ summary: 'Give a role to user' })
    // @ApiResponse({ status: 200 })
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    // @Post('/role')
    // addRole(@Body() dto: AddRoleDto) {
    //     return this.usersService.addRole(dto);
    // }

    // @ApiOperation({ summary: 'Ban a user' })
    // @ApiResponse({ status: 200 })
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    // @Post('/ban')
    // ban(@Body() dto: BanUserDto) {
    //     return this.usersService.ban(dto);
    // }
}
