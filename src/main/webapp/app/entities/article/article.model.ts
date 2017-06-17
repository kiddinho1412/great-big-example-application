import { Comment } from '../comment';
import { Tag } from '../tag';
import { Author } from '../author';
export class Article {
    constructor(
        public id?: number,
        public slug?: string,
        public title?: string,
        public description?: string,
        public body?: any,
        public createdAt?: any,
        public updatedAt?: any,
        public comment?: Comment,
        public tag?: Tag,
        public author?: Author,
        public favoriter?: Author,
    ) {
    }
}
