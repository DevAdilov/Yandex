import { useState } from "react";
import styles from "./burgerconstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../modal/orderdetails";
import PropTypes from "prop-types";

BurgerConstructor.propTypes = {
  propsDataValue: PropTypes.array.isRequired,
};

function BurgerConstructor({ propsDataValue }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }
  return (
    <>
      <div className={styles.burgerConstructorBlock}>
        <div className={styles.burgerConstructorContainer}>
          <div className={styles.burgerConstructorBlockContent}>
            {propsDataValue
              ? propsDataValue.map((datavalue, index) => (
                  <div
                    key={datavalue._id}
                    className={styles.burgerConstructorElement}
                  >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      type={
                        index === 0
                          ? "top"
                          : index + 1 === propsDataValue.length
                          ? "bottom"
                          : false
                      }
                      isLocked={true}
                      text={datavalue.name}
                      price={datavalue.price}
                      thumbnail={datavalue.image}
                    />
                  </div>
                ))
              : false}
          </div>
        </div>
        <div className={styles.finalPriceBlock}>
          <div className={styles.finalPriceItem}>
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => handleOpenModal()}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <OrderDetails OrderDetails={propsDataValue} />
      </Modal>
    </>
  );
}

export default BurgerConstructor;
