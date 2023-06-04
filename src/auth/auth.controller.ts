import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('identity')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Login User' })
    @ApiResponse({ status: 200 })
    @Post('/signin')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({ summary: 'Register User' })
    @ApiResponse({ status: 200 })
    @Post('/signup')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
