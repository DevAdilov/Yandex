import { CLEAR_BASKET, SORT_INGREDIENT } from "./action";
import { ADD_INGREDIENT_BUN } from "./action";
import { ADD_INGREDIENT_OTHER } from "./action";
import { DELETE_INGREDIENT } from "./action";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  bun: null,
  other: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_BUN:
      return {
        ...state,
        bun: action.payload,
      };
    case ADD_INGREDIENT_OTHER:
      return {
        ...state,
        other: [...state.other, { id: action.payload, uniqueId: uuidv4() }],
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        other: state.other.filter(
          (otheringredient, index) => index !== action.payload
        ),
      };
    case CLEAR_BASKET:
      return initialState;
    case SORT_INGREDIENT:
      return {
        ...state,
        other: action.payload,
      };
    default:
      return state;
  }
};
