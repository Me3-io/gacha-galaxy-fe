import AppRouter from "routes";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  return (
    <>
      <Helmet>
        <script
          src="https://cdn.markfi.xyz/scripts/analytics/0.11.21/cookie3.analytics.min.js"
          integrity="sha384-wtYmYhbRlAqGwxc5Vb9GZVyp/Op3blmJICmXjRiJu2/TlPze5dHsmg2gglbH8viT"
          crossOrigin="anonymous"
          data-site-id={process.env.REACT_APP_COOKIE3_SITE_ID}
          async
        ></script>
      </Helmet>
      <AppRouter />
    </>
  );
}

export default App;
