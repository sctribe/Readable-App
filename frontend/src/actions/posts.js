import * as readableAPI from '../ReadableAPI';
import { postComments } from './comments';

export const GET_POSTS = 'GET_POSTS';
export const NEW_POST = 'NEW_POST';
export const EDIT_POST = 'EDIT_POST';

export const getPosts = posts => ({
  type: GET_POSTS,
  posts,
});

export const posts = category => dispatch => {
  const promise = category ? readableAPI.getPostsByCategory(category) : readableAPI.posts();
  promise.then(posts => {
    dispatch(getPosts(posts));
    posts.forEach(post => dispatch(postComments(post.id)));
  });
};

export const newPost = post => ({
  type: NEW_POST,
  post,
});

export const addPost = postData => dispatch =>
  readableAPI
    .addPost({
      ...postData,
      timestamp: Date.now(),
    })
    .then(post => dispatch(newPost(post)));

export const editPost = post => ({
  type: EDIT_POST,
  post,
});

export const getPost = postId => dispatch => {
  readableAPI.getPost(postId).then(post => {
    dispatch(editPost(post));
    dispatch(postComments(post.id));
  });
};

export const votePost = data => dispatch =>
  readableAPI.votePost(data).then(post => dispatch(editPost(post)));

export const deletePost = postId => dispatch =>
  readableAPI.deletePost(postId).then(post => dispatch(editPost(post)));

export const editPostContent = data => dispatch =>
  readableAPI.editPost(data).then(post => dispatch(editPost(post)));


