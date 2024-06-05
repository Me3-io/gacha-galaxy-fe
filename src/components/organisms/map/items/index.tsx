import Shop1 from "./shop1";
import Shop2 from "./shop2";
import Shop3 from "./shop3";

const ListItems = ({ handlerClick, handlerOver, handlerLeave }: any) => {
  const elements = [
    {
      id: 1,
      component: <Shop1 />,
      position: { x: 1392, y: 852 },
      scale: "1.3",
      text: "3 games available",
    },
    {
      id: 2,
      component: <Shop2 />,
      position: { x: 1224, y: 645 },
      scale: "1.3",
      text: "6 games available",
    },
    {
      id: 3,
      component: <Shop3 />,
      position: { x: 1496, y: 898 },
      scale: "1.3",
      text: "5 games available",
    },
  ];

  return (
    <>
      {elements.map((item) => (
        <g
          key={item.id}
          transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
          onClick={(evt) => handlerClick(item.id, evt)}
          onTouchStart={(evt) => evt.stopPropagation()}
          onMouseOver={() => handlerOver(item)}
          onMouseLeave={handlerLeave}
        >
          {item.component}
        </g>
      ))}
    </>
  );
};
export default ListItems;
