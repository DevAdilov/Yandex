import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { useSelector } from "react-redux";

function IngredientDetails() {
  const ingredientDetailsItems = useSelector(
    (store) => store.IngredientDetailsRootReducer.ingredientDetail
  );

  console.log(ingredientDetailsItems);

  return (
    <>
      <div>
        <div className={styles.burgerItemModalImage}>
          <img src={ingredientDetailsItems.image} />
        </div>
        <div className={styles.burgerItemModalName}>
          <p className="text text_type_main-medium">
            {ingredientDetailsItems.name}
          </p>
        </div>
        <div className={styles.burgerItemModalSpecificationsBlock}>
          <div className={styles.burgerItemModalSpecifications}>
            <p className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredientDetailsItems.calories}
            </p>
          </div>
          <div className={styles.burgerItemModalSpecifications}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredientDetailsItems.proteins}
            </p>
          </div>
          <div className={styles.burgerItemModalSpecifications}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredientDetailsItems.fat}
            </p>
          </div>

          <div className={styles.burgerItemModalSpecifications}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredientDetailsItems.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default IngredientDetails;
