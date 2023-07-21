import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
// import Main from "../pages/Main";
import { SkeletonTheme } from "react-loading-skeleton";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthWrapper = () => {
  const location = useLocation(); // current location

  const userLogged = JSON.parse(localStorage.getItem("email"));

  return userLogged ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  );
};

const Router = () => {
  const [userLogged, setUserLogged] = useState(
    JSON.parse(localStorage.getItem("email"))
  );

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(userLogged));
  }, [userLogged]);

  const logIn = () => setUserLogged(true);
  // const logOut = () => setUserLogged(false);
  return (
    <React.Fragment>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login logIn={logIn} />} />
            <Route element={<AuthWrapper />} style={{ color: "white" }}>
              {/* <Route path="/main" element={<Main />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </React.Fragment>
  );
};

export default Router;
