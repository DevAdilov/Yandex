import checkResponse from "../../utils/check/check-Response";
import { BASE_URL } from "../../utils/const/const";
import { CLEAR_BASKET } from "../reducer-constructor/action";

export const ORDER_DETAILS = "ORDER_DETAILS";

export const orderСreationAction = (curentIngredients) => (dispatch) => {
  const apiUrl = BASE_URL + "/orders";
  const dataToSend = {
    ingredients: curentIngredients,
  };

  console.log("asd", dataToSend);

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then(checkResponse)
    .then((data) => {
      dispatch({ type: ORDER_DETAILS, payload: data.order.number });
      dispatch({ type: CLEAR_BASKET });
    })
    .catch((error) => console.error("Error:", error));
};
