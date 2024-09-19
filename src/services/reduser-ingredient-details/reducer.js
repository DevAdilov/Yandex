import { DELETE_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS } from "./action";

const initialState = {
  ingredientDetail: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredientDetail: action.payload,
      };
    case DELETE_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredientDetail: null,
      };

    default:
      return state;
  }
};
