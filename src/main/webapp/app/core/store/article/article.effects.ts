import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { Article } from './article.model';
import { slices } from '../util';
import { RESTService } from '../../services/rest.service';
import * as entityFunctions from '../entity/entity.functions';
import * as sliceFunctions from '../slice/slice.functions';
import { typeFor } from '../util';
import { actions, EntityAction } from '../entity/entity.actions';
import { articleActions } from './article.actions';
import { SliceAction } from '../slice/slice.actions';
import * as EntityActions from '../entity/entity.actions';
import * as ArticleActions from '../article/article.actions';
import { initialBlogPageLayout } from '../../../features/blog/blog.layout';

@Injectable()
export class ArticleEffects {
    @Effect()
    private loadFromRemote$ = entityFunctions.loadFromRemote$(this.actions$, slices.ARTICLE, this.dataService);
    @Effect()
    private updateToRemote$ = entityFunctions.updateToRemote$(this.actions$, slices.ARTICLE, this.dataService, this.store);
    @Effect()
    private addToRemote$ = entityFunctions.addToRemote$(this.actions$, slices.ARTICLE, this.dataService, this.store);

    @Effect()
    // export function loadFromRemote$(actions$: Actions, slice: string, dataService): Observable<Action> {
    private loadForQueryFromRemote = this.actions$
        .ofType(typeFor(slices.LAYOUT, actions.UPDATE))
        .filter((action: SliceAction) => action.payload.filters)   // TODO: make this a better test for this being the blog page layout
        .switchMap(() =>
            this.dataService.getEntities(slices.ARTICLE)
                .mergeMap((fetchedEntities) => Observable.from(fetchedEntities))
                .map((fetchedEntity) => new EntityActions.LoadSuccess(slices.ARTICLE, fetchedEntity))  // one action per entity
                .catch((err) => {
                    console.log(err);
                    return Observable.of(new EntityActions.AddUpdateFail(slices.ARTICLE, null));
                })
        );

    @Effect()
    private postFavorite$ = sliceFunctions.postToRemote$(this.actions$, slices.ARTICLE, this.dataService, articleActions.FAVORITE, ArticleActions.FavoriteSuccess, ArticleActions.FavoriteFail);

    constructor(
        private store: Store<Article>,
        private actions$: Actions,
        private dataService: RESTService
    ) { }
}
