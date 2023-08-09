import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { privateRoutes } from "./routes/routes";
import { DefaultLayout } from "./container/Layout";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {privateRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Comp = route.component;
            return (
              <Route path={route.path}
                key={index}
                element={
                  <Wrapper>
                    <Layout>
                      <Comp />
                    </Layout>
                  </Wrapper>
                }
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
