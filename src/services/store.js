import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./reducer";

// 1 var import { fetchDataMiddleware } from "./middleware/thunkMiddleware";
import { thunk } from "redux-thunk";

export const getStore = (initialState) => {
  //const middleware = [thunkMiddleware];

  const store = createStore(
    rootReducer,
    initialState,
    // 1 var composeWithDevTools(applyMiddleware(fetchDataMiddleware()))
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
