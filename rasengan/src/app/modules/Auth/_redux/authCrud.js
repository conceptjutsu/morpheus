import axios from "axios";


export const SERVER_ROOT="http://localhost:5000/";


//export const LOGIN_URL = "api/auth/login";
export const LOGIN_URL = SERVER_ROOT + "api/v1/users/login";

export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

//export const ME_URL = "api/me";
export const ME_URL = SERVER_ROOT + "api/v1/users/me";

export function login(email, password) {
  console.log ( LOGIN_URL);
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
