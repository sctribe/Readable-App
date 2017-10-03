import * as readableAPI from '../ReadableAPI';

export const GET_COMMENTS = 'GET_COMMENTS';
export const NEW_COMMENT = 'NEW_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export const getComments = data => ({
  type: GET_COMMENTS,
  data,
});

export const postComments = postId => dispatch =>
  readableAPI
    .postComments(postId)
    .then(comments => dispatch(getComments({ postId, comments })));

export const newComment = comment => ({
  type: NEW_COMMENT,
  comment,
});

export const addNewComment = commentData => dispatch =>
  readableAPI
    .addComment({ ...commentData, timestamp: Date.now() })
    .then(comment => dispatch(newComment(comment)));

export const editPostComment = comment => ({
  type: EDIT_COMMENT,
  comment,
});

export const getCommentForEdit = commentId => dispatch =>
  readableAPI
    .getComment(commentId)
    .then(comment => dispatch(editPostComment(comment)));



export const voteComment = data => dispatch =>
  readableAPI.voteComment(data).then(comment => dispatch(editPostComment(comment)));

export const editComment = data => dispatch =>
  readableAPI
    .editComment({ ...data, timestamp: Date.now() })
    .then(comment => dispatch(editPostComment(comment)));

export const deleteComment = commentId => dispatch =>
  readableAPI
    .deleteComment(commentId)
    .then(comment => dispatch(editPostComment(comment)));


