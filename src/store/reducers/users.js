import { actionTypesUser } from '../actions/users';
// accessToken:
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUyNjA5M2I0YjVhMDE0NTQ5ZTgyODIiLCJpYXQiOjE1NzUxMjY3MTJ9.KV1z-8qJAGkLUa_EyMNzSbTrgMQunAiRvXv8PHn8AbA',
//   userId: '5de26093b4b5a014549e8282',

export const userReducer = (
  state = {
    accessToken: null,
    userId: null,
    name: null,
    email: null,
    isLoading: false,
    error: null,
    favTeam: 'None',
  },
  action
) => {
  switch (action.type) {
    case actionTypesUser.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload.token,
        userId: action.payload.userId,
      };
    case actionTypesUser.FETCH_USER_DETAILS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypesUser.FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        name: action.payload.data.username,
        email: action.payload.data.email,
      };
    case actionTypesUser.FETCH_USER_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.errMsg,
      };
    case actionTypesUser.SET_FAV_TEAM:
      return {
        ...state,
        favTeam: action.payload.team,
      };
    case actionTypesUser.SIGNOUT_USER:
      return {
        accessToken: null,
        userId: null,
        name: null,
        email: null,
        isLoading: false,
        error: null,
        favTeam: 'None',
      };
    default:
      return state;
  }
};
