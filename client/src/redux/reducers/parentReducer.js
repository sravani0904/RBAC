import {
  PARENT_LOGIN,
  UPDATE_PARENT,
  UPDATE_PASSWORD,
  CHILD_ATTENDANCE,
  CHILD_RESULTS,
} from "../actionTypes";

const parentReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case PARENT_LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case UPDATE_PARENT:
      return { ...state, updated: true };
    case UPDATE_PASSWORD:
      return { ...state, updatedPassword: true };
    case CHILD_ATTENDANCE:
      return { ...state, attendance: action.payload };
    case CHILD_RESULTS:
      return { ...state, results: action.payload };
    default:
      return state;
  }
};

export default parentReducer;


