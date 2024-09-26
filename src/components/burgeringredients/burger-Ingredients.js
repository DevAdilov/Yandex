import { useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COUNT } from "../../services/reducer-ingredient/action";
import {
  ADD_INGREDIENT_BUN,
  ADD_INGREDIENT_OTHER,
} from "../../services/reducer-constructor/action";
import {
  DELETE_INGREDIENT_DETAILS,
  SHOW_INGREDIENT_DETAILS,
} from "../../services/reduser-ingredient-details/action";
import { useDrag } from "react-dnd";
import BurgerIngredientsDetail from "./burger-ingredients-bun";
import BurgerIngredientsBun from "./burger-ingredients-bun";
import BurgerIngredientsMain from "./burger-ingredients-other";
import BurgerIngredientsOther from "./burger-ingredients-other";

function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idIngredients, setIdIngredients] = useState(false);
  const ingredientAll = useRef(null);
  const ingredientBun = useRef(null);
  const ingredientSauce = useRef(null);
  const ingredientMain = useRef(null);
  const dispatch = useDispatch();
  const ingredientBurger = useSelector(
    (store) => store.ingredientRootReducer.ingredientLoad
  );
  const ingredientConstructor = useSelector(
    (store) => store.constructorRootReducer
  );

  const addCount = (id) => {
    dispatch({
      type: ADD_COUNT,
      payload: {
        _id: id,
        __v: 1,
      },
    });
  };

  const modalIngredientDetail = (
    id,
    name,
    image,
    calories,
    proteins,
    fat,
    carbohydrates
  ) => {
    dispatch({
      type: SHOW_INGREDIENT_DETAILS,
      payload: {
        id: id,
        name: name,
        image: image,
        calories: calories,
        proteins: proteins,
        fat: fat,
        carbohydrates,
      },
    });
  };

  useEffect(() => {
    if (isModalOpen === false) {
      deleteIngredientDetails();
    }
  }, [isModalOpen]);

  const deleteIngredientDetails = () => {
    dispatch({
      type: DELETE_INGREDIENT_DETAILS,
    });
  };

  function handleOpenModal(id) {
    setIsModalOpen(true);
    setIdIngredients(id);
  }

  function countOccurrences(array, element) {
    console.log("******", array, element);

    return array.filter((item) => item.id === element).length;
  }

  function ingredientScroll() {
    const ingredientAllRef = ingredientAll.current.getBoundingClientRect();
    const ingredientBunRef = ingredientBun.current.getBoundingClientRect();
    const ingredientSauceRef = ingredientSauce.current.getBoundingClientRect();
    const ingredientMainRef = ingredientMain.current.getBoundingClientRect();

    if (ingredientSauceRef.top - ingredientAllRef.top < 80) {
      setCurrent("two");
    } else if (ingredientMainRef.top - ingredientAllRef.top < 30) {
      setCurrent("three");
    } else {
      setCurrent("one");
    }
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

          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            <p className="text text_type_main-medium">Начинки</p>
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            <p className="text text_type_main-medium">Соусы</p>
          </Tab>
        </div>

        {ingredientBurger ? (
          <>
            <div
              ref={ingredientAll}
              className={styles.burgerIngredientsBlock}
              onScroll={() => ingredientScroll()}
            >
              <div ref={ingredientBun}>
                <div>
                  <p className="text text_type_main-large">Булки</p>
                </div>

                <div className={styles.burgerItems}>
                  {ingredientBurger
                    .filter((datafilter) => datafilter.type === "bun")
                    .map((datavalue) => (
                      <div
                        className={styles.burgerItem}
                        key={datavalue._id}
                        onClick={() => {
                          handleOpenModal(datavalue._id);
                          addCount(datavalue._id);

                          modalIngredientDetail(
                            datavalue._id,
                            datavalue.name,
                            datavalue.image,
                            datavalue.calories,
                            datavalue.proteins,
                            datavalue.fat,
                            datavalue.carbohydrates
                          );
                        }}
                      >
                        <div className={styles.burgerImage}>
                          <Counter
                            count={
                              datavalue._id === ingredientConstructor.bun
                                ? 2
                                : 0
                            }
                            size="default"
                            extraClass="m-1"
                          />

                          <BurgerIngredientsBun
                            propsImg={datavalue.image}
                            propsId={datavalue._id}
                          />
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

              <div ref={ingredientMain}>
                <div>
                  <p className="text text_type_main-large">Начинки</p>
                </div>

                <div className={styles.burgerItems}>
                  {ingredientBurger
                    .filter((datafilter) => datafilter.type === "main")
                    .map((datavalue) => (
                      <div
                        className={styles.burgerItem}
                        key={datavalue._id}
                        onClick={() => {
                          handleOpenModal(datavalue._id);

                          modalIngredientDetail(
                            datavalue._id,
                            datavalue.name,
                            datavalue.image,
                            datavalue.calories,
                            datavalue.proteins,
                            datavalue.fat,
                            datavalue.carbohydrates
                          );
                        }}
                      >
                        <div className={styles.burgerImage}>
                          <Counter
                            count={countOccurrences(
                              ingredientConstructor.other,
                              datavalue._id
                            )}
                            size="default"
                            extraClass="m-1"
                          />

                          <BurgerIngredientsOther
                            propsImg={datavalue.image}
                            propsId={datavalue._id}
                          />
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
              <div ref={ingredientSauce}>
                <div>
                  <p className="text text_type_main-large">Соусы</p>
                </div>

                <div className={styles.burgerItems}>
                  {ingredientBurger
                    .filter((datafilter) => datafilter.type === "sauce")
                    .map((datavalue) => (
                      <div
                        className={styles.burgerItem}
                        key={datavalue._id}
                        onClick={() => {
                          handleOpenModal(datavalue._id);

                          modalIngredientDetail(
                            datavalue._id,
                            datavalue.name,
                            datavalue.image,
                            datavalue.calories,
                            datavalue.proteins,
                            datavalue.fat,
                            datavalue.carbohydrates
                          );
                        }}
                      >
                        <div className={styles.burgerImage}>
                          {ingredientConstructor ? (
                            <Counter
                              count={countOccurrences(
                                ingredientConstructor.other,
                                datavalue._id
                              )}
                              size="default"
                              extraClass="m-1"
                            />
                          ) : (
                            false
                          )}
                          {console.log(ingredientConstructor)}
                          <BurgerIngredientsOther
                            propsImg={datavalue.image}
                            propsId={datavalue._id}
                          />
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

      {isModalOpen ? (
        <Modal
          setIsModalOpen={setIsModalOpen}
          headerTitleModal={"Детали ингредиента"}
        >
          <IngredientDetails />
        </Modal>
      ) : (
        false
      )}
    </>
  );
}

export default BurgerIngredients;
