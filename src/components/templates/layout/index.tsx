import styles from "./styled.module.scss";

const Layout = ({ children }: any) => {
  return <div className={styles.appLayout}>{children}</div>;
};

export default Layout;
