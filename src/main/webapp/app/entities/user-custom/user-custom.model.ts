import { User } from '../../shared';
export class UserCustom {
    constructor(
        public id?: number,
        public bio?: any,
        public user?: User,
        public follower?: UserCustom,
        public followee?: UserCustom,
    ) {
    }
}
