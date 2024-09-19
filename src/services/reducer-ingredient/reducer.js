import { ADD_COUNT, LOAD_INGREDIENT } from "./action";

const initialState = {
  ingredientLoad: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INGREDIENT:
      return {
        ...state,
        ingredientLoad: action.payload,
      };
    case ADD_COUNT:
      return {
        ...state,
        ingredientLoad: state.ingredientLoad.map((ingredient) =>
          ingredient._id === action.payload._id
            ? { ...ingredient, __v: ingredient.__v + action.payload.__v }
            : ingredient
        ),
      };
    default:
      return state;
  }
};
