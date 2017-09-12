import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import PostsReducer from "./posts_reducer";
import books from "./books_reducer";
import activeBook from "./active_book_reducer";
import WeatherReducer from "./fetch_weather_reducer";
import { reducer as formReducer } from "redux-form";
import TodoReducer from "./todo_reducer";
import visibilityFilter from "./visibilityFilter_reducer";

// import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  books: books,
  activeBook: activeBook,
  weather: WeatherReducer,
  form: formReducer,
  todos: TodoReducer,
  visibilityFilter: visibilityFilter
});
