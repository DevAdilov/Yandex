import { combineReducers } from "redux";
import { reducer as reducerConstructor } from "./reducer-constructor/reducer";
import { reducer as reducerIngredient } from "./reducer-ingredient/reducer";
import { reducer as reducerIngredientDetails } from "./reduser-ingredient-details/reducer";
import { reducer as reducerOrderDetails } from "./reducer-order-details/reducer";

export const rootReducer = combineReducers({
  constructorRootReducer: reducerConstructor,
  ingredientRootReducer: reducerIngredient,
  IngredientDetailsRootReducer: reducerIngredientDetails,
  reducerOrderDetailsRootReducer: reducerOrderDetails,
});
