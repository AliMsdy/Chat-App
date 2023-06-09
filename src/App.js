import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

import SignIn from "./components/Login/signIn";
import SignUp from "./components/Login/signUp";

import { ToastContainer } from "react-toastify";

// Contexts
import AuthContextProvider from "./components/AuthContext/AuthContext";

function App() {
  return (
    <div className="">
      <AuthContextProvider>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />}>
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route index element={<Navigate to="signIn" />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
