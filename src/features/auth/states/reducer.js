export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// Action creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const logout = () => ({ type: LOGOUT });

// Thunk login
import { loginUser } from "../api/authApi";
export const login = (form) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await loginUser(form);
    if (res.token) {
      dispatch(loginSuccess(res.user, res.token));
      localStorage.setItem("token", res.token);
    } else {
      dispatch(loginFailure(res.message || "Login gagal"));
    }
  } catch (err) {
    dispatch(loginFailure(err.message || "Terjadi kesalahan server"));
  }
};
