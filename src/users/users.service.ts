import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    mockAdminUser = {
        name: 'Admin User',
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
    };
    mockRegularUser = {
        name: 'Regular User',
        role: 'user',
        permissions: ['read'],

    };

    getUserByIdAndRole(id: string, role: string) {
        if (role === 'admin') {
            return {
                id,
                ...this.mockAdminUser
            };
        } else if (role === 'user') {
            return {
                id,
                ...this.mockRegularUser
            };
        } else {
            throw new NotFoundException('User not found');
        }
    }
}
