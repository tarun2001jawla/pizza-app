import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
  
})
export class UserModule {}