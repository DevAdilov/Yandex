import { useEffect, useRef, useState } from "react";
import styles from "./burgerconstructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../modal/orderdetails";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENT_BUN,
  ADD_INGREDIENT_OTHER,
  CLEAR_BASKET,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
} from "../../services/reducer-constructor/action";
import {
  ORDER_DETAILS,
  orderСreationAction,
} from "../../services/reducer-order-details/action";
import { useDrop } from "react-dnd";
import ConstructorElementIngredient from "./constructor-element-burger";
import { BASE_URL } from "../../utils/const/const";
import { v4 as uuidv4 } from "uuid";

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPrice, setAllPrice] = useState(0);
  const [orderDetailsCreat, setOrderDetailsCreat] = useState([]);

  const [moveIndexDrop, setMoveIndexDrop] = useState(null);
  const [moveIndexDrag, setMoveIndexDrag] = useState(null);

  const [moveCurrentIdDrag, setMoveCurrentIdDrag] = useState(null);

  const [ingredientConstructorState, setIngredientConstructorState] = useState(
    []
  );

  const dispatch = useDispatch();
  const ingredientConstructor = useSelector(
    (store) => store.constructorRootReducer
  );
  const ingredientBurger = useSelector(
    (store) => store.ingredientRootReducer.ingredientLoad
  );
  const [canDropTop, dropRefBunTop] = useDrop({
    accept: "bun",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      canDropTop: monitor.canDrop(),
    }),
  });

  const [canDropBottom, dropRefBunBottom] = useDrop({
    accept: "bun",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      canDropBottom: monitor.canDrop(),
    }),
  });

  const [canDropOther, dropRefMain] = useDrop({
    accept: "other",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      canDropOther: monitor.canDrop(),
    }),
  });

  const addBun = (id) => {
    dispatch({
      type: ADD_INGREDIENT_BUN,
      payload: id,
    });
  };

  const addOther = (id) => {
    let uniqidValue = uuidv4();
    dispatch({
      type: ADD_INGREDIENT_OTHER,
      payload: { id: id, uniqid: uniqidValue },
    });
  };

  const onDropHandler = (item) => {
    if (item.type === "bun") {
      addBun(item.id);
    }
    if (item.type === "other") {
      addOther(item.id);
    }
  };

  const elementBun = ingredientBurger.filter(
    (elementfilter) => elementfilter._id === ingredientConstructor.bun
  );
  const elementIngredient = ingredientConstructor.other
    .map((id) => ingredientBurger.find((element) => element._id === id))
    .filter((element) => element !== undefined);

  useEffect(() => {
    setIngredientConstructorState(ingredientConstructor.other);

    var priceCalculate =
      elementBun && elementBun[0] && elementBun[0].price
        ? elementBun[0].price * 2
        : 0;

    ingredientConstructor.other.map((element) => {
      const elementItem = ingredientBurger.filter(
        (elementfilter) => elementfilter._id === element.id
      );
      priceCalculate = priceCalculate + elementItem[0].price;
    });

    setAllPrice(priceCalculate);
    setOrderDetailsCreat(elementIngredient);
  }, [ingredientConstructor]);

  const orderСreation = () => {
    let curentIngredients = [];

    ingredientConstructor.other.forEach((item) => {
      curentIngredients.push(item.id);
    });

    if (ingredientConstructor.bun != "") {
      curentIngredients.push(ingredientConstructor.bun);
    }
    dispatch(orderСreationAction(curentIngredients));
  };

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  const moveIngredient = (dragIndex, hoverIndex) => {
    let moveCurrentIdDragInside = moveCurrentIdDrag;

    if (moveCurrentIdDragInside == null) {
      moveCurrentIdDragInside = ingredientConstructorState[dragIndex];
      setMoveCurrentIdDrag(moveCurrentIdDragInside);
    }

    if (moveIndexDrop !== hoverIndex || moveIndexDrag !== dragIndex) {
      setMoveIndexDrop(hoverIndex);
      setMoveIndexDrag(dragIndex);

      const newIngredientConstructor = [...ingredientConstructorState];
      newIngredientConstructor.splice(dragIndex, 1);
      newIngredientConstructor.splice(hoverIndex, 0, moveCurrentIdDragInside);
      setIngredientConstructorState(newIngredientConstructor);
    }
  };

  function dropIngredient(drop, drag) {
    setMoveIndexDrop(null);
    setMoveIndexDrag(null);
    setMoveCurrentIdDrag(null);
    dispatch({
      type: SORT_INGREDIENT,
      payload: ingredientConstructorState,
    });
  }

  return (
    <>
      <div className={styles.burgerConstructorBlock}>
        <div className={styles.burgerConstructorContainer}>
          <div className={styles.burgerConstructorBlockContent}>
            <div ref={dropRefBunTop}>
              {ingredientConstructor.bun ? (
                <div className={styles.burgerBunItem}>
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={elementBun[0].name + " (верх)"}
                    price={elementBun[0].price}
                    thumbnail={elementBun[0].image}
                  />
                </div>
              ) : (
                <div className={styles.burgerConstructorElement}>
                  <div
                    className={`
    ${styles.burgerConstructorElementBunTop}
    ${canDropTop.canDropTop ? styles.BunBorder : ""}
  `}
                  >
                    Перетащите булку
                  </div>
                </div>
              )}
            </div>
            <div ref={dropRefMain} className={styles.burgerItemConstructor}>
              {ingredientConstructorState &&
              ingredientConstructorState.length > 0 ? (
                ingredientConstructorState.map((element, index) => {
                  const elementItem = ingredientBurger.filter(
                    (elementfilter) => elementfilter._id === element.id
                  );

                  return (
                    <div key={element.uniqueId}>
                      <ConstructorElementIngredient
                        elementItem={elementItem}
                        index={index}
                        moveIngredient={moveIngredient}
                        dropIngredient={dropIngredient}
                      />
                    </div>
                  );
                })
              ) : (
                <div className={styles.burgerConstructorElement}>
                  <div
                    className={`
                    ${styles.burgerConstructorElementIngredient}
                    ${canDropOther.canDropOther ? styles.BunBorder : ""}
                  `}
                  >
                    Перетащите ингредиент
                  </div>
                </div>
              )}
            </div>

            <div ref={dropRefBunBottom}>
              {ingredientConstructor.bun ? (
                <div className={styles.burgerBunItem}>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={elementBun[0].name + " (низ)"}
                    price={elementBun[0].price}
                    thumbnail={elementBun[0].image}
                  />
                </div>
              ) : (
                <div className={styles.burgerConstructorElement}>
                  <div
                    className={`${styles.burgerConstructorElementBunBottom} ${
                      canDropBottom.canDropBottom ? styles.BunBorder : ""
                    }`}
                  >
                    Перетащите булку
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.finalPriceBlock}>
          <div className={styles.finalPriceItem}>
            <p className="text text_type_digits-medium">{allPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => {
              handleOpenModal();
              orderСreation();
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isModalOpen ? (
        <Modal setIsModalOpen={setIsModalOpen}>
          <OrderDetails />
        </Modal>
      ) : (
        false
      )}
    </>
  );
}

export default BurgerConstructor;
