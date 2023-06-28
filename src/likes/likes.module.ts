import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/post/post.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Likes } from './likes.model';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [
    SequelizeModule.forFeature([Post, User, Likes]),
    AuthModule,
    JwtModule,
  ],
})
export class LikesModule { }
