import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Login = () => {
  let activeFormClassNames = "border-bottom border-info";
  let className = "w-50 pb-2  border-0 btn rounded-0";
  return (
    <div
      style={{ transform: "translate(-50%, -50%)" }}
      className="d-flex flex-column rounded bg-white mx-auto position-absolute top-50 start-50 p-sm-4 p-3 border border-secondary"
    >
      <h2 className="text-muted text-center mb-4">Welcome to Botogram!</h2>
      <div className="d-flex justify-content-between mb-3">
        <NavLink
          className={({ isActive }) =>
            isActive ? `${activeFormClassNames} ${className}` : `${className}`
          }
          to="signIn"
        >
          SignIn
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${activeFormClassNames} ${className}` : `${className}`
          }
          to="signUp"
        >
          SignUp
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Login;
