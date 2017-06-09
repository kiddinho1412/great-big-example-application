import { actions, SliceAction } from '../slice/slice.actions';
import { Article } from './article.model';

export const articleActions = {
    FAVORITE: 'FAVORITE',
    FAVORITE_SUCCESS: 'FAVORITE_SUCCESS',
    FAVORITE_FAIL: 'FAVORITE_FAIL'
}

export class Favorite extends SliceAction {
    protected actionName: string = articleActions.FAVORITE;
}

export class FavoriteSuccess extends SliceAction {
    protected actionName: string = articleActions.FAVORITE_SUCCESS;
}

export class FavoriteFail extends SliceAction {
    protected actionName: string = articleActions.FAVORITE_FAIL;
}
