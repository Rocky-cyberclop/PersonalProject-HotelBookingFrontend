import { publicRoute, privateRoute } from "./routes/Route";
// Change the order to Route, Router, Routes will makes bug
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRouter from "./routes/PrivateRouter";


function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <Routes>
          {publicRoute.map((singleRoute, index) => {
            const Path = singleRoute.path;
            const Page = singleRoute.page;
            const Layout = singleRoute.layout;

            return (
              <Route
                key={index}
                path={Path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              >

              </Route>
            );
          })}

          {privateRoute.map((singleRoute, index) => {

            const Page = singleRoute.page;
            const Path = singleRoute.path;
            const Layout = singleRoute.layout;

            return (
              <Route
                key={index}
                path={Path}
                element={
                  <PrivateRouter>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRouter>
                }
              >

              </Route>
            );

          })}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
