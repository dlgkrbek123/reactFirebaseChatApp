import { SET_USER } from "../actions/user";

const initialState = {
  currentUser: null,
  isLoading: true,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default user;
