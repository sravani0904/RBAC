import {
  SET_ERRORS,
  PARENT_LOGIN,
  UPDATE_PASSWORD,
  UPDATE_PARENT,
  CHILD_ATTENDANCE,
  CHILD_RESULTS,
} from "../actionTypes";
import * as api from "../api";

export const parentSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.parentSignIn(formData);
    dispatch({ type: PARENT_LOGIN, data });
    if (data.result.passwordUpdated) navigate("/parent/home");
    else navigate("/parent/password");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const parentSignup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.parentSignup(formData);
    dispatch({ type: PARENT_LOGIN, data });
    navigate("/parent/home");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const parentUpdatePassword = (formData, navigate) => async (dispatch) => {
  try {
    await api.parentUpdatePassword(formData);
    dispatch({ type: UPDATE_PASSWORD, payload: true });
    alert("Password Updated");
    navigate("/parent/home");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateParent = (formData) => async (dispatch) => {
  try {
    await api.updateParent(formData);
    dispatch({ type: UPDATE_PARENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getChildAttendance = (studentId) => async (dispatch) => {
  try {
    const { data } = await api.getChildAttendance({ studentId });
    dispatch({ type: CHILD_ATTENDANCE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getChildResults = (studentId) => async (dispatch) => {
  try {
    const { data } = await api.getChildResults({ studentId });
    dispatch({ type: CHILD_RESULTS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};


