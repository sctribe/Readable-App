import * as readableAPI from '../ReadableAPI';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories,
});

export const fetchCategories = () => dispatch =>
  readableAPI.categories().then(categories => dispatch(getCategories(categories)));
