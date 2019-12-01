import { createStore, applyMiddleware } from 'redux';
import {
  matchesReducer,
  matchReducer,
  searchReducer,
  seasonFilterReducer,
  paginationReducer,
} from './reducers/matches';
import { userReducer } from './reducers/users';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = (state = {}, action) => {
  return {
    matches: matchesReducer(state.matches, action),
    match: matchReducer(state.match, action),
    searchTerm: searchReducer(state.searchTerm, action),
    seasonFilter: seasonFilterReducer(state.seasonFilter, action),
    pagination: paginationReducer(state.pagination, action),
    user: userReducer(state.user, action),
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
