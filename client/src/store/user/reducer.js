import {
  SET_USER_DATA,
  LOGOUT,
  MESSAGE_USER,
  MESSAGE_CLEARING
} from './actionTypes';

const userInitialState = {
  isAuthenticated: false,
  error: null,
  _id: '',
  name: '',
  email: '',
  isAdmin: false,
  basket: [],
  favorites: []
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        error: null
      };

    case LOGOUT:
      return userInitialState;

    case MESSAGE_USER:
      return {
        ...state,
        message: action.payload.message,
        messageType: action.payload.messageType
      };

    case MESSAGE_CLEARING:
      return {
        ...state,
        message: null,
        messageType: ''
      };

    default:
      return state;
  }
};

export default userReducer;
