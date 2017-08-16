import { ISSUES_REQUEST_STARTED,ISSUES_REQUEST_FINISHED,ISSUES_REQUEST_ERROR } from '../actions/issues';
const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ISSUES_REQUEST_STARTED:
      return {
        loading: true,
        errors: null,
        issues: {
          data: [],
          total_count: action.data.total_count,
        },
        limit: action.data.limit
      };
    case ISSUES_REQUEST_FINISHED:
      return {
        issues: action.data.issues,
        page: action.data.page,
        limit: action.data.limit,
        loading: false,
        errors: null,
      };
    case ISSUES_REQUEST_ERROR:
      return {
        loading: false,
        errors: action.errors
      };

    default:
      return state;
  }
}
