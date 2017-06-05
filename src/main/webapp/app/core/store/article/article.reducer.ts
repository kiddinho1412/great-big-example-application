import { createSelector } from 'reselect';

import { Article, initialArticle } from './article.model';
import { Entities, initialEntities } from '../entity/entity.model';
import { slices } from '../util';
import * as functions from '../entity/entity.functions';
import { typeFor } from '../util';
import { actions, EntityAction } from '../entity/entity.actions';

export function reducer(state: Entities<Article> = initialEntities<Article>({}, slices.ARTICLE, actions, initialArticle),
    action: EntityAction<Article>): Entities<Article> {

    switch (action.type) {
        case typeFor(slices.ARTICLE, actions.ADD_SUCCESS):
            return functions.addSuccess<Article>(state, <any>action);
        case typeFor(slices.ARTICLE, actions.ADD_TEMP):
        case typeFor(slices.ARTICLE, actions.LOAD_SUCCESS):
            return functions.addToStore<Article>(state, <any>action);
        case typeFor(slices.ARTICLE, actions.UPDATE):
        case typeFor(slices.ARTICLE, actions.UPDATE_SUCCESS):
            return functions.update<Article>(state, <any>action);
        case typeFor(slices.ARTICLE, actions.DELETE):
            return functions.deleteEntity<Article>(state, <any>action);
        case typeFor(slices.ARTICLE, actions.DELETE_TEMP):
            return functions.deleteTemp<Article>(state, <any>action);
        case typeFor(slices.ARTICLE, actions.SELECT):
            return functions.select<Article>(state, <any>action);
        case typeFor(slices.ARTICLE, actions.SELECT_NEXT):
            return functions.selectNext<Article>(state, <any>action);
        default:
            return state;
    }
};

export const getEntities = (state: Entities<Article>): { [id: string]: Article } => state.entities;

export const getIds = (state: Entities<Article>): string[] => state.ids;

export const getSelectedId = (state: Entities<Article>): string => state.selectedEntityId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});
