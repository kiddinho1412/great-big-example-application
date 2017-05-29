import { Profile } from '../profile/profile.model';

export interface Article {
    id: string;
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: Array<string>;
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}

export const initialArticle = {
    id: null,
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: null
};
