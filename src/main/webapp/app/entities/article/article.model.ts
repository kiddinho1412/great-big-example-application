import { User } from '../../shared';
import { Tag } from '../tag';
export class Article {
    constructor(
        public id?: number,
        public slug?: string,
        public title?: string,
        public description?: string,
        public body?: any,
        public createdAt?: any,
        public updatedAt?: any,
        public author?: User,
        public tag?: Tag,
    ) {
    }
}
