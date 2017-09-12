import { GET_POST, FETCH_POSTS, DELETE_POST } from "../actions/types";

import _ from "lodash";

//state argument is not application state, it is the state for this reducer
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // console.log(_.mapKeys(action.payload.data, 'id'));
      // return state.concat([action.payload.data])
      return _.mapKeys(action.payload.data, "id");
    case GET_POST:
      // console.log(_.mapKeys(action.payload.data, 'id'));
      // return state.concat([action.payload.data])
      // const post = action.payload.data

      // console.log(post);
      // ES5
      // const newState = {...state};
      // newState[post.id] = post;
      // return newSTate;

      return { ...state, [action.payload.data.id]: action.payload.data };
    case DELETE_POST:
      return _.omit(state, action.payload);

    default:
      return state;
  }
}
