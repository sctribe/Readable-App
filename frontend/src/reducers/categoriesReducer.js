import { GET_CATEGORIES } from '../actions/categories';

const initialState = []

function reduceCategories(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return [...state, ...action.categories];
    default:
      return state;
  }
}

export default reduceCategories;
