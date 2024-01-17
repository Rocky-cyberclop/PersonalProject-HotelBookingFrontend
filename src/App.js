import { publicRoute } from "./routes/Route";
// Change the order to Route, Router, Routes will makes bug
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <Router>
      <ToastContainer/>
      <div className="App">
        <Routes>
          {publicRoute.map((singleRoute, index)=>{
            const Path = singleRoute.path;
            const Page = singleRoute.page;
            const Layout = singleRoute.layout;

            return(
              <Route 
                  key={index} 
                  path={Path}
                  element={
                    <Layout>
                      <Page/>
                    </Layout>
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
