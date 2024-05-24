import Layout from "components/templates/layout";
import InteractiveMap from "components/organisms/map";

import "./styled.module.scss";

const Home = () => {
  return (
    <Layout>
      <InteractiveMap />
    </Layout>
  );
};

export default Home;
