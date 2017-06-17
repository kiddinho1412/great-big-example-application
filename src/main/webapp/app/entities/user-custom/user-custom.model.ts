import { User } from '../../shared';
import { Article } from '../article';
import { Comment } from '../comment';
export class UserCustom {
    constructor(
        public id?: number,
        public bio?: any,
        public user?: User,
        public article?: Article,
        public comment?: Comment,
        public follower?: UserCustom,
        public favorite?: Article,
        public followee?: UserCustom,
    ) {
    }
}
