import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../apheader/AppHeader";
import BurgerIngredients from "../burgeringredients/BurgerIngredients";
import BurgerConstructor from "../burgerconstructor/BurgerConstructor";
import PropTypes from "prop-types";

function App() {
  const [arrdata, setArrData] = useState([]);

  const arrayApi = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    fetch(arrayApi)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then((data) => setArrData(data.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      {arrdata ? (
        <main>
          <section className={styles.burgerMain}>
            <div className="burger-block">
              <BurgerIngredients propsDataValue={arrdata} />
            </div>
            <div className="burger-block">
              <BurgerConstructor propsDataValue={arrdata} />
            </div>
            <div id="burger-modals"></div>
          </section>
        </main>
      ) : (
        false
      )}
    </div>
  );
}

export default App;
