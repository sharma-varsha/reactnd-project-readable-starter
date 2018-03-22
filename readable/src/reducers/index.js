import { combineReducers } from 'redux';
import Categories from './reducer_categories';
import Posts from './reducer_post';
import Comments from './reducer_comments';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    categories: Categories,
    posts:Posts,
    comments:Comments,
    form: formReducer
});

export default rootReducer;