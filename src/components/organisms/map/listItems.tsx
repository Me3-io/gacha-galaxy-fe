import Shop1 from "components/atoms/mapItems/shop1";
import Shop2 from "components/atoms/mapItems/shop2";
import Shop3 from "components/atoms/mapItems/shop3";

const ListItems = ({ handlerClick }: any) => {
  const elements = [
    {
      id: 1,
      component: <Shop1 />,
      position: { x: 1070, y: 653 },
      scale: 1.3,
    },
    {
      id: 2,
      component: <Shop2 />,
      position: { x: 968, y: 517 },
      scale: 1.28,
    },
    {
      id: 3,
      component: <Shop3 />,
      position: { x: 1000, y: 400 },
      scale: 1.3,
    },
  ];

  return (
    <>
      {elements.map((item) => (
        <g
          key={item.id}
          transform={`translate(${item.position.x} ${item.position.y})`}
          style={{ scale: `${item?.scale}`}}
          onClick={(evt) => handlerClick(item.id, evt)}
        >
          {item.component}
        </g>
      ))}
    </>
  );
};
export default ListItems;
