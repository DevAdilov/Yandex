import { useState } from "react";
import "./burgerconstructor.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal/modaloverlay";
import Modal from "../modal/modal";
import OrderDetails from "../modal/orderdetails";
import PropTypes from "prop-types";

BurgerConstructor.propTypes = {
  propsDataValue: PropTypes.array,
};

function BurgerConstructor({ propsDataValue }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }
  return (
    <>
      <div className="burger-constructor-block">
        <div className="burger-constructor-container">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {propsDataValue
              ? propsDataValue.map((datavalue, index) => (
                  <div
                    key={datavalue._id}
                    className="burger-constructor-element"
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
        <div className="final-price-block pl-3 pr-3 pb-5 pt-5">
          <div className="final-price-item">
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
      <ModalOverlay isOpen={isModalOpen} propsSetIsModalOpen={setIsModalOpen} />

      <Modal isOpen={isModalOpen}>
        <div className="header-modal-block">
          <h1></h1>
          <CloseIcon type="primary" onClick={() => setIsModalOpen(false)} />
        </div>
        <OrderDetails OrderDetails={propsDataValue} />
      </Modal>
    </>
  );
}

export default BurgerConstructor;
