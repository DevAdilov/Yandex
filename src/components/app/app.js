import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../apheader/AppHeader";
import BurgerIngredients from "../burgeringredients/BurgerIngredients";
import BurgerConstructor from "../burgerconstructor/BurgerConstructor";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../../services/reducer-ingredient/action";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ADD_INGREDIENT_BUN,
  ADD_INGREDIENT_OTHER,
} from "../../services/reducer-constructor/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, []);

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
              <BurgerConstructor />
            </div>
          </section>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
