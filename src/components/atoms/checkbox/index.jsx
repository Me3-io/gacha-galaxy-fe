import React from "react";
import styled from "./styled.module.scss";
const Checkbox = ({ checked, onChange }) => {
  return (
    <input type="checkbox" checked={checked} onChange={onChange} className={styled.checkbox} />
  );
};

export default Checkbox;
