import { actionTypes } from '../actions/matches';

const initialMatches = {
  data: [],
  isLoading: false,
  error: null,
  count: 0,
};

const initialMatch = {
  data: {},
  isLoading: false,
  error: null,
};

export const matchesReducer = (state = initialMatches, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MATCHES_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case actionTypes.FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        data: action.payload.data.docs,
        count: action.payload.data.count,
        isLoading: false,
        error: null,
      };

    case actionTypes.FETCH_MATCHES_FAILED:
      return {
        ...state,
        error: action.payload.errMsg,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const matchReducer = (state = initialMatch, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MATCH_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.FETCH_MATCH_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        error: null,
      };
    case actionTypes.FETCH_MATCH_FAILED:
      return {
        ...state,
        error: action.payload.errMsg,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_TERM:
      return action.payload.data;
    default:
      return state;
  }
};

export const seasonFilterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case actionTypes.SET_SEASON_FILTER:
      return action.payload.data;
    default:
      return state;
  }
};

export const paginationReducer = (
  state = {
    currentPage: 1,
    matchesPerPage: 10,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.value,
      };

    default:
      return state;
  }
};
