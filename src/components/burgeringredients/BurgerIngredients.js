import { useState } from "react";
import styles from "./burgeringredients.module.css";
import {
  Tab,
  CurrencyIcon,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredientdetails";
import PropTypes from "prop-types";

BurgerIngredients.propTypes = {
  propsDataValue: PropTypes.array.isRequired,
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
      <div className={styles.burgerContainer}>
        <div className={styles.burgerIngredientsTitle}>
          <p className="text text_type_main-large">Соберите бургер</p>
        </div>
        <div className={styles.burgerIngredientsTab}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            <p className="text text_type_main-medium">Булки</p>
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            <p className="text text_type_main-medium">Соусы</p>
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            <p className="text text_type_main-medium">Начинки</p>
          </Tab>
        </div>

        {propsDataValue ? (
          <>
            <div className={styles.burgerIngredientsBlock}>
              <div>
                <div>
                  <p className="text text_type_main-large">Булки</p>
                </div>

                <div className={styles.burgerItems}>
                  {propsDataValue
                    .filter((datafilter) => datafilter.type === "bun")
                    .map((datavalue) => (
                      <div
                        className={styles.burgerItem}
                        key={datavalue._id}
                        onClick={() => handleOpenModal(datavalue._id)}
                      >
                        <div className={styles.burgerImage}>
                          <img src={datavalue.image} />
                        </div>
                        <div>
                          <div className={styles.burgerItemsPrice}>
                            <p className="text text_type_digits-default">
                              {datavalue.price}
                            </p>

                            <CurrencyIcon type="primary" />
                          </div>
                          <div className={styles.burgerItemsPrice}>
                            <p className="text text_type_main-default">
                              {datavalue.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <div>
                  <p className="text text_type_main-large">Начинки</p>
                </div>

                <div className={styles.burgerItems}>
                  {propsDataValue
                    .filter((datafilter) => datafilter.type === "main")
                    .map((datavalue) => (
                      <div
                        className={styles.burgerItem}
                        key={datavalue._id}
                        onClick={() => handleOpenModal(datavalue._id)}
                      >
                        <div className={styles.burgerImage}>
                          <img src={datavalue.image} />
                        </div>
                        <div>
                          <div className={styles.burgerItemsPrice}>
                            <p className="text text_type_digits-default">
                              {datavalue.price}
                            </p>

                            <CurrencyIcon type="primary" />
                          </div>
                          <div className={styles.burgerItemsPrice}>
                            <p className="text text_type_main-default">
                              {datavalue.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <div>
                  <p className="text text_type_main-large">Соусы</p>
                </div>

                <div className={styles.burgerItems}>
                  {propsDataValue
                    .filter((datafilter) => datafilter.type === "sauce")
                    .map((datavalue) => (
                      <div
                        className={styles.burgerItem}
                        key={datavalue._id}
                        onClick={() => handleOpenModal(datavalue._id)}
                      >
                        <div className={styles.burgerImage}>
                          <img src={datavalue.image} />
                        </div>
                        <div>
                          <div className={styles.burgerItemsPrice}>
                            <p className="text text_type_digits-default">
                              {datavalue.price}
                            </p>

                            <CurrencyIcon type="primary" />
                          </div>
                          <div className={styles.burgerItemsPrice}>
                            <p className="text text_type_main-default">
                              {datavalue.name}
                            </p>
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

      <Modal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        headerTitleModal={"Детали ингредиента"}
      >
        <IngredientDetails
          propsDataIngredientDetails={propsDataValue}
          propsIdIngredients={idIngredients.toString()}
        />
      </Modal>
    </>
  );
}

export default BurgerIngredients;
