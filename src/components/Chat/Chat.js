import React, { useContext, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { userAuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { auth } from "../../firebase";

const Chat = () => {
  let user = useContext(userAuthContext);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("returning to login");
      navigate("/");
      // window.location.href = "/";
      return;
    }

    let authObject = { "Private-Key": "cf57477e-7270-402b-bb16-aa3121d4668d" };
    // get or create the user if it doesn't exist
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username: user.email, secret: user.uid },
        { headers: authObject }
      )
      .then((result) => {
        console.log(result.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [user, navigate]);

  if (!user || loading)
    // show loading if user is null (default) or loading is true
    return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <Navbar />
      <ChatEngine
        height="calc(100vh - 56px)"
        projectID="14d418e4-ff98-44f6-b061-4c5ee1b5c836"
        userName={user.email}
        userSecret={user.uid}
      />
    </>
  );
};

const Navbar = () => {
  let navigate = useNavigate();
  const logoutHandler = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <>
      <nav className="navbar px-3 navbar-light bg-light justify-content-between">
        <a className="navbar-brand" href="/">
          Botogram
        </a>
        <button
          onClick={logoutHandler}
          className="btn btn-outline-success my-2 my-sm-0"
        >
          Logout
        </button>
      </nav>
    </>
  );
};

export default Chat;
