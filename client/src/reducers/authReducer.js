import { FETCH_USER } from "../actions/types";

//state argument is not application state, it is the state for this reducer
export default function(state = null, action) {
  // console.log("In the reducer");
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
