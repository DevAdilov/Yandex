import { useEffect, useState } from "react";
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
  const [bun, setbun] = useState([]);

  const bunFilter = () => {
    const filteredBun = propsDataValue.filter((item) => item.type === "bun");

    setbun(filteredBun);
  };

  useEffect(() => {
    bunFilter();
  }, [propsDataValue]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }
  return (
    <>
      <div className={styles.burgerConstructorBlock}>
        <div className={styles.burgerConstructorContainer}>
          <div className={styles.burgerConstructorBlockContent}>
            {bun && bun.length > 0 && bun[0].name ? (
              <div className={styles.burgerBunItem}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={bun[0].name + " (верх)"}
                  price={bun[0].price}
                  thumbnail={bun[0].image}
                />
              </div>
            ) : (
              false
            )}
            <div className={styles.burgerItemConstructor}>
              {propsDataValue
                ? propsDataValue.map((datavalue) =>
                    datavalue.type !== "bun" ? (
                      <div
                        key={datavalue._id}
                        className={styles.burgerConstructorElement}
                      >
                        <DragIcon type="primary" />
                        <ConstructorElement
                          text={datavalue.name}
                          price={datavalue.price}
                          thumbnail={datavalue.image}
                        />
                      </div>
                    ) : (
                      false
                    )
                  )
                : false}
            </div>
            {bun && bun.length > 0 && bun[0].name ? (
              <div className={styles.burgerBunItem}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={bun[0].name + " (низ)"}
                  price={bun[0].price}
                  thumbnail={bun[0].image}
                />
              </div>
            ) : (
              false
            )}
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
