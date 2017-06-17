import { Article } from '../article';
import { Author } from '../author';
export class Comment {
    constructor(
        public id?: number,
        public body?: any,
        public createdAt?: any,
        public updatedAt?: any,
        public article?: Article,
        public author?: Author,
    ) {
    }
}
