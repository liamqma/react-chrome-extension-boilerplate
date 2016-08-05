import { combineReducers } from 'redux';
import todos from './todos';
import notification from './notification';

export default combineReducers({
    todos,
    notification
});
