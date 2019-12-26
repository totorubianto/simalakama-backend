import { Injectable } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { AdminRole } from '../global/enum/admin-role.enum';

@Injectable()
export class SeedService {
    constructor(
		private readonly adminsService: AdminsService,
	) {}

	async run() {
		console.log('Seeding admins...');
		this.seedAdmins();
	}

	async seedAdmins() {
		const obj = {
			firstName: 'Root',
			lastName: 'En',
			email: 'simakalama@gmail.com',
			phoneNumber: '083108222625',
			password: 'simalakama',
			passwordConfirmation: 'simalakama',
			pin: null,
			dateOfBirth: null,
			role: AdminRole.ROOT
		};
		this.adminsService.createOrUpdate({ email: obj.email }, obj);
	}
}
