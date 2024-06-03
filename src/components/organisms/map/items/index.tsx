import Shop1 from "./shop1";
import Shop2 from "./shop2";
import Shop3 from "./shop3";

const ListItems = ({ handlerClick }: any) => {
  const elements = [
    {
      id: 1,
      component: <Shop1 />,
      position: { x: 1392, y: 852 },
      scale: "1.3",
    },
    {
      id: 2,
      component: <Shop2 />,
      position: { x: 1224, y: 645 },
      scale: "1.3",
    },
    {
      id: 3,
      component: <Shop3 />,
      position: { x: 1496, y: 898 },
      scale: "1.3",
    },
  ];

  return (
    <>
      {elements.map((item) => (
        <g
          key={item.id}
          transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
          //style={{ scale: `${item?.scale}`}}
          onClick={(evt) => handlerClick(item.id, evt)}
        >
          {item.component}
        </g>
      ))}
    </>
  );
};
export default ListItems;
