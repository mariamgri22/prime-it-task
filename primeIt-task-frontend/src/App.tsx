import "./App.css";
import { lazy, Suspense } from "react";
import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
const Login = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const User = lazy(() => import("./pages/UserPage"));

const App: React.FC = () => {
 
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <Suspense fallback={<div className="centre">loading...</div>}>
                <Register/>
              </Suspense>
            }
          />

          <Route
            path="/login"
            element={
              <Suspense fallback={<div className="centre">loading...</div>}>
                <Login  />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<div className="centre">loading...</div>}>
                <User/>
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
