import { configureStore } from "@reduxjs/toolkit";
import { repositoriesReducer } from "./slices";

export default configureStore({
  reducer: {
    repositories: repositoriesReducer,
  },
});
