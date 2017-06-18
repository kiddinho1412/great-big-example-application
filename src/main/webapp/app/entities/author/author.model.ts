import { User } from '../../shared';
import { Article } from '../article';
import { Comment } from '../comment';
export class Author {
    constructor(
        public id?: number,
        public bio?: any,
        public user?: User,
        public article?: Article,
        public comment?: Comment,
        public follower?: Author,
        public favorite?: Article,
        public followee?: Author,
    ) {
    }
}
