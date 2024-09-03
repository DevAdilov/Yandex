import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails() {
  return (
    <>
      <div className="order-details">
        <p className="text text_type_digits-large order">034536</p>
        <p className="text text_type_main-medium">Идинтефикатор заказа</p>
        <CheckMarkIcon type="primary" />
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитральной станции
        </p>
      </div>
    </>
  );
}
export default OrderDetails;
