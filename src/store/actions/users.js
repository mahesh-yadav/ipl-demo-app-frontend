import * as userApi from '../../api/users';

export const actionTypesUser = {
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  FETCH_USER_DETAILS_STARTED: 'FETCH_USER_DETAILS_STARTED',
  FETCH_USER_DETAILS_SUCCESS: 'FETCH_USER_DETAILS_SUCCESS',
  FETCH_USER_DETAILS_FAILED: 'FETCH_USER_DETAILS_FAILED',
  SET_FAV_TEAM: 'SET_FAV_TEAM',
  SIGNOUT_USER: 'SIGNOUT_USER',
};

export const setAccessTokenId = (token, userId) => {
  return {
    type: actionTypesUser.SET_ACCESS_TOKEN,
    payload: {
      token,
      userId,
    },
  };
};

export const fetchUserDetails = (userId, token) => {
  return async (dispatch) => {
    dispatch(fetchUserDetailsStarted());

    try {
      let data = await userApi.getUserDetails(userId, token);

      dispatch(fetchUserDetailsSuccess(data));
    } catch (error) {
      console.log(error.message);
      dispatch(fetchUserDetailsFailed(error));
    }
  };
};

const fetchUserDetailsStarted = () => {
  return {
    type: actionTypesUser.FETCH_USER_DETAILS_STARTED,
  };
};

const fetchUserDetailsSuccess = (data) => {
  return {
    type: actionTypesUser.FETCH_USER_DETAILS_SUCCESS,
    payload: {
      data,
    },
  };
};

const fetchUserDetailsFailed = (errMsg) => {
  return {
    type: actionTypesUser.FETCH_USER_DETAILS_FAILED,
    payload: {
      errMsg,
    },
  };
};

export const setFavTeam = (team) => {
  return {
    type: actionTypesUser.SET_FAV_TEAM,
    payload: {
      team,
    },
  };
};

export const signout = () => {
  return {
    type: actionTypesUser.SIGNOUT_USER,
  };
};
