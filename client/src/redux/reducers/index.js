import { combineReducers } from 'redux';
import auth from './auth';
import report from './report';
import user from './user';
import alert from './alert';
import navigation from './navigation';

export default combineReducers({
  auth,
  report,
  user,
  alert,
  navigation,
});
