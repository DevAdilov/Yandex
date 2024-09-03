import PropTypes from "prop-types";

IngredientDetails.propTypes = {
  propsDataIngredientDetails: PropTypes.array,
  propsIdIngredients: PropTypes.string,
};

function IngredientDetails({ propsDataIngredientDetails, propsIdIngredients }) {
  return (
    <>
      {propsDataIngredientDetails
        ? propsDataIngredientDetails.map((datavalue) =>
            propsIdIngredients && propsIdIngredients === datavalue._id ? (
              <div className="burger-item-modal" key={datavalue._id}>
                <div className="burger-item-modal-image">
                  <img src={datavalue.image} />
                </div>
                <div className="burger-item-modal-name text text_type_main-medium">
                  {datavalue.name}
                </div>
                <div className="burger-item-modal-specifications-block">
                  <div className="burger-item-modal-specifications">
                    <p className="text text_type_main-default text_color_inactive">
                      Калории, ккал
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {datavalue.calories}
                    </p>
                  </div>
                  <div className="burger-item-modal-specifications">
                    <p className="text text_type_main-default text_color_inactive">
                      Белки, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {datavalue.proteins}
                    </p>
                  </div>
                  <div className="burger-item-modal-specifications">
                    <p className="text text_type_main-default text_color_inactive">
                      Жиры, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {datavalue.fat}
                    </p>
                  </div>

                  <div className="burger-item-modal-specifications">
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
