const api = 'http://localhost:3001';

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Authorization: token,
  Accept: 'application/json'
};

export const categories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const posts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts);

export const postComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(comments => comments);

export const getPostsByCategory = category =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts);

export const addPost = postContent =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(postContent),
  })
    .then(res => res.json())
    .then(post => post);

export const votePost = data =>
  fetch(`${api}/posts/${data.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(post => post);

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(id),
  })
    .then(res => res.json())
    .then(post => post);

export const editPost = data =>
  fetch(`${api}/posts/${data.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(post => post);

export const getPost = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(post => post);

export const getComment = commentId =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(post => post);

export const addComment = commentData =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(commentData),
  })
    .then(res => res.json())
    .then(comment => comment);

export const voteComment = data =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(comment => comment);

export const editComment = data =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(comment => comment);

export const deleteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(commentId),
  })
    .then(res => res.json())
    .then(comment => comment);
