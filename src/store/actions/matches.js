import * as api from '../../api/matches';

export const actionTypes = {
  FETCH_MATCHES_STARTED: 'FETCH_MATCHES_STARTED',
  FETCH_MATCHES_SUCCESS: 'FETCH_MATCHES_SUCCESS',
  FETCH_MATCHES_FAILED: 'FETCH_MATCHES_FAILED',
  FETCH_MATCH_STARTED: 'FETCH_MATCH_STARTED',
  FETCH_MATCH_SUCCESS: 'FETCH_MATCH_SUCCESS',
  FETCH_MATCH_FAILED: 'FETCH_MATCH_FAILED',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SEASON_FILTER: 'SET_SEASON_FILTER',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
};

export const fetchMatches = (
  searchTerm = '',
  filter = 'ALL',
  skip = 0,
  limit = 10
) => {
  return async (dispatch) => {
    dispatch(fetchMatchesStarted());
    try {
      let data = await api.fetchMatches(searchTerm, filter, skip, limit);

      dispatch(fetchMatchesSuccess(data));
    } catch (error) {
      console.log(error.message);
      dispatch(fetchMatchesFailed(error));
    }
  };
};

const fetchMatchesStarted = () => {
  return {
    type: actionTypes.FETCH_MATCHES_STARTED,
  };
};

const fetchMatchesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_MATCHES_SUCCESS,
    payload: {
      data,
    },
  };
};

const fetchMatchesFailed = (errMsg) => {
  return {
    type: actionTypes.FETCH_MATCHES_FAILED,
    payload: {
      errMsg,
    },
  };
};

export const fetchMatch = (matchId) => {
  return async (dispatch) => {
    dispatch(fetchMatchStarted());

    try {
      let data = await api.fetchMatchById(matchId);

      dispatch(fetchMatchSuccess(data));
    } catch (error) {
      console.log(error.message);
      dispatch(fetchMatchFailed(error));
    }
  };
};

const fetchMatchStarted = () => {
  return {
    type: actionTypes.FETCH_MATCH_STARTED,
  };
};

const fetchMatchSuccess = (data) => {
  return {
    type: actionTypes.FETCH_MATCH_SUCCESS,
    payload: {
      data,
    },
  };
};

const fetchMatchFailed = (errMsg) => {
  return {
    type: actionTypes.FETCH_MATCH_FAILED,
    payload: {
      errMsg,
    },
  };
};

export const setSearchTerm = (data) => {
  return {
    type: actionTypes.SET_SEARCH_TERM,
    payload: {
      data,
    },
  };
};

export const setSeasonFilter = (data) => {
  return {
    type: actionTypes.SET_SEASON_FILTER,
    payload: {
      data,
    },
  };
};

export const setCurrentPage = (value) => {
  return {
    type: actionTypes.SET_CURRENT_PAGE,
    payload: {
      value,
    },
  };
};
