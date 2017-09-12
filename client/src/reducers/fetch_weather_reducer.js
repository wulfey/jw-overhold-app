import { FETCH_WEATHER } from "../actions/types";

//state argument is not application state, it is the state for this reducer
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      console.log("insie case fetch weather reducer");
      console.log([action.payload.data, ...state]);
      // return state.concat([action.payload.data])
      const newWeather = action.payload.data;

      return [newWeather, ...state];
    default:
      return state;
  }
}
