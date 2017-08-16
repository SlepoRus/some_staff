export const BOARD_REQUEST_STARTED = 'BOARD_REQUEST_STARTED';
export const BOARD_REQUEST_FINISHED = 'BOARD_REQUEST_FINISHED';
export const BOARD_REQUEST_ERROR = 'BOARD_REQUEST_ERROR';
import { github } from '../../client/api';

function boardRequestStarted(data) {
  return { type: BOARD_REQUEST_STARTED, data };
}

function boardRequestFinished(data ) {
  return { type: BOARD_REQUEST_FINISHED, data };
}

function boardRequestError(errors) {
  return { type: BOARD_REQUEST_ERROR, errors };
}
export function boardRequest(params) {
  return (dispatch, getState) => {
    dispatch(boardRequestStarted())

    return github.issue(params).then((val) => {
              const { data } = val;
              dispatch(boardRequestFinished(data));
           }).catch((err) => {
              dispatch(boardRequestError(err))
           })
  };
}
