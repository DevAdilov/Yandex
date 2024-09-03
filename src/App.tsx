import React, { useEffect, useState } from "react";
import "./css/App.css";
import AppHeader from "./components/apheader/AppHeader";
import BurgerIngredients from "./components/burgeringredients/BurgerIngredients";
import BurgerConstructor from "./components/burgerconstructor/BurgerConstructor";
import PropTypes from "prop-types";

function App() {
  const [arrdata, setArrData] = useState([]);

  const arrayApi = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    fetch(arrayApi)
      .then((response) => response.json())
      .then((data) => setArrData(data.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <section className="burger-main">
        <div className="burger-block">
          <BurgerIngredients propsDataValue={arrdata} />
        </div>
        <div className="burger-block">
          <BurgerConstructor propsDataValue={arrdata} />
        </div>
        <div id="burger-modals"></div>
      </section>
    </div>
  );
}

App.propTypes = {
  arrdata: PropTypes.array,
};

export default App;
