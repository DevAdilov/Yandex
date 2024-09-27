import { ORDER_DETAILS } from "./action";

const initialState = {
  ingredientOrder: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS:
      return {
        ...state,
        ingredientOrder: action.payload,
      };
    default:
      return state;
  }
};
