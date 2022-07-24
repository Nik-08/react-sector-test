import { createSelector, Selector } from 'reselect';

export const state: Selector<AppState, AppState['posts']> = $state =>
  $state.posts;

export const items = createSelector([state], $state => $state.items);
export const loading = createSelector([state], $state => $state.loading);
export const error = createSelector([state], $state => $state.error);
export const total = createSelector([state], $state => $state.total);
export const limit = createSelector([state], $state => $state.limit);
