import { REPO_REQUEST_STARTED,REPO_REQUEST_FINISHED,REPO_REQUEST_ERROR } from '../actions/repo';
const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REPO_REQUEST_STARTED:
      return {
        loading: true,
        errors: null,
      };
    case REPO_REQUEST_FINISHED:
      return {
        repo: action.data,
        loading: false,
        errors: null,
      };
    case REPO_REQUEST_ERROR:
      return {
        loading: false,
        errors: action.errors
      };

    default:
      return state;
  }
}
