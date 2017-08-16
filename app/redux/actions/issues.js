export const ISSUES_REQUEST_STARTED = 'ISSUES_REQUEST_STARTED';
export const ISSUES_REQUEST_FINISHED = 'ISSUES_REQUEST_FINISHED';
export const ISSUES_REQUEST_ERROR = 'ISSUES_REQUEST_ERROR';
import { github } from '../../client/api';

function issueRequestStarted(data) {
  return { type: ISSUES_REQUEST_STARTED, data };
}

function issueRequestFinished(data ) {
  return { type: ISSUES_REQUEST_FINISHED, data };
}

function issueRequestError(errors) {
  return { type: ISSUES_REQUEST_ERROR, errors };
}
export function issueRequest( full_name , page, limit, total_count) {
  return (dispatch, getState) => {
    dispatch(issueRequestStarted({total_count, limit}))

    return github.issues({ full_name }, page, limit).then((val) => {
      const issues = {}
      issues.data = val.data.items;
      issues.total_count = val.data.total_count;
      if (issues.data.length) dispatch(issueRequestFinished({ issues, page, limit }));
      else dispatch(issueRequestError({response: { status: 404 } }))
    }).catch((errors) => {
      dispatch(issueRequestError(errors));
    })
  };
}
