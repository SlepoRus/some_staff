export const USER_REQUEST_STARTED = 'USER_REQUEST_STARTED';
export const USER_REQUEST_FINISHED = 'USER_REQUEST_FINISHED';
export const USER_REQUEST_ERROR = 'USER_REQUEST_ERROR';
export const USER_DELETE = 'USER_DELETE';
import { github } from '../../client/api';

function userRequestStarted() {
  return { type: USER_REQUEST_STARTED };
}

function userRequestFinished(data ) {
  return { type: USER_REQUEST_FINISHED, data };
}

function userRequestError(errors) {
  return { type: USER_REQUEST_ERROR, errors };
}
function userRequestDelete() {
  return { type: USER_DELETE };
}

export function userRequest(text,callback) {
    return (dispatch, getState) => {
      dispatch(userRequestStarted())
      return github.user(text).then((val) => {
         let user  = val.data;
         dispatch(userRequestFinished(user));
         callback(user);
       }).catch((errors) => {
         callback({ login: ''})
         dispatch(userRequestError(errors));
       })
    };
}

export function userDelete() {
  return (dispatch) => {
    return dispatch(userRequestDelete())
  }
}
