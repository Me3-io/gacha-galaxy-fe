import styled from "./styled.module.scss";

const Button = ({ onClick, children }: any) => {
  return (
    <button className={styled.btnAnimated} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <p>{children}</p>
    </button>
  );
};
export default Button;
