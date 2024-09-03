import { useState } from "react";
import "./burgeringredients.css";
import {
  Tab,
  CurrencyIcon,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import ModalOverlay from "../modal/modaloverlay";
import IngredientDetails from "../modal/ingredientdetails";
import PropTypes from "prop-types";

BurgerIngredients.propTypes = {
  propsDataValue: PropTypes.array,
};

function BurgerIngredients({ propsDataValue }) {
  const [current, setCurrent] = useState("one");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idIngredients, setIdIngredients] = useState(false);

  function handleOpenModal(id) {
    setIsModalOpen(true);
    setIdIngredients(id);
  }

  return (
    <>
      <div className="burger-ingredients-content burger-container">
        <p className="text text_type_main-large burger-ingredients-title">
          Соберите бургер
        </p>
        <div style={{ display: "flex", paddingBottom: 40 }}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>

        {propsDataValue ? (
          <>
            <div className="burger-ingredients-block">
              <div>
                <div>
                  <p className="text text_type_main-medium">Булки</p>
                </div>

                <div className="burger-items">
                  {propsDataValue
                    .filter((datafilter) => datafilter.type === "bun")
                    .map((datavalue) => (
                      <div
                        className="burger-item"
                        key={datavalue._id}
                        onClick={() => handleOpenModal(datavalue._id)}
                      >
                        <div className="burger-image">
                          <img src={datavalue.image} />
                        </div>
                        <div>
                          <div className="burger-items-price">
                            <p className="text text_type_digits-default">
                              {datavalue.price}
                            </p>

                            <CurrencyIcon type="primary" />
                          </div>
                          <div className="burger-items-price">
                            {datavalue.name}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <div>
                  <p className="text text_type_main-medium">Начинки</p>
                </div>

                <div className="burger-items">
                  {propsDataValue
                    .filter((datafilter) => datafilter.type === "main")
                    .map((datavalue) => (
                      <div
                        className="burger-item"
                        key={datavalue._id}
                        onClick={() => handleOpenModal(datavalue._id)}
                      >
                        <div className="burger-image">
                          <img src={datavalue.image} />
                        </div>
                        <div>
                          <div className="burger-items-price">
                            <p className="text text_type_digits-default">
                              {datavalue.price}
                            </p>

                            <CurrencyIcon type="primary" />
                          </div>
                          <div className="burger-items-price">
                            {datavalue.name}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <div>
                  <p className="text text_type_main-medium">Соусы</p>
                </div>

                <div className="burger-items">
                  {propsDataValue
                    .filter((datafilter) => datafilter.type === "sauce")
                    .map((datavalue) => (
                      <div
                        className="burger-item"
                        key={datavalue._id}
                        onClick={() => handleOpenModal(datavalue._id)}
                      >
                        <div className="burger-image">
                          <img src={datavalue.image} />
                        </div>
                        <div>
                          <div className="burger-items-price">
                            <p className="text text_type_digits-default">
                              {datavalue.price}
                            </p>

                            <CurrencyIcon type="primary" />
                          </div>
                          <div className="burger-items-price">
                            {datavalue.name}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          false
        )}
      </div>

      <ModalOverlay isOpen={isModalOpen} propsSetIsModalOpen={setIsModalOpen} />
      <Modal isOpen={isModalOpen}>
        <div className="header-modal-block">
          <h1>Детали ингредиента</h1>
          <CloseIcon type="primary" onClick={() => setIsModalOpen(false)} />
        </div>

        <IngredientDetails
          propsDataIngredientDetails={propsDataValue}
          propsIdIngredients={idIngredients.toString()}
        />
      </Modal>
    </>
  );
}

export default BurgerIngredients;
