import { LOAD_INGREDIENT } from "../reducer-ingredient/action";

export const fetchDataMiddleware = () => {
  return (store) => {
    return (next) => {
      return (action) => {
        return next(action);
      };
    };
  };
};
