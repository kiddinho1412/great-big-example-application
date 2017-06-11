import { Article } from '../article';
export class Tag {
    constructor(
        public id?: number,
        public name?: string,
        public article?: Article,
    ) {
    }
}
