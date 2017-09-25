import axios from 'axios';
import { FETCH_USER } from './types';
import { WEATHER_API_KEY } from './types';
import { WEATHER_ROOT_URL } from './types';
import { FETCH_WEATHER } from './types';
import { QUERY_BITTREX } from './types';
import { FETCH_POSTS } from './types';
import { CREATE_POST } from './types';
import { DELETE_POST } from './types';
import { GET_POST } from './types';
import { POSTS_ROOT_URL } from './types';
import { POSTS_API_KEY } from './types';

// v2 of THUNK action creator
// this is the best format for async request actions that aren't just fancy
// if and else things
export const fetchUserV2 = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const queryBittrex = () => async dispatch => {
  // console.log(' ---- in the query action');
  const res = await axios.get('/api/markets');
  dispatch({
    type: QUERY_BITTREX,
    payload: res.data
  });
};

// can reuse the same dispatch because we are just using the user
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripepayment', token);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export function fetchWeather(city) {
  const url = `${WEATHER_ROOT_URL}${city},us&appid=${WEATHER_API_KEY}`;

  // this request is a promise that is passed in as the payload
  const request = axios.get(url);
  console.log('inside the fetchWeather action');
  console.log(request);

  return {
    type: FETCH_WEATHER,
    payload: request
    // we are returning the PROMISE as the PAYLOAD
  };
}

// v1 of THUNK action creator
export const fetchUserV1 = () => {
  // if redux-THUNK sees a funcion returned, it will intervene
  // this will then be bounced to the reduces
  // this is needed because we don't know when this will be gotten ASYNC
  return function(dispatch) {
    axios.get('/api/current_user').then(res =>
      dispatch({
        type: FETCH_USER,
        payload: res
      })
    );
  };
};

// export default fetchUserV1;

// no redux THUNK version
// export function oldStyleFetchUser() {
//   const request = axios.get("/api/current_user");

//   //standard return of a POJO action with TYPE and PAYLOAD
//   return {
//     type: FETCH_USER,
//     payload: request
//   };
// }

export function fetchPosts() {
  const url = `${POSTS_ROOT_URL}/posts${POSTS_API_KEY}`;
  const request = axios.get(url);

  return {
    type: FETCH_POSTS,
    payload: request
    // we are returning the PROMISE as the PAYLOAD
  };
}

export function getPost(postID) {
  const url = `${POSTS_ROOT_URL}/posts/${postID}${POSTS_API_KEY}`;
  const request = axios.get(url);
  // console.log("inside the action: request");
  // console.log(request);
  return {
    type: GET_POST,
    payload: request
    // we are returning the PROMISE as the PAYLOAD
  };
}

export function deletePost(postID, callback) {
  const url = `${POSTS_ROOT_URL}/posts/${postID}${POSTS_API_KEY}`;
  axios.delete(url).then(() => callback());
  // console.log("inside the action: request");
  // console.log(request);
  return {
    type: DELETE_POST,
    payload: postID
    // we are returning the PROMISE as the PAYLOAD
  };
}

export function createPost(values, callback) {
  const url = `${POSTS_ROOT_URL}/posts${POSTS_API_KEY}`;
  const request = axios.post(url, values).then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
    // we are returning the PROMISE as the PAYLOAD
  };
}

export function selectBook(book) {
  // selectBOok should be an action creator that returns a POJO, simple one preferred
  console.log('Book has been sleected:', book.title);
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}
