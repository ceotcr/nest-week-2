import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get("/:id/role/:role")
    async getUserByIdAndRole(@Param('id', ParseIntPipe) id: string, @Param('role') role: string) {
        return this.usersService.getUserByIdAndRole(id, role);
    }
}
