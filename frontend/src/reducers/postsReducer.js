import {
  GET_POSTS,
  NEW_POST,
  EDIT_POST } from '../actions/posts';

import {
  GET_COMMENTS,
  NEW_COMMENT,
  EDIT_COMMENT,
} from '../actions/comments';


function fullPost(post, comments = []) {
  return { comments, ...post };
}

function postsReducer(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.posts.map(post => fullPost(post));
    case NEW_POST:
      return [...state, fullPost(action.post)];
    case EDIT_POST:
      if (action.post.deleted) {
        return state.filter(post => post.id !== action.post.id);
      }

      if (state.length === 0) {
        return [fullPost(action.post)];
      }

      return state.map(
        post =>
          post.id === action.post.id
            ? fullPost(action.post, post.comments)
            : post,
      );
    case GET_COMMENTS:
      return state.map(
        post =>
          post.id === action.data.postId
            ? { ...post, comments: action.data.comments }
            : post,
      );
    case NEW_COMMENT:
      return state.map(
        post =>
          post.id === action.comment.parentId
            ? { ...post, comments: [...post.comments, action.comment] }
            : post,
      );
    case EDIT_COMMENT:
      return state.map(post => {
        if (post.id !== action.comment.parentId) {
          return post;
        }

        if (!post.comments.length) {
          return { ...post, comments: [action.comment] };
        }

        if (action.comment.deleted) {
          return {
            ...post,
            comments: post.comments.filter(
              comment => comment.id !== action.comment.id,
            ),
          };
        }

        return {
          ...post,
          comments: post.comments.map(
            comment =>
              comment.id === action.comment.id ? action.comment : comment,
          ),
        };
      });
    default:
      return state;
  }
}

export default postsReducer;
