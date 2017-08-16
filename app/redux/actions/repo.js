export const REPO_REQUEST_STARTED = 'REPO_REQUEST_STARTED';
export const REPO_REQUEST_FINISHED = 'REPO_REQUEST_FINISHED';
export const REPO_REQUEST_ERROR = 'REPO_REQUEST_ERROR';
import { github } from '../../client/api';

function repoRequestStarted() {
  return { type: REPO_REQUEST_STARTED };
}

function repoRequestFinished(data ) {
  return { type: REPO_REQUEST_FINISHED, data };
}

function repoRequestError(errors) {
  return { type: REPO_REQUEST_ERROR, errors };
}
export function repoRequest(user, text, callback) {
  return (dispatch, getState) => {
    dispatch(repoRequestStarted())
    return github.repo(user, text).then((val) => {
       let repo  = val.data;
       dispatch(repoRequestFinished(repo));
       callback(repo);
     }).catch((errors) => {
       callback({ full_name: user.login});
       dispatch(repoRequestError(errors));
     })
  };
}
