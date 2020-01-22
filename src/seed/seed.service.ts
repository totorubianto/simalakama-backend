import { Injectable } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { AdminRole } from '../global/enum/admin-role.enum';
import * as emoji from 'node-emoji'

@Injectable()
export class SeedService {
    constructor(private readonly adminsService: AdminsService) {}

    async run() {
        console.log(emoji.get('coffee'), "Seeding User");
        this.seedAdmins();
    }

    async seedAdmins() {
        const obj = {
            firstName: 'Simalakama',
            lastName: 'root',
            email: 'simalakama@gmail.com',
            phoneNumber: '083108222625',
            password: 'simalakama',
            passwordConfirmation: 'simalakama',
            dateOfBirth: null,
            role: AdminRole.ROOT,
        };
        this.adminsService.createOrUpdate({ email: obj.email }, obj);
    }
}
