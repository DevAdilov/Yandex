import { useDrag } from "react-dnd";

function BurgerIngredientsBun({ propsImg, propsId }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "bun",
    item: { id: propsId, type: "bun" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return <img ref={dragRef} src={propsImg} />;
}

export default BurgerIngredientsBun;
