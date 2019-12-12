import {createSelector} from 'reselect';

export const getList = state => state.repository.list;
export const getFilteredList = state => state.repository.filteredList;
export const getTerm = state => state.repository.term;
export const getLoading = state => state.repository.loading;

export const getFilteredRepos = createSelector(
  [getList, getTerm],
  (repos, term) =>
    repos.filter(
      repo =>
        repo.name.indexOf(term) > -1 || repo.full_name.indexOf(term) > -1,
    ),
);
