import { USER_REQUEST_STARTED,USER_REQUEST_FINISHED,USER_REQUEST_ERROR, USER_DELETE } from '../actions/user';
const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST_STARTED:
      return {
        loading: true,
        errors: null,
      };
    case USER_REQUEST_FINISHED:
      return {
        user: action.data,
        loading: false,
        errors: null,
      };
    case USER_REQUEST_ERROR:
      return {
        loading: false,
        errors: action.errors
      };
    case USER_DELETE:
      return {
        user: {}
      }
    default:
      return state;
  }
}
