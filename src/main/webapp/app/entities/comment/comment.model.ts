import { Article } from '../article';
import { UserCustom } from '../user-custom';
export class Comment {
    constructor(
        public id?: number,
        public body?: any,
        public createdAt?: any,
        public updatedAt?: any,
        public article?: Article,
        public author?: UserCustom,
    ) {
    }
}
