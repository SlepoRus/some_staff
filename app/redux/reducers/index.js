import { combineReducers } from 'redux';
import user from './user';
import repo from './repo';
import issues from './issues';
import board from './board';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default combineReducers({
  user, repo, issues, board,
  routing: routerReducer
});
