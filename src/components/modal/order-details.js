import { useSelector } from "react-redux";
import styles from "./modal.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails() {
  const orderNumDetails = useSelector(
    (store) => store.reducerOrderDetailsRootReducer.ingredientOrder
  );

  return (
    <>
      {orderNumDetails ? (
        <div className={styles.orderDetails}>
          <div className={styles.order}>
            <p className="text text_type_digits-large">{orderNumDetails}</p>
          </div>
          <p className="text text_type_main-medium">Идинтефикатор заказа</p>
          <CheckMarkIcon type="primary" />
          <div className={styles.orderDetailsInfo}>
            <p className="text text_type_main-small">
              Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Дождитесь готовности на орбитральной станции
            </p>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
}
export default OrderDetails;
