import { combineReducers } from 'redux';
import categoriesReducer from '../reducers/categoriesReducer';
import postsReducer from '../reducers/postsReducer';

export default combineReducers({ categoriesReducer, postsReducer });
