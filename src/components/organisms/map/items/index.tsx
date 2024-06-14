import Patner1 from "./patner1";
import Patner2 from "./patner2";
import Patner3 from "./patner3";
import Patner4 from "./patner4";
import Shop1 from "./shop1";

const ListItems = ({ handlerClick, handlerOver, handlerLeave }: any) => {
  const elements = [
    {
      id: 1,
      component: <Shop1 />,
      position: { x: 1038, y: 816 },
      scale: 1.3,
      text: "3 Games Available",
      clickable: true,
    },
    {
      id: 2,
      component: <Patner1 />,
      position: { x: 1465, y: 208 },
      scale: 1.3,
      text: "Ampverse",
      clickable: false,
    },
    {
      id: 3,
      component: <Patner2 />,
      position: { x: 855, y: 356 },
      scale: 1.3,
      text: "Emerge",
      clickable: false,
    },
    {
      id: 4,
      component: <Patner3 />,
      position: { x: 388, y: 904 },
      scale: 1.3,
      text: "Yield App",
      clickable: false,
    },
    {
      id: 5,
      component: <Patner4 />,
      position: { x: 1597, y: 676 },
      scale: 1.3,
      text: "Haven1",
      clickable: false,
    },
  ];

  return (
    <>
      {elements.map((item) => (
        <g
          key={item.id}
          transform={`translate(${item.position.x} ${item.position.y}) scale(${item?.scale})`}
          onClick={(evt) => (item.clickable ? handlerClick(item.id, evt) : evt.stopPropagation())}
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
