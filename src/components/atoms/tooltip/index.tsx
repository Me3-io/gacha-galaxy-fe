import { useEffect, useState } from "react";
import styled from "./styled.module.scss";

const Tooltip = ({ visible, text }: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: any) => setPosition({ x: e.clientX - 60, y: e.clientY - 80 });
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  return (
    <>
      {visible && (
        <div className={styled.tooltip} style={{ top: position.y, left: position.x }}>
          {text}
        </div>
      )}
    </>
  );
};
export default Tooltip;
