import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export const userAuthContext = createContext();

const AuthContext = ({ children }) => {
  // let [loading, setLoading] = useState(true);
  let [user, setUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      console.log(data);
      setUser(data);
      console.log(user);
      // setLoading(false);
      if (data) {
        // console.log("going to the chat");
        navigate("/chat");
      }
    });
  }, [user, navigate]);

  return (
    <>
      <userAuthContext.Provider value={user}>
        {children}
      </userAuthContext.Provider>
    </>
  );
};

export default AuthContext;
