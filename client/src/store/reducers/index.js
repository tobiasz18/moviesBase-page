import { combineReducers } from "redux";
import articles from './articles_reducer';
import categories from './categories_reducer';
import users from './users_reducer';
import site from './site_reducer';
import notifications from './notifications_reducer';

const appReducers = combineReducers({
  articles,
  users,
  site,
  categories,
  notifications
})

export default appReducers;