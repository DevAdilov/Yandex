import { useDrag } from "react-dnd";

function BurgerIngredientsOther({ propsImg, propsId }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "other",
    item: { id: propsId, type: "other" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return <img ref={dragRef} src={propsImg} />;
}

export default BurgerIngredientsOther;
