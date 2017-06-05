import { createSelector } from 'reselect';

import { initialTag } from './tag.model';
import { Entities, initialEntities } from '../entity/entity.model';
import { slices } from '../util';
import * as functions from '../slice/slice.functions';
import { typeFor } from '../util';
import { actions, SliceAction } from '../slice/slice.actions';

export function reducer(state: string[] = [],
    action: SliceAction): string[] {

    switch (action.type) {
        case typeFor(slices.TAG, actions.LOAD):
            return functions.load(state, action);
        case typeFor(slices.TAG, actions.LOAD_SUCCESS):
            return functions.loadSuccess(state, action);
        case typeFor(slices.TAG, actions.LOAD_FAIL):
            return functions.loadFail(state);
        case typeFor(slices.TAG, actions.UPDATE):
            return functions.update(state, action);
        default:
            return state;
    }
};
