import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/entity/user';
import { Role } from 'src/enum/role.enum';
import { FilterHelper } from 'src/helper/filterHelper';
import { UserService } from 'src/services/user.service';

@Roles(Role.Admin)
@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const res = await this.userService.getAll();
    return res;
  }

  @Post('getAllFilter')
  async getFilter(@Body() user: FilterHelper<User>) {
    const res = await this.userService.getAllByFilter(user);
    return res;
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const res = await this.userService.get(id);
    return res;
  }

  @Post()
  async add(@Body() user: User) {
    const res = await this.userService.add(user);
    return res;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const res = await this.userService.deleteById(id);
    return res;
  }

  @Put()
  async update(@Body() user: User) {
    const res = await this.userService.updateEntity(user);
    return res;
  }
}
