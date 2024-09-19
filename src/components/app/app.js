import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../apheader/AppHeader";
import BurgerIngredients from "../burgeringredients/BurgerIngredients";
import BurgerConstructor from "../burgerconstructor/BurgerConstructor";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_INGREDIENT } from "../../services/reducer-ingredient/action";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ADD_INGREDIENT_BUN,
  ADD_INGREDIENT_OTHER,
} from "../../services/reducer-constructor/action";

function App() {
  const dispatch = useDispatch();

  // const ingredientConstructor = useSelector(
  //   (store) => store.constructorRootReducer
  // );

  useEffect(() => {
    loadData();
  }, []);

  const addBun = (id) => {
    dispatch({
      type: ADD_INGREDIENT_BUN,
      payload: id,
    });
  };

  const addOther = (id) => {
    dispatch({
      type: ADD_INGREDIENT_OTHER,
      payload: id,
    });
  };

  function loadData() {
    const arrayApi = "https://norma.nomoreparties.space/api/ingredients";
    fetch(arrayApi)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then((data) => {
        dispatch({ type: LOAD_INGREDIENT, payload: data.data });
      })
      .catch((error) => console.error("Error:", error));
  }

  const onDropHandler = (item) => {
    if (item.type === "bun") {
      addBun(item.id);
    }
    if (item.type === "other") {
      addOther(item.id);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <AppHeader />
        <main>
          <section className={styles.burgerMain}>
            <div className="burger-block">
              <BurgerIngredients />
            </div>

            <div className="burger-block">
              <BurgerConstructor onDropHandler={onDropHandler} />
            </div>

            <div id="burger-modals"></div>
          </section>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
