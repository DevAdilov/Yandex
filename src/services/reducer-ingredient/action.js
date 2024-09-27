import checkResponse from "../../utils/check/check-Response";
import { BASE_URL } from "../../utils/const/const";

export const LOAD_INGREDIENT = "LOAD_INGREDIENT";
export const ADD_COUNT = "ADD_COUNT";

export const loadData = () => (dispatch) => {
  const arrayApi = BASE_URL + "/ingredients";
  fetch(arrayApi)
    .then(checkResponse)
    .then((data) => {
      dispatch({ type: LOAD_INGREDIENT, payload: data.data });
    })
    .catch((error) => console.error("Error:", error));
};
