import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
    async create(body) {
        return { hallo: "as" }
    }
}
