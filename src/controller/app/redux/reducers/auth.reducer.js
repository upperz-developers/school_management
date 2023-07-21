import { LOADING, LOGIN, USERDATA } from "../actions/auth_type";

let user = localStorage.getItem("email");

// user = JSON.parse(user);

const initialeState = {
  isLoading: false,
  isSuccess: "",
  isError: "",
  newData: "",
  userData: "",
  newDataDash: "",
  user: user || null,
};

export const authReducer = (state = initialeState, actions) => {
  switch (actions.type) {
    case LOADING:
      return {
        ...state,
        ...actions.payload,
      };
    case USERDATA:
      return {
        ...state,
        ...actions.payload,
      };
    case LOGIN:
      return { ...state, user: actions.payload };
    default:
      return state;
  }
};
