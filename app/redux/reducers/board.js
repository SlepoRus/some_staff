import { BOARD_REQUEST_STARTED,BOARD_REQUEST_FINISHED,BOARD_REQUEST_ERROR } from '../actions/board';
const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BOARD_REQUEST_STARTED:
      return {
        loading: true,
        errors: null,
      };
    case BOARD_REQUEST_FINISHED:
      return {
        board: action.data,
        loading: false,
        errors: null,
      };
    case BOARD_REQUEST_ERROR:
      return {
        loading: false,
        errors: action.errors
      };
    default:
      return state;
  }
}
