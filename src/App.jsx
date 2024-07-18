import { useState } from "react";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs, categoryInputs } from "./formsource";
import Mylist from "./pages/MyList/Mylist";
import NewCategory from "./pages/new/newCategory";
// darkmode
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
// datatable
import { userColumns, productColumns, categoryColumns } from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const NotRequireAuth = ({ children }) => {
    return currentUser ? <Navigate to="/" /> : children;
  };

  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                path="login"
                element={
                  <NotRequireAuth>
                    <Login />
                  </NotRequireAuth>
                }
              ></Route>
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              ></Route>
              <Route path="users">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <List columns={userColumns} />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path=":userId"
                  element={
                    <RequireAuth>
                      <Single columns={userColumns} />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <New inputs={userInputs} title="Add New User" />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="products">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <List columns={productColumns} />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path=":productId"
                  element={
                    <RequireAuth>
                      <Single columns={userColumns} />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <New inputs={productInputs} title="Add New Product" />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="categories">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Mylist columns={categoryColumns} />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <NewCategory inputs={categoryInputs} title="Add New Category" />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;