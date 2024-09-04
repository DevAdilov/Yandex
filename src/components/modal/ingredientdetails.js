import PropTypes from "prop-types";
import styles from "./modal.module.css";

IngredientDetails.propTypes = {
  propsDataIngredientDetails: PropTypes.array.isRequired,
  propsIdIngredients: PropTypes.string.isRequired,
};

function IngredientDetails({ propsDataIngredientDetails, propsIdIngredients }) {
  return (
    <>
      {propsDataIngredientDetails
        ? propsDataIngredientDetails.map((datavalue) =>
            propsIdIngredients && propsIdIngredients === datavalue._id ? (
              <div key={datavalue._id}>
                <div className={styles.burgerItemModalImage}>
                  <img src={datavalue.image} />
                </div>
                <div className={styles.burgerItemModalName}>
                  <p className="text text_type_main-medium">{datavalue.name}</p>
                </div>
                <div className={styles.burgerItemModalSpecificationsBlock}>
                  <div className={styles.burgerItemModalSpecifications}>
                    <p className="text text_type_main-default text_color_inactive">
                      Калории, ккал
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {datavalue.calories}
                    </p>
                  </div>
                  <div className={styles.burgerItemModalSpecifications}>
                    <p className="text text_type_main-default text_color_inactive">
                      Белки, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {datavalue.proteins}
                    </p>
                  </div>
                  <div className={styles.burgerItemModalSpecifications}>
                    <p className="text text_type_main-default text_color_inactive">
                      Жиры, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {datavalue.fat}
                    </p>
                  </div>

                  <div className={styles.burgerItemModalSpecifications}>
                    <p className="text text_type_main-default text_color_inactive">
                      Углеводы, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {datavalue.carbohydrates}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              false
            )
          )
        : false}
    </>
  );
}
export default IngredientDetails;
