import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerconstructor.module.css";
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT } from "../../services/reducer-constructor/action";
import { useRef } from "react";

function ConstructorElementIngredient({
  elementItem,
  index,
  moveIngredient,
  dropIngredient,
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "itemingredients",
    drop: (item, monitor) => {
      dropIngredient(item.index, index);
    },
    hover: (item, monitor) => {
      if (item.index === index) {
        return;
      }

      const hoverBoundingReact = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingReact.bottom - hoverBoundingReact.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingReact.top;
      if (item.index < index && hoverClientY < hoverMiddleY) {
        return;
      }
      if (item.index > index && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(item.index, index);

      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "itemingredients",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const deleteIngredient = (index) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: index,
    });
  };
  return (
    <>
      <div
        ref={ref}
        className={`${styles.burgerConstructorElement} ${
          isDragging ? styles.opacity : ""
        } `}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={elementItem[0].name}
          price={elementItem[0].price}
          thumbnail={elementItem[0].image}
          handleClose={() => deleteIngredient(index)}
        />
      </div>
    </>
  );
}

export default ConstructorElementIngredient;
